import type { Metadata } from "next";
import { Roboto, Space_Grotesk } from 'next/font/google'
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomScrollbar } from "@/components/CustomScrollbar";


const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})
const siteUrl = "https://prem-000.github.io";
const title = "Prema Sai Kuruva | Software Engineer";
const description =
  "Backend & AI-focused AIML student building FastAPI microservices, ML inference pipelines, and AI-powered developer tools. Experienced with Python, PostgreSQL, FastAPI, Next.js, and LLM integrations.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "Prema Sai Kuruva",
    "Software Engineer",
    "AIML",
    "FastAPI",
    "Python",
    "Machine Learning",
    "PostgreSQL",
    "Next.js",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Prema Sai Kuruva", url: "https://github.com/prem-000" }],
  creator: "Prema Sai Kuruva",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    type: "website",
    locale: "en_US",
    siteName: "Prema Sai Kuruva",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Prema Sai Kuruva — Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@prem-000",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>
          <CustomScrollbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}