"use client";

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import {
  FiCopy,
  FiCheck,
  FiMail,
  FiMapPin,
  FiArrowUpRight,
  FiFileText,
} from "react-icons/fi";

const EMAIL = "premmkuruva@gmail.com";
const RESUME_URL = "/resume.pdf";
const GITHUB_URL = "https://github.com/prem-000";
const LINKEDIN_URL = "https://linkedin.com/in/kuruva-prema-sai";

const navLinks = [
  { label: "ABOUT", href: "#about" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CONTACT", href: "#contact" },
];

const SocialConnect = () => {
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable; silently ignore
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0.1 }
        : { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="contact"
      className="relative z-10 w-full py-20 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8 text-white selection:bg-violet-500/30"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="space-y-12 sm:space-y-16"
        >
          {/* Top Editorial Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <div className="inline-block relative">
              <span
                className="font-mono text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-[0.28em] text-transparent bg-clip-text select-none block"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255, 255, 255, 0.95) 1.5px, rgba(255, 255, 255, 0.25) 1.5px)",
                  backgroundSize: "6px 6px",
                  letterSpacing: "0.26em",
                }}
                aria-label="CONTACT"
              >
                CONTACT
              </span>
            </div>
            <p className="font-inter text-white/55 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed font-normal">
              A direct line for internships, software engineering roles, AI systems work, and technical collaborations.
            </p>
          </motion.div>

          {/* Editorial Split Composition Container */}
          <motion.div
            variants={itemVariants}
            className="relative border border-white/10 bg-[#0a0710]/85 backdrop-blur-md rounded-none sm:rounded-sm overflow-hidden shadow-[0_12px_48px_-12px_rgba(0,0,0,0.85)]"
          >
            {/* Subtle background ambient purple texture */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="pointer-events-none absolute -top-32 -left-32 w-80 h-80 rounded-full bg-violet-700/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-rose-600/10 blur-3xl" />

            <div className="relative grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
              {/* Left Column: Large Contact Introduction */}
              <div className="lg:col-span-7 p-7 sm:p-10 md:p-12 flex flex-col justify-between space-y-8">
                <div className="space-y-6">
                  {/* Top Subtitle & Category */}
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium tracking-tight">
                      Portfolio Contact
                    </h3>
                    <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-white/40">
                      DIRECT CHANNELS
                    </p>
                  </div>

                  {/* Large Prominent Name */}
                  <div className="pt-2 pb-1">
                    <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-white tracking-tight leading-[0.92]">
                      <span className="block">Prema Sai</span>
                      <span className="block">Kuruva</span>
                    </h2>
                  </div>

                  {/* Restrained Accent Role Badges */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs sm:text-sm tracking-[0.18em] uppercase">
                    <span className="text-rose-500 font-semibold">SOFTWARE ENGINEER</span>
                    <span className="text-white/25">/</span>
                    <span className="text-violet-400 font-semibold">AI &amp; ML</span>
                  </div>

                  {/* Editorial Description */}
                  <div className="space-y-2 pt-2 max-w-lg font-inter text-white/70 text-sm sm:text-base leading-relaxed font-normal">
                    <p>
                      For internships, interviews, collaborations, and software engineering opportunities.
                    </p>
                    <p className="text-white/50">
                      Use the directory for the fastest route.
                    </p>
                  </div>
                </div>

                {/* Status Indicator / Availability */}
                <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                  <div className="inline-flex items-center gap-2.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/80">
                      Available for Opportunities
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs text-white/40 tracking-wider">
                    <FiMapPin className="w-3.5 h-3.5 text-rose-400/80" />
                    <span>IST (UTC+5:30)</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Structured Contact Directory */}
              <div className="lg:col-span-5 p-7 sm:p-10 md:p-12 flex flex-col justify-between space-y-6 bg-black/20">
                <div className="space-y-6">
                  {/* Directory Header */}
                  <div className="space-y-1">
                    <h3 className="font-serif text-3xl sm:text-4xl text-white font-medium tracking-tight">
                      Directory
                    </h3>
                    <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-white/40">
                      EMAIL, SOCIALS, AND RESUME
                    </p>
                  </div>

                  {/* Directory List */}
                  <div className="space-y-3 pt-2">
                    {/* 1. Email Directory Item */}
                    <div className="group relative border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-violet-500/40 transition-colors duration-200 p-4 sm:p-5 flex items-center justify-between">
                      <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-none sm:rounded-sm border border-rose-500/20 bg-rose-500/10 text-rose-400 group-hover:border-rose-500/40 transition-colors">
                          <FiMail className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-0.5">
                            EMAIL
                          </span>
                          <a
                            href={`mailto:${EMAIL}`}
                            className="font-inter font-semibold text-xs sm:text-sm md:text-base text-white hover:text-rose-300 transition-colors truncate block"
                            title={EMAIL}
                          >
                            {EMAIL}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0 ml-3">
                        <button
                          type="button"
                          onClick={copyEmail}
                          aria-label="Copy email address"
                          title="Copy email address"
                          className="p-2 text-white/50 hover:text-white transition-colors cursor-pointer"
                        >
                          {copied ? (
                            <FiCheck className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <FiCopy className="w-4 h-4" />
                          )}
                        </button>
                        <a
                          href={`mailto:${EMAIL}`}
                          aria-label="Send email"
                          title="Send email"
                          className="p-2 text-white/50 group-hover:text-rose-400 transition-colors cursor-pointer"
                        >
                          <FiArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                        </a>
                      </div>

                      {/* Screen reader notification for copy */}
                      <span aria-live="polite" className="sr-only">
                        {copied ? "Email address copied to clipboard" : ""}
                      </span>
                    </div>

                    {/* 2. Socials Grid (LinkedIn & GitHub) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* LinkedIn */}
                      <a
                        href={LINKEDIN_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn profile (opens in new tab)"
                        className="group border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-violet-500/40 transition-colors duration-200 p-4 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-none sm:rounded-sm border border-violet-500/20 bg-violet-500/10 text-violet-400 group-hover:border-violet-500/40 transition-colors">
                            <FaLinkedinIn className="w-4 h-4" />
                          </span>
                          <div className="min-w-0">
                            <span className="font-inter font-semibold text-sm text-white block truncate group-hover:text-violet-300 transition-colors">
                              LinkedIn
                            </span>
                            <span className="font-mono text-[11px] text-white/40 block truncate">
                              kuruva-prema-sai
                            </span>
                          </div>
                        </div>
                        <FiArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-violet-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0 ml-2" />
                      </a>

                      {/* GitHub */}
                      <a
                        href={GITHUB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub profile (opens in new tab)"
                        className="group border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-violet-500/40 transition-colors duration-200 p-4 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-none sm:rounded-sm border border-violet-500/20 bg-violet-500/10 text-violet-400 group-hover:border-violet-500/40 transition-colors">
                            <FaGithub className="w-4 h-4" />
                          </span>
                          <div className="min-w-0">
                            <span className="font-inter font-semibold text-sm text-white block truncate group-hover:text-violet-300 transition-colors">
                              GitHub
                            </span>
                            <span className="font-mono text-[11px] text-white/40 block truncate">
                              prem-000
                            </span>
                          </div>
                        </div>
                        <FiArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-violet-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0 ml-2" />
                      </a>
                    </div>

                    {/* Location item */}
                    <div className="border border-white/[0.06] bg-white/[0.01] px-4 py-3 flex items-center gap-2.5 text-xs text-white/50 font-inter">
                      <FiMapPin className="w-3.5 h-3.5 text-rose-500/80 shrink-0" />
                      <span className="truncate">KURNOOL, Andhra Pradesh, India</span>
                    </div>

                    {/* 3. Resume Button */}
                    <a
                      href={RESUME_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View Resume (PDF, opens in new tab)"
                      className="group border border-white/20 bg-white/[0.03] hover:bg-violet-600/10 hover:border-violet-400/60 transition-all duration-200 py-3.5 px-5 flex items-center justify-center gap-2.5 text-white font-inter text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase cursor-pointer"
                    >
                      <FiFileText className="w-4 h-4 text-violet-400 group-hover:scale-110 transition-transform duration-200" />
                      <span>VIEW RESUME</span>
                      <FiArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-violet-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Reference-Inspired Bottom Editorial Section ("End of Page") */}
          <motion.div
            variants={itemVariants}
            className="pt-10 sm:pt-14 border-t border-white/10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left: End of page note & nav */}
              <div className="lg:col-span-7 space-y-5">
                <div className="space-y-2">
                  <span className="font-mono text-[10px] tracking-[0.24em] uppercase font-semibold text-rose-500 block">
                    END OF PAGE
                  </span>
                  <p className="font-inter text-sm sm:text-base text-white/60 max-w-lg leading-relaxed">
                    Navigation, source links, and direct contact for work around AI systems, full-stack products, and software engineering.
                  </p>
                </div>

                {/* Quick Nav Links */}
                <nav aria-label="Page footer navigation" className="flex flex-wrap items-center gap-5 sm:gap-7 pt-2">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="font-mono text-[11px] tracking-[0.2em] text-white/40 hover:text-violet-300 transition-colors uppercase"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Right: Quick Conversation Callout */}
              <div className="lg:col-span-5 space-y-3">
                <div className="border border-white/10 bg-white/[0.02] p-4 sm:p-5 space-y-3">
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/40 block">
                    START A CONVERSATION
                  </span>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="group flex items-center justify-between text-sm sm:text-base font-inter font-semibold text-white hover:text-rose-300 transition-colors"
                  >
                    <span className="truncate">{EMAIL}</span>
                    <FiArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-rose-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
                  </a>
                </div>

                <div className="flex items-center justify-between px-1 font-mono text-[11px] tracking-wider text-white/40">
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-violet-300 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span className="text-violet-400 font-bold">in</span> LINKEDIN
                  </a>
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-violet-300 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span className="text-violet-400 font-bold">git</span> GITHUB
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Copyright Strip */}
            <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px] tracking-widest text-white/40 uppercase">
              <span>&copy; {new Date().getFullYear()} PREMA SAI KURUVA</span>
              <span>SOFTWARE ENGINEER &middot; AI SYSTEMS</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export { SocialConnect };
export default SocialConnect;
