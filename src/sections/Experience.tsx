"use client";

import { motion } from "framer-motion";
import { experienceItems } from "@/data/experience";
import type { ExperienceItem } from "@/data/types";

const accentColors: { bg: string; glow: string; line: string }[] = [
  {
    bg: "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.12) 0%, transparent 70%)",
    glow: "rgba(139,92,246,0.25)",
    line: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), rgba(139,92,246,0.4), rgba(255,255,255,0.5), transparent)",
  },
  {
    bg: "radial-gradient(ellipse at 50% 0%, rgba(6,182,212,0.12) 0%, transparent 70%)",
    glow: "rgba(6,182,212,0.25)",
    line: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), rgba(6,182,212,0.4), rgba(255,255,255,0.5), transparent)",
  },
  {
    bg: "radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.12) 0%, transparent 70%)",
    glow: "rgba(16,185,129,0.25)",
    line: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), rgba(16,185,129,0.4), rgba(255,255,255,0.5), transparent)",
  },
  {
    bg: "radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.12) 0%, transparent 70%)",
    glow: "rgba(245,158,11,0.25)",
    line: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), rgba(245,158,11,0.4), rgba(255,255,255,0.5), transparent)",
  },
  {
    bg: "radial-gradient(ellipse at 50% 0%, rgba(244,63,94,0.12) 0%, transparent 70%)",
    glow: "rgba(244,63,94,0.25)",
    line: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), rgba(244,63,94,0.4), rgba(255,255,255,0.5), transparent)",
  },
];

