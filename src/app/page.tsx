import HomePage from "./home-page";
import { HeroSection } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Experience } from "@/sections/Experience";
import { Projects } from "@/sections/Projects";
import { SocialConnect } from "@/sections/Contact";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Prema Sai Kuruva",
  url: "https://prem-000.github.io",
  jobTitle: "Software Engineer",
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Kalasalingam Academy of Research and Education (KARE)",
  },
  sameAs: [
    "https://github.com/prem-000",
    "https://linkedin.com/in/kuruva-prema-sai",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen w-full relative">
        {/* Orchid Depths */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "radial-gradient(125% 125% at 50% 10%, #000000 40%, #350136 100%)",
          }}
        />
        <HomePage />
        <HeroSection />
        <About />
        <Experience />
        <Projects />
        <SocialConnect />
      </div>
    </>
  );
}
