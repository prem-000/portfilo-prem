"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import {
  FiCopy,
  FiCheck,
  FiMail,
  FiMapPin,
  FiArrowUpRight,
  FiDownload,
} from "react-icons/fi";

const EMAIL = "premmkuruva@gmail.com";

const socials = [
  {
    name: "GitHub",
    handle: "@prem-000",
    icon: FaGithub,
    href: "https://github.com/prem-000",
    color: "#a78bfa",
  },
  {
    name: "LinkedIn",
    handle: "kuruva-prema-sai",
    icon: FaLinkedinIn,
    href: "https://linkedin.com/in/kuruva-prema-sai",
    color: "#0A66C2",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const SocialConnect = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context); silently ignore.
    }
  };

  return (
    <section
      id="contact"
      className="relative z-10 w-full py-24 md:py-32 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-5xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm mb-5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[11px] uppercase tracking-[0.25em] text-white/70">
              Open to opportunities
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
            Let&apos;s build something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">
              great together
            </span>
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto">
            Have a project in mind, a role to fill, or just want to say hi? My
            inbox is always open.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Email hero cell */}
          <motion.div
            variants={itemVariants}
            className="group relative sm:col-span-2 lg:col-span-2 lg:row-span-2 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 md:p-8 flex flex-col justify-between min-h-[260px]"
          >
            {/* decorative glow + dot grid */}
            <div className="pointer-events-none absolute -top-24 -right-16 w-72 h-72 rounded-full bg-violet-600/20 blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
                maskImage:
                  "radial-gradient(circle at 30% 20%, black, transparent 75%)",
                WebkitMaskImage:
                  "radial-gradient(circle at 30% 20%, black, transparent 75%)",
              }}
            />

            <div className="relative">
              <div className="flex items-center gap-2 text-cyan-400 mb-4">
                <FiMail className="w-4 h-4" />
                <span className="text-xs uppercase tracking-[0.25em]">
                  Email me
                </span>
              </div>
              <p className="text-white/50 text-sm mb-2">
                The fastest way to reach me:
              </p>
              <button
                onClick={copyEmail}
                className="text-left text-lg md:text-2xl font-semibold text-white break-all hover:text-cyan-300 transition-colors cursor-pointer"
              >
                {EMAIL}
              </button>
            </div>

            <div className="relative flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={copyEmail}
                aria-label="Copy email address to clipboard"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-white border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/25 transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <FiCheck className="w-4 h-4 text-emerald-400" />
                    Copied!
                  </>
                ) : (
                  <>
                    <FiCopy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
              <a
                href={`mailto:${EMAIL}`}
                aria-label="Open your email client to write me a message"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-400 hover:to-cyan-400 shadow-[0_8px_24px_rgba(139,92,246,0.25)] transition-all cursor-pointer"
              >
                Write a message
                <FiArrowUpRight className="w-4 h-4" />
              </a>
            </div>
            {/* a11y live region for copy feedback */}
            <span aria-live="polite" className="sr-only">
              {copied ? "Email address copied to clipboard" : ""}
            </span>
          </motion.div>

          {/* Availability + location cell */}
          <motion.div
            variants={itemVariants}
            className="sm:col-span-2 lg:col-span-2 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 flex flex-col justify-center gap-3"
          >
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-base md:text-lg font-semibold text-white">
                Available for new projects
              </span>
            </div>
            <p className="text-sm text-white/50">
              Currently taking on freelance and full-time work. I usually reply
              within a day.
            </p>
            <div className="flex items-center gap-2 text-sm text-white/40 mt-1">
              <FiMapPin className="w-4 h-4" />
              <span>Available Worldwide · Remote</span>
            </div>
          </motion.div>

          {/* Social cells */}
          {socials.map((social) => (
            <motion.a
              key={social.name}
              variants={itemVariants}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${social.name} (opens in a new tab)`}
              style={{ "--brand": social.color } as React.CSSProperties}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5 flex items-center justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand)] cursor-pointer"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-[0.18] transition-opacity duration-300"
                style={{
                  background:
                    "radial-gradient(circle at 50% 120%, var(--brand), transparent 70%)",
                }}
              />
              <div className="relative flex items-center gap-3 min-w-0">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 transition-colors duration-300 group-hover:text-[var(--brand)]">
                  <social.icon className="w-5 h-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-white">
                    {social.name}
                  </span>
                  <span className="block text-xs text-white/40 truncate">
                    {social.handle}
                  </span>
                </span>
              </div>
              <FiArrowUpRight className="relative w-4 h-4 text-white/30 transition-all duration-300 group-hover:text-[var(--brand)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>
          ))}

          {/* Resume cell */}
          <motion.a
            variants={itemVariants}
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download resume (PDF, opens in a new tab)"
            className="group relative overflow-hidden sm:col-span-2 rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 backdrop-blur-sm p-6 flex items-center justify-between transition-all duration-300 hover:border-violet-400/40 hover:-translate-y-1 cursor-pointer"
          >
            <div className="relative flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 text-white shadow-[0_8px_24px_rgba(139,92,246,0.3)]">
                <FiDownload className="w-5 h-5" />
              </span>
              <span>
                <span className="block text-base font-semibold text-white">
                  Download Resume
                </span>
                <span className="block text-xs text-white/50">
                  Full CV · PDF
                </span>
              </span>
            </div>
            <FiArrowUpRight className="relative w-5 h-5 text-white/40 transition-all duration-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </div>

      </motion.div>
    </section>
  );
};

export { SocialConnect };
