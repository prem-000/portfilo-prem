"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import ElectricBorder from '@/components/ElectricBorder'

const Hyperspeed = dynamic(() => import('@/components/ui/HyperSpeed'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-black" />,
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const
    }
  }
};

export const HeroSection: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", section: "home" },
    { label: "Projects", section: "projects" },
    { label: "About", section: "about" },
    { label: "Contact", section: "contact" },
  ];
  return (
    <div id="home" className="relative w-full bg-transparent text-white overflow-hidden">
      {/* Hyperspeed background */}
      <div className="absolute inset-0 z-0">
        <Hyperspeed />
      </div>
      {/* Main container with space for content */}
      <div className="relative z-30 flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 h-screen overflow-hidden">
        {/* Navigation */}
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full flex items-center justify-between px-5 md:px-6 py-3 rounded-full bg-black/20 backdrop-blur-xl md:backdrop-blur-3xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)] mb-8"
        >
          <div
            className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-violet-500/20 via-violet-400/10 to-cyan-500/20 border border-white/10"
          >
            <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="6" width="32" height="28" rx="6" stroke="white" strokeWidth="2.5" />
              <path d="M11 14L17 20L11 26" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 26H29" stroke="white" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() =>
                  document
                    .getElementById(item.section)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-5 py-2.5 rounded-full text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </motion.nav>

        {/* Mobile menu */}
        <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-sm rounded-[32px] bg-[linear-gradient(180deg,rgba(10,10,10,0.92)_0%,rgba(53,1,54,0.28)_100%)] backdrop-blur-3xl border border-white/10 shadow-[0_0_60px_rgba(139,92,246,0.15)] overflow-hidden p-8"
            >
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.12),transparent_65%)]" />

              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[rgba(53,1,54,0.15)] border border-white/10 backdrop-blur-xl flex items-center justify-center text-white/80 hover:text-white hover:border-violet-500/20 transition-all cursor-pointer"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="relative flex flex-col gap-3 mt-8">
                {navItems.map((item, index) => (
                  <ElectricBorder
                    key={item.label}
                    color="#B497CF"
                    speed={1.5}
                    chaos={0.06}
                    borderRadius={13}
                  >
                    <motion.button
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08, duration: 0.3 }}
                      onClick={() => {
                        document
                          .getElementById(item.section)
                          ?.scrollIntoView({ behavior: "smooth" });

                        setMobileMenuOpen(false);
                      }}
                      className="w-full py-4 rounded-2xl hover:text-white transition-all duration-300 cursor-pointer"
                    >
                      {item.label}
                    </motion.button>
                  </ElectricBorder>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>


        {/* Main hero content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-30 flex-1 flex items-center justify-center w-full"
        >
          <div className="text-center flex flex-col items-center w-full max-w-3xl mx-auto">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-emerald-500/25 bg-emerald-500/5 backdrop-blur-sm md:backdrop-blur-md mb-4 md:mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[10px] md:text-xs tracking-[0.15em] md:tracking-[0.2em] text-emerald-300 uppercase">
                Available for new opportunities
              </span>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-cyan-400 uppercase tracking-[0.2em] md:tracking-[0.3em] text-sm md:text-base mb-3 md:mb-4"
            >
              Prema Sai Kuruva
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold leading-[0.95] tracking-[-0.06em] text-white"
            >
              Software
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">
                Engineer
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-4 md:mt-8 text-gray-400 text-sm md:text-lg max-w-xl mx-auto"
            >
              Backend &amp; AI-focused AIML student building FastAPI microservices,
              ML inference pipelines, and AI-powered developer tools.
              Experienced with Python, PostgreSQL, FastAPI, Next.js, and LLM integrations.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="mt-6 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            >
              <ElectricBorder
                color="#B497CF"
                speed={1.7}
                chaos={0.05}
                borderRadius={16}
              >
                <button
                  onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-6 md:px-8 py-3 md:py-4 rounded-xl font-medium text-sm md:text-base cursor-pointer"
                >
                  View Projects →
                </button>
              </ElectricBorder>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 md:px-8 py-3 md:py-4 rounded-xl font-medium text-sm md:text-base text-white/80 border border-white/15 bg-white/5 hover:bg-white/10 hover:text-white hover:border-white/25 transition-all duration-300 cursor-pointer"
              >
                Get in touch
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          aria-label="Scroll to about section"
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex-col items-center gap-2 text-white/40 hover:text-white/80 transition-colors cursor-pointer"
        >
          <span className="text-[10px] uppercase tracking-[0.25em]">Scroll</span>
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
            <motion.span
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-white/70"
            />
          </span>
        </motion.button>
      </div>
    </div>
  );
};
