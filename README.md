# Prema Sai Kuruva — Developer Portfolio

A modern, high-performance developer portfolio built with Next.js 16, featuring immersive 3D visuals, smooth scroll animations, and a dark orchid-themed design.

## Features

- **Hyperspeed Background** — WebGL-powered particle animation in the hero section
- **Smooth Scroll** — Lenis-based silky smooth scrolling across the entire site
- **Custom Scrollbar** — Purple-themed scrollbar with auto-hide and drag support
- **Electric Border Buttons** — Animated neon-glow border effect on interactive elements
- **Logo Loop** — Infinite scrolling tech stack showcase
- **Framer Motion Animations** — Scroll-triggered section reveals with staggered transitions
- **Responsive Design** — Fully responsive from mobile to desktop with tailored layouts
- **SEO Optimized** — Open Graph, Twitter Card, and structured metadata

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4, shadcn/ui |
| Animations | Framer Motion, GSAP |
| 3D / WebGL | Three.js, React Three Fiber, OGL |
| Smooth Scroll | Lenis |
| Icons | react-icons, Lucide, Tabler Icons |

## Getting Started

### Prerequisites

- Node.js 18+
- npm, pnpm, or bun

### Installation

```bash
git clone https://github.com/prem-000/portfolio.git
cd portfolio
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts, SEO, smooth scroll
│   ├── page.tsx            # Home page composing all sections
│   └── globals.css         # Global styles, CSS variables, custom scrollbar
├── sections/
│   ├── Hero.tsx            # Hero with Hyperspeed background & navigation
│   ├── About.tsx           # Tech stack with LogoLoop carousel
│   ├── Experience.tsx      # Work experience timeline
│   ├── Projects.tsx        # Project showcase cards
│   └── Contact.tsx         # Social links & resume download
└── components/
    ├── CustomScrollbar.tsx  # Lenis-integrated custom scrollbar
    ├── ElectricBorder.tsx   # Animated electric border effect
    ├── LogoLoop.tsx         # Infinite scrolling logo carousel
    ├── SmoothScroll.tsx     # Lenis smooth scroll wrapper
    ├── ProjectCard.tsx      # Project card component
    ├── SoccerBallScene.tsx  # 3D soccer ball scene
    └── Particles.tsx        # Particle effect component
```

## Customization

### Personal Details & Branding

1. **Name & Title**: Update your name and title in `src/sections/Hero.tsx` and metadata in `src/app/layout.tsx` and `src/app/page.tsx`.
2. **Projects**: Edit `src/data/portfolio.ts` with your own project names, descriptions, and links.
3. **Experience**: Edit `src/data/experience.ts` with your work history.
4. **Social Links & Email**: Edit `EMAIL` and `socials` in `src/sections/Contact.tsx`.
5. **Resume**: Place your resume PDF in `public/resume.pdf` (or customize the filename in `src/sections/Contact.tsx`).

### Changing Colors

The site uses a dark orchid gradient theme defined in `src/app/page.tsx`:

```tsx
background: "radial-gradient(125% 125% at 50% 10%, #000000 40%, #350136 100%)"
```

Modify these values to change the overall color scheme. Button glow colors are set via `ElectricBorder`'s `color` prop.

## Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repository directly to [Vercel](https://vercel.com) for automated continuous deployments.

## License & Attribution

This project is open-source under the [MIT License](LICENSE).

- **Original Base Architecture**: Created by [Anirban Banerjee](https://github.com/DevAniiii) ([@DevAniiii](https://github.com/DevAniiii)).
- **Customization & Maintenance**: [Prema Sai Kuruva](https://github.com/prem-000)