function TypeBadge({ type }: { type: ExperienceItem["type"] }) {
  const colorMap: Record<ExperienceItem["type"], string> = {
    "Full-time": "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    "Part-time": "border-blue-500/30 bg-blue-500/10 text-blue-400",
    Contract: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    Internship: "border-violet-500/30 bg-violet-500/10 text-violet-400",
    Freelance: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
  };

  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full font-mono text-[11px] font-medium tracking-[0.05em] uppercase border ${colorMap[type]}`}
    >
      {type}
    </span>
  );
}

function TimelineCard({
  item,
  index,
}: {
  item: ExperienceItem;
  index: number;
}) {
  const isLeft = index % 2 === 0;
  const accent = accentColors[index % accentColors.length];

  const card = (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-white/[0.12]"
    >
      {/* Top whitish accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] opacity-40 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: accent.line }}
      />

      {/* Hover background glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: accent.bg }}
      />
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[60%] h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-3xl"
        style={{ backgroundColor: accent.glow }}
      />

      {/* Card content — horizontal layout */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        {/* Left meta column */}
        <div className="p-5 md:p-6 sm:border-r border-b sm:border-b-0 border-white/[0.04] group-hover:border-white/[0.08] transition-colors duration-500">
          <div className="flex sm:flex-col items-start gap-2 sm:gap-3">
            <span className="text-sm font-medium text-white/70 group-hover:text-white/90 transition-colors duration-300">
              {item.startDate} — {item.endDate}
            </span>
            <TypeBadge type={item.type} />
            <div className="hidden sm:block mt-1">
              {item.companyUrl ? (
                <a
                  href={item.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  {item.company}
                </a>
              ) : (
                <span className="text-sm font-medium text-cyan-400">
                  {item.company}
                </span>
              )}
              <p className="text-xs text-zinc-500 mt-0.5">{item.location}</p>
            </div>
          </div>
        </div>

        {/* Right content */}
        <div className="min-w-0 p-5 md:p-6">
          <h3 className="text-lg font-semibold text-white mb-0.5 group-hover:text-white transition-colors">
            {item.role}
          </h3>

          {/* Mobile-only company line */}
          <div className="sm:hidden flex items-center gap-1.5 mb-2">
            {item.companyUrl ? (
              <a
                href={item.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                {item.company}
              </a>
            ) : (
              <span className="text-sm text-cyan-400">{item.company}</span>
            )}
            <span className="text-zinc-600">·</span>
            <span className="text-xs text-zinc-500">{item.location}</span>
          </div>

          <p className="text-sm text-zinc-400 mb-3">{item.description}</p>

          <ul className="space-y-1 mb-4">
            {item.highlights.map((highlight, i) => (
              <li
                key={i}
                className="text-sm text-zinc-400/80 flex items-start gap-2"
              >
                <span className="text-violet-400 mt-0.5 shrink-0">▹</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5">
            {item.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/[0.04] text-zinc-400 border border-white/[0.06] group-hover:border-white/[0.1] transition-colors duration-300"
              >
                {t}
              </span>
            ))}
          </div>

          {item.projects && item.projects.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-white/[0.04]">
              <span className="text-[11px] uppercase tracking-wider text-zinc-500">
                Projects
              </span>
              {item.projects.map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium text-cyan-400 bg-cyan-500/[0.06] border border-cyan-500/20 hover:bg-cyan-500/[0.12] hover:border-cyan-500/30 transition-all duration-300"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                  {p.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="relative grid md:grid-cols-[1fr_36px_1fr] items-start">
      {/* Left side */}
      <div className={isLeft ? "md:pr-3" : "md:order-3 md:pl-3"}>
        {card}
      </div>

      {/* Center timeline column */}
      <div className="hidden md:flex flex-col items-center relative order-2">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="relative z-10 mt-7"
        >
          <div
            className="w-4 h-4 rounded-full border-2 bg-[#1a0018] transition-shadow duration-500"
            style={{
              borderColor: accent.glow,
              boxShadow: `0 0 8px ${accent.glow}`,
            }}
          />
          <div
            className="absolute inset-0 w-4 h-4 rounded-full animate-ping"
            style={{ backgroundColor: accent.glow, opacity: 0.3 }}
          />
        </motion.div>
      </div>

      {/* Empty opposite side */}
      <div
        className={`hidden md:block ${isLeft ? "md:order-3" : "md:order-1"}`}
      />
    </div>
  );
}

export function Experience() {
  return (
    <section className="relative overflow-hidden py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4 mb-16"
        >
          <div className="px-3.5 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 backdrop-blur-sm">
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-violet-400 font-medium">
              Career Path
            </span>
          </div>

          <h2 className="text-center text-4xl md:text-5xl font-semibold text-white">
            Work Experience
          </h2>

          <p className="max-w-2xl text-center text-zinc-400">
            A timeline of my professional journey building products, solving
            problems, and growing as a developer.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center vertical line — desktop */}
          <div className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-cyan-500/20 to-transparent" />

          {/* Mobile left line */}
          <div className="md:hidden absolute left-[7px] top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/40 via-cyan-500/20 to-transparent" />

          <div className="flex flex-col gap-8 md:gap-12">
            {experienceItems.map((item, index) => (
              <div key={item.id} className="relative">
                {/* Mobile dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="md:hidden absolute left-0 top-6 z-10"
                >
                  <div
                    className="w-3.5 h-3.5 rounded-full border-2 bg-[#1a0018]"
                    style={{
                      borderColor: accentColors[index % accentColors.length].glow,
                    }}
                  />
                </motion.div>

                {/* Mobile card */}
                <div className="md:hidden pl-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-white/[0.12]"
                  >
                    {/* Top accent line */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[1px] opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          accentColors[index % accentColors.length].line,
                      }}
                    />
                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{
                        background:
                          accentColors[index % accentColors.length].bg,
                      }}
                    />

                    <div className="relative z-10 p-5">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-white/70">
                          {item.startDate} — {item.endDate}
                        </span>
                        <TypeBadge type={item.type} />
                      </div>

                      <h3 className="text-lg font-semibold text-white mb-0.5">
                        {item.role}
                      </h3>

                      <div className="flex items-center gap-1.5 mb-3">
                        {item.companyUrl ? (
                          <a
                            href={item.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                          >
                            {item.company}
                          </a>
                        ) : (
                          <span className="text-sm text-cyan-400">
                            {item.company}
                          </span>
                        )}
                        <span className="text-zinc-600">·</span>
                        <span className="text-xs text-zinc-500">
                          {item.location}
                        </span>
                      </div>

                      <p className="text-sm text-zinc-400 mb-3">
                        {item.description}
                      </p>

                      <ul className="space-y-1 mb-3">
                        {item.highlights.map((highlight, i) => (
                          <li
                            key={i}
                            className="text-sm text-zinc-400/80 flex items-start gap-2"
                          >
                            <span className="text-violet-400 mt-0.5 shrink-0">
                              ▹
                            </span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5">
                        {item.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/[0.04] text-zinc-400 border border-white/[0.06]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {item.projects && item.projects.length > 0 && (
                        <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-white/[0.04]">
                          <span className="text-[11px] uppercase tracking-wider text-zinc-500">
                            Projects
                          </span>
                          {item.projects.map((p) => (
                            <a
                              key={p.name}
                              href={p.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium text-cyan-400 bg-cyan-500/[0.06] border border-cyan-500/20 hover:bg-cyan-500/[0.12] hover:border-cyan-500/30 transition-all duration-300"
                            >
                              <svg
                                className="w-3.5 h-3.5"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                              </svg>
                              {p.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Desktop two-sided card */}
                <div className="hidden md:block">
                  <TimelineCard item={item} index={index} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
