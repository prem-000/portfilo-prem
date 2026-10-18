"use client"
import React, { ReactNode } from 'react';


export type LogoItem =
  | { node: ReactNode; title?: string; href?: string }
  | { src: string; alt?: string; href?: string; title?: string };

export interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right';
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  ariaLabel?: string;
  className?: string;
}

function LogoItem({ item, height }: { item: LogoItem; height: number }) {
  const isNode = 'node' in item;

  const content = isNode ? (
    <span className="inline-flex items-center" style={{ fontSize: height }}>
      {item.node}
    </span>
  ) : (
    <img
      src={item.src}
      alt={(item as any).alt ?? ''}
      title={item.title}
      style={{ height }}
      className="w-auto object-contain pointer-events-none select-none"
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );

  if (item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={item.title ?? 'logo link'}
        className="inline-flex items-center no-underline hover:opacity-80 transition-opacity"
      >
        {content}
      </a>
    );
  }

  return content;
}

export const LogoLoop: React.FC<LogoLoopProps> = ({
  logos,
  speed = 30,
  direction = 'left',
  logoHeight = 28,
  gap = 32,
  pauseOnHover = false,
  fadeOut = false,
  fadeOutColor = '#000000',
  ariaLabel = 'Logo marquee',
  className,
}) => {
  const duration = `${Math.max(5, 100 / Math.max(1, speed) * logos.length * 3)}s`;
  const animDirection = direction === 'right' ? 'reverse' : 'normal';

  const row = logos.map((item, i) => (
    <li key={i} className="flex-shrink-0 flex items-center" style={{ marginRight: gap }}>
      <LogoItem item={item} height={logoHeight} />
    </li>
  ));

  return (
    <div
      className={`relative overflow-hidden ${className ?? ''}`}
      role="region"
      aria-label={ariaLabel}
    >
      {fadeOut && (
        <>
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[clamp(24px,10%,120px)]"
            style={{ background: `linear-gradient(to right, ${fadeOutColor}, transparent)` }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[clamp(24px,10%,120px)]"
            style={{ background: `linear-gradient(to left, ${fadeOutColor}, transparent)` }}
          />
        </>
      )}

      <div
        className="flex w-max"
        style={{
          animation: `logoloop-scroll ${duration} linear infinite ${animDirection}`,
          ...(pauseOnHover ? {} : {}),
        }}
        onMouseEnter={pauseOnHover ? (e) => { e.currentTarget.style.animationPlayState = 'paused'; } : undefined}
        onMouseLeave={pauseOnHover ? (e) => { e.currentTarget.style.animationPlayState = 'running'; } : undefined}
      >
        <ul className="flex items-center shrink-0" aria-hidden={false}>{row}</ul>
        <ul className="flex items-center shrink-0" aria-hidden>{row}</ul>
        <ul className="flex items-center shrink-0" aria-hidden>{row}</ul>
      </div>

    </div>
  );
};

LogoLoop.displayName = 'LogoLoop';

export default LogoLoop;
