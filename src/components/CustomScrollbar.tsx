"use client";

import { useCallback, useEffect, useRef } from "react";
import { useLenis } from "lenis/react";

const THUMB_HEIGHT = 60;
const TRACK_PADDING = 16;
const HIDE_DELAY = 1500;

export function CustomScrollbar() {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lenisRef = useRef<ReturnType<typeof useLenis>>(undefined);

  // Interaction state kept in refs so scroll updates never trigger React re-renders.
  const isDragging = useRef(false);
  const isHovered = useRef(false);
  const progress = useRef(0);

  const show = useCallback(() => {
    const track = trackRef.current;
    if (track) track.style.opacity = "1";
  }, []);

  const scheduleHide = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (!isDragging.current && !isHovered.current && trackRef.current) {
        trackRef.current.style.opacity = "0";
      }
    }, HIDE_DELAY);
  }, []);

  const positionThumb = useCallback(() => {
    const thumb = thumbRef.current;
    if (!thumb) return;
    const travel = window.innerHeight - (THUMB_HEIGHT + TRACK_PADDING * 2);
    thumb.style.top = `${TRACK_PADDING + progress.current * travel}px`;
  }, []);

  // Stable callback (empty deps) so Lenis subscribes once; updates run via refs/DOM only.
  const lenis = useLenis(
    (scrollData) => {
      progress.current = scrollData.progress;
      positionThumb();
      show();
      scheduleHide();
    },
    []
  );

  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  const scrollTo = useCallback((clientY: number) => {
    const track = trackRef.current;
    if (!track || !lenisRef.current) return;
    const rect = track.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
    const target =
      ratio * (document.documentElement.scrollHeight - window.innerHeight);
    lenisRef.current.scrollTo(target, { immediate: true });
  }, []);

  const handleTrackClick = useCallback(
    (e: React.MouseEvent) => {
      scrollTo(e.clientY);
    },
    [scrollTo]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      isDragging.current = true;
      show();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [show]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      scrollTo(e.clientY);
    },
    [scrollTo]
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
    scheduleHide();
  }, [scheduleHide]);

  // Keep the thumb aligned on resize without re-rendering.
  useEffect(() => {
    positionThumb();
    window.addEventListener("resize", positionThumb);
    return () => {
      window.removeEventListener("resize", positionThumb);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [positionThumb]);

  return (
    <div
      ref={trackRef}
      className="fixed right-1 top-0 bottom-0 z-[9999] flex items-center justify-center transition-opacity duration-500"
      style={{ width: 14, opacity: 0, cursor: "pointer" }}
      onClick={handleTrackClick}
      onMouseEnter={() => {
        isHovered.current = true;
        show();
      }}
      onMouseLeave={() => {
        isHovered.current = false;
        scheduleHide();
      }}
    >
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width: 3,
          top: TRACK_PADDING,
          bottom: TRACK_PADDING,
          background: "rgba(53, 1, 54, 0.3)",
        }}
      />

      <div
        ref={thumbRef}
        className="absolute left-1/2 -translate-x-1/2 rounded-full transition-[width,box-shadow] duration-200"
        style={{
          width: 4,
          height: THUMB_HEIGHT,
          top: TRACK_PADDING,
          background: "linear-gradient(180deg, #7b2d8e, #350136)",
          boxShadow: "0 0 6px rgba(123, 45, 142, 0.3)",
          cursor: "grab",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerEnter={(e) => {
          const el = e.currentTarget;
          el.style.width = "6px";
          el.style.boxShadow =
            "0 0 12px rgba(123, 45, 142, 0.6), 0 0 4px rgba(123, 45, 142, 0.3)";
        }}
        onPointerLeave={(e) => {
          if (isDragging.current) return;
          const el = e.currentTarget;
          el.style.width = "4px";
          el.style.boxShadow = "0 0 6px rgba(123, 45, 142, 0.3)";
        }}
      />
    </div>
  );
}
