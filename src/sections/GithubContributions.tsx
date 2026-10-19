"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FiArrowUpRight, FiRefreshCw } from "react-icons/fi";

interface ContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel: "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE";
  weekday: number;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface CalendarData {
  username: string;
  year: number;
  availableYears: number[];
  totalContributions: number;
  weeks: ContributionWeek[];
  source: "graphql" | "rest_scraper";
}

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatDate(dateStr: string): string {
  try {
    const [y, m, d] = dateStr.split("-").map(Number);
    const date = new Date(Date.UTC(y, m - 1, d));
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
  } catch {
    return dateStr;
  }
}

function getLevelStyle(level: ContributionDay["contributionLevel"]): {
  bg: string;
  border: string;
  shadow?: string;
} {
  switch (level) {
    case "FOURTH_QUARTILE":
      return {
        bg: "bg-cyan-400",
        border: "border-cyan-300",
        shadow: "0 0 10px rgba(34,211,238,0.75)",
      };
    case "THIRD_QUARTILE":
      return {
        bg: "bg-fuchsia-500",
        border: "border-fuchsia-400",
        shadow: "0 0 8px rgba(217,70,239,0.5)",
      };
    case "SECOND_QUARTILE":
      return {
        bg: "bg-violet-600",
        border: "border-violet-500",
        shadow: "0 0 6px rgba(124,58,237,0.4)",
      };
    case "FIRST_QUARTILE":
      return {
        bg: "bg-violet-950/90",
        border: "border-violet-800/60",
      };
    case "NONE":
    default:
      return {
        bg: "bg-white/[0.04]",
        border: "border-white/[0.05]",
      };
  }
}

