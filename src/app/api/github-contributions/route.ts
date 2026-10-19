import { NextRequest, NextResponse } from "next/server";

export const revalidate = 1800; // Cache for 30 minutes

interface ContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel: "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE";
  weekday: number;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface CalendarResponse {
  username: string;
  year: number;
  availableYears: number[];
  totalContributions: number;
  weeks: ContributionWeek[];
  source: "graphql" | "rest_scraper";
}

const GRAPHQL_QUERY = `
  query($username: String!, $from: DateTime, $to: DateTime) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
              weekday
            }
          }
        }
      }
    }
  }
`;

function countToLevel(count: number, maxCount: number): "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE" {
  if (count <= 0) return "NONE";
  if (maxCount <= 1) return "FIRST_QUARTILE";
  const ratio = count / maxCount;
  if (ratio <= 0.25) return "FIRST_QUARTILE";
  if (ratio <= 0.5) return "SECOND_QUARTILE";
  if (ratio <= 0.75) return "THIRD_QUARTILE";
  return "FOURTH_QUARTILE";
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get("username") || "prem-000";
  const requestedYear = searchParams.get("year");
  const currentYear = new Date().getFullYear();
  const year = requestedYear ? parseInt(requestedYear, 10) : currentYear;

  const token = process.env.GITHUB_TOKEN || process.env.GITHUB_PAT || process.env.GH_TOKEN;

  // 1. Try official GitHub GraphQL API if server token is configured
  if (token) {
    try {
      const from = new Date(Date.UTC(year, 0, 1, 0, 0, 0)).toISOString();
      const to = new Date(Date.UTC(year, 11, 31, 23, 59, 59)).toISOString();

      const gqlRes = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "User-Agent": "portfolio-github-calendar",
        },
        body: JSON.stringify({
          query: GRAPHQL_QUERY,
          variables: { username, from, to },
        }),
        next: { revalidate: 1800 },
      });

      if (gqlRes.ok) {
        const gqlData = await gqlRes.json();
        const calendar = gqlData?.data?.user?.contributionsCollection?.contributionCalendar;

        if (calendar) {
          const availableYears: number[] = [];
          for (let y = currentYear; y >= currentYear - 3; y--) {
            availableYears.push(y);
          }

          const response: CalendarResponse = {
            username,
            year,
            availableYears,
            totalContributions: calendar.totalContributions,
            weeks: calendar.weeks,
            source: "graphql",
          };

          return NextResponse.json(response);
        }
      }
    } catch (err) {
      console.warn("GitHub GraphQL fetch failed, falling back to public scraper API:", err);
    }
  }

  // 2. Fallback to public GitHub contribution scraper API (serves real GitHub activity without token requirement)
  try {
    const scraperRes = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}`,
      {
        headers: {
          "User-Agent": "portfolio-github-calendar",
        },
        next: { revalidate: 1800 },
      }
    );

    if (!scraperRes.ok) {
      return NextResponse.json(
        { error: `Unable to fetch contributions for ${username}. Status: ${scraperRes.status}` },
        { status: scraperRes.status }
      );
    }

    const data = await scraperRes.json();
    const availableYears: number[] = Object.keys(data.total || {})
      .map((y) => parseInt(y, 10))
      .filter((y) => !isNaN(y))
      .sort((a, b) => b - a);

    const yearContributions: { date: string; count: number; level: number }[] =
      data.contributions?.filter((c: { date: string; count: number }) => {
        return c.date.startsWith(`${year}-`);
      }) || [];

    const totalContributions = data.total?.[year] ?? yearContributions.reduce((sum, item) => sum + item.count, 0);

    const maxCount = Math.max(...yearContributions.map((d) => d.count), 0);

    // Group the days into 7-day weeks (Sunday = 0 to Saturday = 6)
    const weeks: ContributionWeek[] = [];
    let currentWeek: ContributionDay[] = [];

    yearContributions.forEach((day) => {
      // Parse UTC date
      const [y, m, d] = day.date.split("-").map(Number);
      const dateObj = new Date(Date.UTC(y, m - 1, d));
      const weekday = dateObj.getUTCDay();

      // Start new week if Sunday and we have items
      if (weekday === 0 && currentWeek.length > 0) {
        weeks.push({ contributionDays: currentWeek });
        currentWeek = [];
      }

      const levelEnum =
        day.level === 4
          ? "FOURTH_QUARTILE"
          : day.level === 3
          ? "THIRD_QUARTILE"
          : day.level === 2
          ? "SECOND_QUARTILE"
          : day.level === 1
          ? "FIRST_QUARTILE"
          : countToLevel(day.count, maxCount);

      currentWeek.push({
        date: day.date,
        contributionCount: day.count,
        contributionLevel: levelEnum,
        weekday,
      });
    });

    if (currentWeek.length > 0) {
      weeks.push({ contributionDays: currentWeek });
    }

    const response: CalendarResponse = {
      username,
      year,
      availableYears: availableYears.length > 0 ? availableYears : [currentYear],
      totalContributions,
      weeks,
      source: "rest_scraper",
    };

    return NextResponse.json(response);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to fetch GitHub contributions", details: message },
      { status: 500 }
    );
  }
}
