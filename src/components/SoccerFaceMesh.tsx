"use client";

import { useRef, useMemo, useState, useCallback } from "react";
import * as THREE from "three";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import {
  createFaceGeometry,
  createEdgeGeometry,
  SoccerFace,
} from "./SoccerBallGeometry";
import { portfolioItems } from "@/data/portfolio";

interface SoccerFaceMeshProps {
  face: SoccerFace;
  isSelected: boolean;
  onSelect: (index: number) => void;
  selectedIndex: number | null;
  mobile?: boolean;
}

function hslToTarget(target: THREE.Color, h: number, s: number, l: number) {
  target.setHSL(h, s, l);
}

const INSET = 0.995;

export default function SoccerFaceMesh({
  face,
  isSelected,
  onSelect,
  selectedIndex,
  mobile = false,
}: SoccerFaceMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const edgeRef = useRef<THREE.LineSegments>(null);
  const [hovered, setHovered] = useState(false);

  const subdivisions = mobile ? 3 : 4;
  const geometry = useMemo(() => createFaceGeometry(face, INSET, subdivisions), [face, subdivisions]);
  const edgeGeometry = useMemo(() => createEdgeGeometry(face, INSET), [face]);

  const projectImage =
    portfolioItems[face.index % portfolioItems.length].image;
  const texture = useTexture(projectImage);
  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
  }, [texture]);

  const normal = useMemo(() => new THREE.Vector3(...face.normal), [face]);
  const currentOffset = useRef(new THREE.Vector3(0, 0, 0));
  const targetOffset = useRef(new THREE.Vector3(0, 0, 0));
  const targetColor = useRef(new THREE.Color());
  const targetEdgeColor = useRef(new THREE.Color());

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const t = 1 - Math.pow(0.0005, delta);
    const time = state.clock.elapsedTime;

    const expandDist = isSelected ? 0.7 : 0;
    targetOffset.current.copy(normal).multiplyScalar(expandDist);
    currentOffset.current.lerp(targetOffset.current, t);

    const targetScale = isSelected ? 1.08 : hovered ? 1.03 : 1;
    const s = meshRef.current.scale.x;
    const newScale = s + (targetScale - s) * t;
    meshRef.current.scale.setScalar(newScale);
    meshRef.current.position.copy(currentOffset.current);

    const dimmed = selectedIndex !== null && !isSelected;
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;

    // The face is textured with a project image, so we modulate brightness and
    // self-illumination (emissiveMap) rather than tinting the cell a flat color.
    let targetBright: number;
    let targetEmissive: number;

    if (isSelected) {
      targetBright = 1;
      targetEmissive = 0.85;
    } else if (dimmed) {
      targetBright = 0.32;
      targetEmissive = 0.12;
    } else if (hovered && !mobile) {
      targetBright = 1;
      targetEmissive = 0.7;
    } else {
      targetBright = 0.9;
      targetEmissive = 0.45 + Math.sin(time * 0.8 + face.index * 0.4) * 0.06;
    }

    targetColor.current.setScalar(targetBright);
    mat.color.lerp(targetColor.current, t);
    mat.emissiveIntensity += (targetEmissive - mat.emissiveIntensity) * t;

    if (edgeRef.current) {
      edgeRef.current.position.copy(currentOffset.current);
      edgeRef.current.scale.setScalar(newScale);
      const eMat = edgeRef.current.material as THREE.LineBasicMaterial;

      const edgeHue = ((time * 0.12) + face.index * 0.1) % 1;

      if (isSelected) {
        hslToTarget(targetEdgeColor.current, edgeHue, 1, 0.65);
        eMat.color.lerp(targetEdgeColor.current, t);
        eMat.opacity += (1 - eMat.opacity) * t;
      } else if (hovered && !mobile) {
        hslToTarget(targetEdgeColor.current, edgeHue, 1, 0.6);
        eMat.color.lerp(targetEdgeColor.current, t);
        eMat.opacity += (0.95 - eMat.opacity) * t;
      } else {
        const pulse = 0.55 + Math.sin(time * 2 + face.index * 0.5) * 0.15;
        hslToTarget(targetEdgeColor.current, edgeHue, 0.9, pulse);
        eMat.color.lerp(targetEdgeColor.current, t);
        eMat.opacity += (0.8 - eMat.opacity) * t;
      }
    }
  });

  const handlePointerOver = useCallback((e: ThreeEvent<PointerEvent>) => {
    if (mobile) return;
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = "pointer";
  }, [mobile]);

  const handlePointerOut = useCallback(() => {
    if (mobile) return;
    setHovered(false);
    document.body.style.cursor = "auto";
  }, [mobile]);

  const handleClick = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      onSelect(face.index);
    },
    [face.index, onSelect]
  );

  return (
    <group>
      <mesh
        ref={meshRef}
        geometry={geometry}
        onPointerOver={mobile ? undefined : handlePointerOver}
        onPointerOut={mobile ? undefined : handlePointerOut}
        onClick={handleClick}
        renderOrder={isSelected ? 10 : 0}
      >
        <meshStandardMaterial
          map={texture}
          emissiveMap={texture}
          emissive="#ffffff"
          emissiveIntensity={0.45}
          color="#ffffff"
          metalness={0}
          roughness={0.85}
          side={THREE.DoubleSide}
        />
      </mesh>

      <lineSegments ref={edgeRef} geometry={edgeGeometry} renderOrder={isSelected ? 11 : 1}>
        <lineBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.8}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}
