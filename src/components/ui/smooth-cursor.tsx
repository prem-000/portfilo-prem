"use client";

import React, { useEffect, useRef, useState } from "react";

export interface SmoothCursorProps {
  imageSrc?: string;
  size?: number; // Approximate height in pixels (desktop 40-55px)
  followingDistance?: number;
}

type AnimationState = "idle" | "walk" | "run" | "turn";

const DESKTOP_POINTER_QUERY = "(any-hover: hover) and (any-pointer: fine)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function SmoothCursor({
  imageSrc = "/images/ai-robot.png",
  size = 48,
  followingDistance = 46,
}: SmoothCursorProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // References for continuous physics and animation loop without React state thrashing
  const containerRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  // Locomotion & Physics states
  const robotPos = useRef({ x: 250, y: 80 }); // Initial natural position near top
  const targetPos = useRef({ x: 250, y: 80 });
  const mousePos = useRef({ x: -500, y: -500 });
  const hasTargetRef = useRef(false);
  const currentSpeed = useRef(0);
  const stepPhase = useRef(0);

  // Facing and directional turning
  const facingDirection = useRef<1 | -1>(1); // 1 = right, -1 = left
  const currentFacingScale = useRef(1); // smoothly interpolated for realistic turning

  // Animation state tracking
  const animState = useRef<AnimationState>("idle");
  const isReducedMotion = useRef(false);

  useEffect(() => {
    setIsMounted(true);

    // Initial position near top right / header area of viewport
    const startX =
      typeof window !== "undefined"
        ? Math.min(window.innerWidth - 120, Math.max(100, window.innerWidth * 0.72))
        : 250;
    const startY = 75;

    robotPos.current = { x: startX, y: startY };
    targetPos.current = { x: startX, y: startY };

    const pointerMedia = window.matchMedia(DESKTOP_POINTER_QUERY);
    const motionMedia = window.matchMedia(REDUCED_MOTION_QUERY);

    const updateCapabilities = () => {
      const finePointer = pointerMedia.matches;
      setIsEnabled(finePointer);
      isReducedMotion.current = motionMedia.matches;
    };

    updateCapabilities();
    pointerMedia.addEventListener("change", updateCapabilities);
    motionMedia.addEventListener("change", updateCapabilities);

    return () => {
      pointerMedia.removeEventListener("change", updateCapabilities);
      motionMedia.removeEventListener("change", updateCapabilities);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    let animationFrameId: number;

    const onPointerMove = (e: PointerEvent) => {
      // Disallow touch events
      if (e.pointerType === "touch") return;

      mousePos.current = { x: e.clientX, y: e.clientY };
      hasTargetRef.current = true;

      // Determine preferred side: stay slightly to the side the robot is already on,
      // with hysteresis to prevent rapid switching when mouse crosses near the robot.
      const dxFromRobot = e.clientX - robotPos.current.x;
      let side: 1 | -1 = facingDirection.current;

      if (dxFromRobot > 30) {
        side = -1; // Robot is behind (to the left), following from left
      } else if (dxFromRobot < -30) {
        side = 1; // Robot is behind (to the right), following from right
      }

      // Calculate candidate target position offset from the pointer
      let tx = e.clientX + side * followingDistance;
      let ty = e.clientY + 12; // slightly below/beside pointer, never covering the hotspot

      // Clamp within viewport margins
      const margin = 20;
      tx = Math.max(margin, Math.min(window.innerWidth - size - margin, tx));
      ty = Math.max(margin, Math.min(window.innerHeight - size - margin, ty));

      targetPos.current = { x: tx, y: ty };
    };

    const onMouseLeave = () => {
      // When cursor leaves viewport, robot doesn't chase out of screen;
      // it stays put and transitions back to idle
      hasTargetRef.current = false;
      targetPos.current = { ...robotPos.current };
    };

    const onMouseEnter = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      hasTargetRef.current = true;
    };

    // Main animation loop
    const animate = (time: number) => {
      const rx = robotPos.current.x;
      const ry = robotPos.current.y;
      const tx = targetPos.current.x;
      const ty = targetPos.current.y;

      const dx = tx - rx;
      const dy = ty - ry;
      const dist = Math.hypot(dx, dy);

      // Facing orientation update
      // Look toward target / cursor direction
      if (hasTargetRef.current && Math.abs(dx) > 10) {
        facingDirection.current = dx > 0 ? 1 : -1;
      }

      // Smoothly interpolate facing scale for a 3D pivoting turn effect
      const targetFacing = facingDirection.current;
      const facingDiff = targetFacing - currentFacingScale.current;
      currentFacingScale.current += facingDiff * 0.18;
      const isTurning = Math.abs(facingDiff) > 0.35;

      // Speed & Locomotion physics
      if (isReducedMotion.current) {
        // Reduced motion: smooth direct linear glide without bounce/tilt
        if (dist > 14) {
          const glideSpeed = dist > 150 ? 8 : 4;
          const move = Math.min(dist, glideSpeed);
          robotPos.current.x += (dx / dist) * move;
          robotPos.current.y += (dy / dist) * move;
          animState.current = "walk";
        } else {
          animState.current = "idle";
        }
      } else {
        // Standard interactive companion physics
        const deadzone = 14;

        if (dist <= deadzone) {
          // Settled in deadzone: decelerate smoothly and idle
          currentSpeed.current = Math.max(0, currentSpeed.current - 0.55);
          if (currentSpeed.current < 0.1) {
            currentSpeed.current = 0;
            animState.current = isTurning ? "turn" : "idle";
          } else {
            animState.current = "walk";
          }
        } else {
          // Target is farther away: accelerate proportionally
          // Walk for shorter distances, run when farther behind
          let desiredSpeed = 0;
          if (dist > 180) {
            // Far behind: accelerate smoothly to running speed (up to 14px/frame)
            desiredSpeed = Math.min(14, 5.5 + dist * 0.04);
            animState.current = "run";
          } else if (dist > 50) {
            // Medium distance: fast walk
            desiredSpeed = 5.0;
            animState.current = isTurning ? "turn" : "walk";
          } else {
            // Close distance: gentle deceleration into position
            desiredSpeed = 3.0;
            animState.current = isTurning ? "turn" : "walk";
          }

          // Smooth acceleration / deceleration
          const accelRate = desiredSpeed > currentSpeed.current ? 0.14 : 0.2;
          currentSpeed.current += (desiredSpeed - currentSpeed.current) * accelRate;

          // Advance position without overshooting
          const moveAmount = Math.min(dist, currentSpeed.current);
          if (dist > 0.001) {
            robotPos.current.x += (dx / dist) * moveAmount;
            robotPos.current.y += (dy / dist) * moveAmount;
          }
        }
      }

      // Procedural animations based on state
      let bounceY = 0;
      let rollDeg = 0;
      let leanDeg = 0;
      let squashX = 1;
      let squashY = 1;
      let shadowScale = 1;
      let shadowOpacity = 0.35;

      const speed = currentSpeed.current;

      if (isReducedMotion.current) {
        bounceY = 0;
        rollDeg = 0;
        leanDeg = 0;
      } else if (animState.current === "run") {
        // RUN STATE:
        // Rapid stride cycle, pronounced aerodynamic forward lean, energetic body bounce
        stepPhase.current += speed * 0.11;
        bounceY = -Math.abs(Math.sin(stepPhase.current)) * 6.5;
        rollDeg = Math.sin(stepPhase.current) * 6.5 * facingDirection.current;
        leanDeg = facingDirection.current * 14; // forward sprint lean
        squashY = 1 + Math.sin(stepPhase.current * 2) * 0.04;
        squashX = 1 - Math.sin(stepPhase.current * 2) * 0.03;
        shadowScale = 0.8 + Math.abs(Math.sin(stepPhase.current)) * 0.3;
        shadowOpacity = 0.22 + (1 - Math.abs(bounceY) / 7) * 0.25;
      } else if (animState.current === "walk") {
        // WALK STATE:
        // Rhythmic alternating biped step bounce, gentle body waddle/roll, slight forward lean
        stepPhase.current += speed * 0.085;
        bounceY = -Math.abs(Math.sin(stepPhase.current)) * 4.0;
        rollDeg = Math.sin(stepPhase.current) * 4.0 * facingDirection.current;
        leanDeg = facingDirection.current * 5.5; // slight walk lean
        squashY = 1 + Math.sin(stepPhase.current * 2) * 0.025;
        squashX = 1 - Math.sin(stepPhase.current * 2) * 0.02;
        shadowScale = 0.9 + Math.abs(Math.sin(stepPhase.current)) * 0.2;
        shadowOpacity = 0.28 + (1 - Math.abs(bounceY) / 4) * 0.18;
      } else if (animState.current === "turn") {
        // TURN STATE:
        // Slightly stretched upward as it pivots on its vertical axis
        squashY = 1.05;
        squashX = 0.95;
        shadowScale = 0.9;
        shadowOpacity = 0.35;
      } else {
        // IDLE STATE:
        // Subtle breathing, gentle vertical bobbing, soft grounded shadow pulse
        const idleCycle = Math.sin(time * 0.003);
        bounceY = idleCycle * 2.2;
        leanDeg = Math.sin(time * 0.0015) * 1.5;
        squashY = 1 + idleCycle * 0.018;
        squashX = 1 - idleCycle * 0.012;
        shadowScale = 1 - idleCycle * 0.12;
        shadowOpacity = 0.32 - idleCycle * 0.08;
      }

      // Apply transforms to DOM
      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${robotPos.current.x}px, ${robotPos.current.y}px, 0)`;
      }

      if (characterRef.current) {
        // Compose 3D facing, lean, bounce, and squash
        const scaleXEffective = currentFacingScale.current * squashX;
        const scaleYEffective = squashY;
        characterRef.current.style.transform = `translate3d(0, ${bounceY}px, 0) scale(${scaleXEffective}, ${scaleYEffective}) rotate(${
          leanDeg + rollDeg
        }deg)`;
      }

      if (shadowRef.current) {
        shadowRef.current.style.transform = `scale(${shadowScale})`;
        shadowRef.current.style.opacity = `${shadowOpacity}`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isEnabled, followingDistance, size]);

  if (!isEnabled || !isMounted) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none select-none z-[9999] will-change-transform flex flex-col items-center"
      style={{
        width: `${size}px`,
        height: `${size + 14}px`,
      }}
    >
      {/* Robot Character Container */}
      <div
        ref={characterRef}
        className="w-full flex justify-center items-center origin-bottom will-change-transform"
        style={{ transformOrigin: "50% 90%" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt="AI Companion"
          style={{ height: `${size}px`, width: "auto" }}
          className="block select-none pointer-events-none drop-shadow-[0_4px_14px_rgba(59,130,246,0.35)]"
          draggable={false}
        />
      </div>

      {/* Dynamic Ground Shadow */}
      <div
        ref={shadowRef}
        aria-hidden="true"
        className="will-change-transform pointer-events-none"
        style={{
          width: `${Math.round(size * 0.62)}px`,
          height: "6px",
          marginTop: "2px",
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 72%)",
          borderRadius: "50%",
        }}
      />
    </div>
  );
}

// Named aliases for convenience and backwards compatibility
export const AiCompanionCursor = SmoothCursor;
export default SmoothCursor;