export function GithubContributions() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [calendar, setCalendar] = useState<CalendarData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredDay, setHoveredDay] = useState<{
    day: ContributionDay;
    x: number;
    y: number;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const fetchContributions = async (year: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/github-contributions?username=prem-000&year=${year}`);
      if (!res.ok) {
        throw new Error(`Failed to load GitHub activity (Status: ${res.status})`);
      }
      const data: CalendarData = await res.json();
      setCalendar(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching activity");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    const loadData = async () => {
      try {
        const res = await fetch(`/api/github-contributions?username=prem-000&year=${selectedYear}`);
        if (!res.ok) {
          throw new Error(`Failed to load GitHub activity (Status: ${res.status})`);
        }
        const data: CalendarData = await res.json();
        if (!ignore) {
          setCalendar(data);
          setError(null);
          setLoading(false);
        }
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Error fetching activity");
          setLoading(false);
        }
      }
    };

    loadData();
    return () => {
      ignore = true;
    };
  }, [selectedYear]);

  // Compute month positions along week columns
  const monthLabels = useMemo(() => {
    if (!calendar?.weeks) return [];
    const labels: { name: string; weekIndex: number }[] = [];
    let lastMonth = -1;

    calendar.weeks.forEach((week, wIndex) => {
      const firstValidDay = week.contributionDays.find((d) => d?.date);
      if (firstValidDay) {
        const monthNum = parseInt(firstValidDay.date.split("-")[1], 10) - 1;
        if (monthNum !== lastMonth) {
          labels.push({ name: MONTH_NAMES[monthNum], weekIndex: wIndex });
          lastMonth = monthNum;
        }
      }
    });

    return labels;
  }, [calendar]);

  // Available years selector (defaults to current + previous years)
  const years = useMemo(() => {
    if (calendar?.availableYears && calendar.availableYears.length > 0) {
      return calendar.availableYears;
    }
    return [currentYear, currentYear - 1];
  }, [calendar, currentYear]);

  return (
    <section
      id="contributions"
      className="relative z-10 w-full py-20 md:py-28 px-4 sm:px-6 lg:px-8"
      aria-label="GitHub Contributions Calendar"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-10 md:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-4 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-cyan-400 font-medium">
              Open Source Activity
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            GitHub{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">
              Contributions
            </span>
          </h2>

          <p className="mt-3 text-white/50 text-sm md:text-base max-w-xl">
            Live commit history, pull requests, and software engineering activity
            verified directly through GitHub.
          </p>
        </motion.div>

        {/* Main Bento Card */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 sm:p-7 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="pointer-events-none absolute -top-32 -left-20 w-80 h-80 rounded-full bg-violet-600/15 blur-3xl opacity-70" />
          <div className="pointer-events-none absolute -bottom-32 -right-20 w-80 h-80 rounded-full bg-cyan-500/15 blur-3xl opacity-70" />

          {/* Top Control Bar */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2.5">
                <FaGithub className="w-5 h-5 text-white/80" />
                <h3 className="text-lg font-semibold text-white">
                  {calendar ? (
                    <>
                      <span className="text-cyan-400 font-bold">
                        {calendar.totalContributions.toLocaleString()}
                      </span>{" "}
                      contributions in {selectedYear}
                    </>
                  ) : (
                    "Loading GitHub Contributions..."
                  )}
                </h3>
              </div>
              <p className="text-xs text-white/45 mt-1">
                Account:{" "}
                <span className="text-white/80 font-mono">@prem-000</span>
              </p>
            </div>

            {/* Actions: Year Selector + Profile Link */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Year Pills */}
              <div
                className="inline-flex rounded-xl p-1 border border-white/10 bg-black/30 backdrop-blur-sm"
                role="radiogroup"
                aria-label="Filter contributions by year"
              >
                {years.map((year) => {
                  const isActive = selectedYear === year;
                  return (
                    <button
                      key={year}
                      type="button"
                      role="radio"
                      aria-checked={isActive}
                      onClick={() => setSelectedYear(year)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-gradient-to-r from-violet-500 to-cyan-500 text-white shadow-sm font-semibold"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {year}
                    </button>
                  );
                })}
              </div>

              {/* GitHub Profile Button */}
              <a
                href="https://github.com/prem-000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium text-white/80 border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white hover:border-violet-500/30 transition-all cursor-pointer"
                aria-label="View Prema Sai Kuruva's profile on GitHub (opens in new tab)"
              >
                <span>Profile</span>
                <FiArrowUpRight className="w-3.5 h-3.5 text-white/50" />
              </a>
            </div>
          </div>

          {/* Calendar Display Area */}
          <div className="relative mt-6" ref={containerRef}>
            {loading && !calendar && (
              <div className="flex flex-col items-center justify-center py-20 text-white/60">
                <FiRefreshCw className="w-6 h-6 animate-spin text-cyan-400 mb-3" />
                <p className="text-xs tracking-wider uppercase">Loading activity matrix...</p>
              </div>
            )}

            {error && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-sm text-rose-400 mb-4">{error}</p>
                <button
                  type="button"
                  onClick={() => fetchContributions(selectedYear)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-all cursor-pointer"
                >
                  <FiRefreshCw className="w-3.5 h-3.5" />
                  Retry Connection
                </button>
              </div>
            )}

            {!error && calendar && (
              <div className="overflow-x-auto pb-4 pt-2 scrollbar-thin">
                <div className="min-w-[760px] inline-block">
                  {/* Month header row */}
                  <div className="flex pl-8 mb-2 text-[11px] font-medium text-white/40 select-none">
                    {monthLabels.map((m, idx) => (
                      <span
                        key={`${m.name}-${idx}`}
                        style={{
                          width: `${(53 / 12) * 14}px`,
                          minWidth: "48px",
                        }}
                        className="truncate"
                      >
                        {m.name}
                      </span>
                    ))}
                  </div>

                  {/* Grid body: Weekdays label column + 53 week columns */}
                  <div className="flex items-start gap-1 sm:gap-1.5">
                    {/* Weekday indicators column */}
                    <div className="flex flex-col gap-1 sm:gap-1.5 text-[10px] text-white/40 pr-2 select-none">
                      {WEEKDAY_NAMES.map((name, i) => (
                        <span
                          key={name}
                          className="h-3 sm:h-3.5 flex items-center justify-end leading-none"
                        >
                          {i === 1 || i === 3 || i === 5 ? name : ""}
                        </span>
                      ))}
                    </div>

                    {/* Weeks grid */}
                    <div
                      className="flex gap-1 sm:gap-1.5"
                      role="grid"
                      aria-label={`GitHub contribution calendar for ${selectedYear}`}
                    >
                      {calendar.weeks.map((week, wIdx) => (
                        <div
                          key={`week-${wIdx}`}
                          className="flex flex-col gap-1 sm:gap-1.5"
                          role="row"
                        >
                          {Array.from({ length: 7 }).map((_, dIdx) => {
                            const day = week.contributionDays.find(
                              (d) => d.weekday === dIdx
                            );

                            if (!day) {
                              return (
                                <div
                                  key={`empty-${wIdx}-${dIdx}`}
                                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-[3px] bg-transparent opacity-0 pointer-events-none"
                                />
                              );
                            }

                            const style = getLevelStyle(day.contributionLevel);
                            const label = `${
                              day.contributionCount === 0
                                ? "No"
                                : day.contributionCount
                            } contribution${
                              day.contributionCount === 1 ? "" : "s"
                            } on ${formatDate(day.date)}`;

                            return (
                              <button
                                key={day.date}
                                type="button"
                                role="gridcell"
                                tabIndex={0}
                                aria-label={label}
                                onMouseEnter={(e) => {
                                  const rect = e.currentTarget.getBoundingClientRect();
                                  const cRect = containerRef.current?.getBoundingClientRect();
                                  if (cRect) {
                                    setHoveredDay({
                                      day,
                                      x: rect.left - cRect.left + rect.width / 2,
                                      y: rect.top - cRect.top,
                                    });
                                  }
                                }}
                                onFocus={(e) => {
                                  const rect = e.currentTarget.getBoundingClientRect();
                                  const cRect = containerRef.current?.getBoundingClientRect();
                                  if (cRect) {
                                    setHoveredDay({
                                      day,
                                      x: rect.left - cRect.left + rect.width / 2,
                                      y: rect.top - cRect.top,
                                    });
                                  }
                                }}
                                onMouseLeave={() => setHoveredDay(null)}
                                onBlur={() => setHoveredDay(null)}
                                style={{ boxShadow: style.shadow }}
                                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-[3px] border ${style.bg} ${style.border} transition-transform duration-150 hover:scale-125 focus:scale-125 focus:outline-none focus:ring-1 focus:ring-cyan-300 cursor-pointer`}
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Accessible interactive floating tooltip */}
            {hoveredDay && (
              <div
                style={{
                  left: `${hoveredDay.x}px`,
                  top: `${hoveredDay.y - 10}px`,
                  transform: "translate(-50%, -100%)",
                }}
                className="pointer-events-none absolute z-30 px-3 py-1.5 rounded-lg bg-zinc-950/95 border border-white/20 text-white shadow-xl backdrop-blur-md whitespace-nowrap text-xs animate-in fade-in zoom-in-95 duration-100"
              >
                <span className="font-semibold text-cyan-300">
                  {hoveredDay.day.contributionCount === 0
                    ? "No contributions"
                    : `${hoveredDay.day.contributionCount} contribution${
                        hoveredDay.day.contributionCount === 1 ? "" : "s"
                      }`}
                </span>
                <span className="text-white/50 ml-1.5">
                  on {formatDate(hoveredDay.day.date)}
                </span>
              </div>
            )}
          </div>

          {/* Footer Bar: Legend & Metadata */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10 text-xs text-white/50">
            <span className="text-[11px] text-white/40">
              Data synchronized via GitHub API · Real-time updates
            </span>

            {/* Intensity Legend */}
            <div className="flex items-center gap-1.5 select-none" aria-hidden="true">
              <span className="text-[11px] mr-1">Less</span>
              <span className="w-3 h-3 rounded-[3px] bg-white/[0.04] border border-white/[0.05]" />
              <span className="w-3 h-3 rounded-[3px] bg-violet-950/90 border border-violet-800/60" />
              <span className="w-3 h-3 rounded-[3px] bg-violet-600 border border-violet-500 shadow-[0_0_6px_rgba(124,58,237,0.4)]" />
              <span className="w-3 h-3 rounded-[3px] bg-fuchsia-500 border border-fuchsia-400 shadow-[0_0_8px_rgba(217,70,239,0.5)]" />
              <span className="w-3 h-3 rounded-[3px] bg-cyan-400 border border-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.75)]" />
              <span className="text-[11px] ml-1">More</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
