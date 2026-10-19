"use client";

import LogoLoop from "@/components/LogoLoop";
import { motion } from "framer-motion";
import {
    SiReact,
    SiNextdotjs,
    SiTypescript,
    SiJavascript,
    SiTailwindcss,
    SiPython,
    SiDocker,
    SiGit,
    SiGithub,
    SiMongodb,
    SiMysql,
    SiPostgresql,
    SiSqlite,
    SiPrisma,
    SiSupabase,
    SiFastapi,
    SiScikitlearn,
    SiVercel,
    SiLangchain,
    SiPostman,
    SiHtml5,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

const technologies = [
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "FastAPI", icon: SiFastapi, color: "#009688" },
    { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "scikit-learn", icon: SiScikitlearn, color: "#F7931E" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "Prisma", icon: SiPrisma, color: "#2D3748" },
    { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
    { name: "LangChain", icon: SiLangchain, color: "#22c55e" },
    { name: "Docker", icon: SiDocker, color: "#2496ED" },
    { name: "Git", icon: SiGit, color: "#F05032" },
    { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
    { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
    { name: "Postman", icon: SiPostman, color: "#FF6C37" },
    { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    { name: "SQLite", icon: SiSqlite, color: "#003B57" },
    { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
    { name: "Java", icon: FaJava, color: "#ED8B00" },
];

const techLogos = technologies.map((tech) => {
    const Icon = tech.icon;

    return {
        node: (
            <div className="flex items-center gap-3 h-14 px-6 min-w-[180px] rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-violet-500/40">
                <Icon
                    className="text-2xl shrink-0"
                    style={{ color: tech.color }}
                />
                <span className="text-sm font-medium text-white">
                    {tech.name}
                </span>
            </div>
        ),
    };
});



export const About = () => {
    return (
        <>
            <section id="about" className="relative overflow-hidden py-24">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-center gap-4 mb-6"
                    >
                        <div className="px-3.5 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm">
                            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-cyan-400 font-medium">
                                Technology Stack
                            </span>
                        </div>

                        <h2 className="text-center text-4xl md:text-5xl font-semibold text-white">
                            Technologies I Work With
                        </h2>

                        <p className="max-w-2xl text-center text-zinc-400">
                            Modern frameworks, backend technologies, databases, cloud
                            tools, and development workflows used to build scalable
                            applications.
                        </p>
                    </motion.div>
                </div>
                <div className="w-full flex flex-col gap-6 mt-12">
                    <LogoLoop
                        logos={techLogos}
                        speed={80}
                        direction="left"
                        logoHeight={30}
                        gap={24}
                        pauseOnHover
                        fadeOut
                        fadeOutColor="#1a0018"
                    />

                    <LogoLoop
                        logos={techLogos}
                        speed={80}
                        direction="right"
                        logoHeight={30}
                        gap={24}
                        pauseOnHover
                        fadeOut
                        fadeOutColor="#1a0018"
                    />
                </div>

            </section></>
    )
}

