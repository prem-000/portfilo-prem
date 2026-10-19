"use client";

import { Suspense, useRef, useMemo, useCallback, useEffect, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { generateSoccerBallFaces } from "./SoccerBallGeometry";
import SoccerFaceMesh from "./SoccerFaceMesh";
import Particles from "./Particles";
import ProjectCard from "./ProjectCard";
import { portfolioItems } from "@/data/portfolio";

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

function InnerGlow({ mobile }: { mobile: boolean }) {
  const ref = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const hue = (t * 0.1) % 1;
    ref.current.color.setHSL(hue, 1, 0.55);
    ref.current.intensity = mobile
      ? 2.5 + Math.sin(t * 1.2) * 0.5
      : 3.5 + Math.sin(t * 1.2) * 1.0;
  });

  return (
    <pointLight
      ref={ref}
      position={[0, 0, 0]}
      distance={mobile ? 4 : 5}
      decay={1.2}
    />
  );
}

interface BallVelocity {
  x: number;
  y: number;
  dragging: boolean;
}

function SoccerBall({
  selectedIndex,
  onSelect,
  velocity,
  mobile,
}: {
  selectedIndex: number | null;
  onSelect: (index: number | null) => void;
  velocity: React.MutableRefObject<BallVelocity>;
  mobile: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const faces = useMemo(() => generateSoccerBallFaces(1.8), []);

  const handleSelect = useCallback(
    (index: number) => {
      onSelect(selectedIndex === index ? null : index);
    },
    [selectedIndex, onSelect]
  );

  useFrame(() => {
    if (!groupRef.current || selectedIndex !== null) return;

    const v = velocity.current;
    const friction = v.dragging ? 0.85 : 0.97;
    v.x *= friction;
    v.y *= friction;

    const maxSpeed = 0.015;
    const speed = Math.sqrt(v.x * v.x + v.y * v.y);
    if (speed > maxSpeed) {
      v.x = (v.x / speed) * maxSpeed;
      v.y = (v.y / speed) * maxSpeed;
    }

    const minSpeed = 0.0015;
    if (!v.dragging && speed < minSpeed) {
      v.y = minSpeed * (v.y >= 0 ? 1 : -1);
    }

    groupRef.current.rotation.x += v.x;
    groupRef.current.rotation.y += v.y;
  });

  return (
    <group ref={groupRef}>
      <InnerGlow mobile={mobile} />
      {faces.map((face) => (
        <SoccerFaceMesh
          key={face.index}
          face={face}
          isSelected={selectedIndex === face.index}
          onSelect={handleSelect}
          selectedIndex={selectedIndex}
          mobile={mobile}
        />
      ))}
    </group>
  );
}

function CameraRig({ selectedIndex }: { selectedIndex: number | null }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 5.5));

  useFrame(() => {
    target.current.set(0, 0, selectedIndex !== null ? 5 : 5.5);
    camera.position.lerp(target.current, 0.04);
  });

  return null;
}

function SceneContent({
  selectedIndex,
  setSelectedIndex,
  velocity,
  mobile,
}: {
  selectedIndex: number | null;
  setSelectedIndex: (i: number | null) => void;
  velocity: React.MutableRefObject<BallVelocity>;
  mobile: boolean;
}) {
  return (
    <>
      <fog attach="fog" args={["#350136", 12, 25]} />
      <ambientLight intensity={mobile ? 0.3 : 0.35} />
      <directionalLight position={[5, 8, 5]} intensity={0.7} color="#ffffff" />
      {!mobile && (
        <>
          <directionalLight position={[-3, -2, 4]} intensity={0.2} color="#c4b5fd" />
          <pointLight position={[0, 5, 3]} intensity={0.3} color="#22d3ee" distance={12} />
          <pointLight position={[0, -5, 3]} intensity={0.15} color="#8b5cf6" distance={10} />
        </>
      )}
      <Suspense fallback={null}>
        <SoccerBall
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
          velocity={velocity}
          mobile={mobile}
        />
      </Suspense>
      <Particles count={mobile ? 30 : 120} />
      <CameraRig selectedIndex={selectedIndex} />
    </>
  );
}

import { PortfolioItem } from "@/data/types";

interface SoccerBallSceneProps {
  onViewProject?: (item: PortfolioItem) => void;
  onSelectProject?: (item: PortfolioItem | null) => void;
}

export default function SoccerBallScene({
  onViewProject,
  onSelectProject,
}: SoccerBallSceneProps = {}) {
  const mobile = useIsMobile();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const velocity = useRef<BallVelocity>({ x: 0, y: 0.003, dragging: false });
  const lastPointer = useRef({ x: 0, y: 0 });

  const selectedItem = useMemo(() => {
    if (selectedIndex === null) return null;
    return portfolioItems[selectedIndex % portfolioItems.length];
  }, [selectedIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedIndex(null);
        onSelectProject?.(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onSelectProject]);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    velocity.current.dragging = true;
    lastPointer.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!velocity.current.dragging) return;
    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;
    lastPointer.current = { x: e.clientX, y: e.clientY };

    velocity.current.y += dx * 0.00025;
    velocity.current.x += dy * 0.00025;
  }, []);

  const onPointerUp = useCallback(() => {
    velocity.current.dragging = false;
  }, []);

  return (
    <div className="relative w-full">
      <div
        className={`flex ${mobile
          ? "flex-col items-center"
          : "flex-row items-center min-h-[560px] lg:h-[75vh]"
          }`}
      >
        {/* Ball */}
        <div
          className={mobile ? "relative w-full h-[50vh]" : "relative h-full w-[55%] shrink-0"}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          style={{ touchAction: "none" }}
        >
          <Canvas
            camera={{ position: [0, 0, 5.5], fov: 45 }}
            gl={{
              antialias: !mobile,
              alpha: true,
              powerPreference: mobile ? "low-power" : "high-performance",
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.0,
            }}
            style={{ background: "transparent" }}
            dpr={mobile ? [1, 1] : [1, 2]}
            frameloop="always"
          >
            <SceneContent
              selectedIndex={selectedIndex}
              setSelectedIndex={(idx) => {
                setSelectedIndex(idx);
                if (idx !== null) {
                  onSelectProject?.(portfolioItems[idx % portfolioItems.length]);
                } else {
                  onSelectProject?.(null);
                }
              }}
              velocity={velocity}
              mobile={mobile}
            />
          </Canvas>
        </div>

        {/* Card */}
        <div
          className={
            mobile
              ? "w-full px-5 py-4 flex items-start justify-center"
              : "w-[45%] h-full flex items-center px-6"
          }
        >
          <ProjectCard
            item={selectedItem}
            onClose={() => {
              setSelectedIndex(null);
              onSelectProject?.(null);
            }}
            onViewProject={onViewProject}
            onSelectProject={(p) => {
              const idx = portfolioItems.findIndex((it) => it.id === p.id);
              if (idx !== -1) setSelectedIndex(idx);
              onSelectProject?.(p);
            }}
          />
        </div>
      </div>
    </div>
  );
}
