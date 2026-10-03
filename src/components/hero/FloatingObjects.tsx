"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";
import { HERO_SPEED, OBJECTS, type ThemeColors } from "./config";
import { heroSignals } from "./signals";
import {
  AnchorStone,
  Coin,
  GlassOrb,
  useAnchorStoneParts,
  useCoinParts,
  useGlassMaterial,
  type Quality,
} from "./objects";

type Kind = "coin" | "glassNavy" | "glassLavender" | "anchorStone";

export type ObjectSpec = {
  kind: Kind;
  /** Scene position; the camera sits at z=10 looking at the origin. */
  position: [number, number, number];
  scale: number;
  /** Resting tilt. */
  rotation: [number, number, number];
  /** Parallax / scroll multiplier — nearer objects move more. */
  depth: number;
};

// ─── Layouts (tweak positions here) ──────────────────────────────────────────
// Objects frame the centred copy: kept to the sides on desktop, above/below on mobile.

export const LAYOUT_DESKTOP: ObjectSpec[] = [
  { kind: "coin", position: [-4.15, 1.45, 0], scale: 0.72, rotation: [0.35, 0.6, 0.15], depth: 1 },
  { kind: "glassLavender", position: [4.7, 1.85, -1], scale: 0.62, rotation: [0, 0, 0], depth: 0.8 },
  { kind: "anchorStone", position: [4.1, -1.35, 0.2], scale: 0.72, rotation: [0.15, -0.55, -0.12], depth: 1.2 },
  { kind: "coin", position: [-3.0, -1.9, 1.2], scale: 0.34, rotation: [-0.5, -0.4, 0.4], depth: 1.4 },
  { kind: "glassNavy", position: [3.1, 2.95, -2.2], scale: 0.32, rotation: [0, 0, 0], depth: 0.5 },
  { kind: "coin", position: [-6.2, -0.4, -3.2], scale: 0.48, rotation: [0.9, 0.2, -0.3], depth: 0.35 },
];

/** Large foreground objects, rendered in a separate softly blurred layer (depth of field). */
export const LAYOUT_NEAR: ObjectSpec[] = [
  { kind: "glassNavy", position: [-5.4, -2.5, 3.2], scale: 1.15, rotation: [0, 0, 0], depth: 2.2 },
  { kind: "coin", position: [5.6, -2.7, 2.8], scale: 0.95, rotation: [0.7, -0.5, 0.3], depth: 2 },
];

export const LAYOUT_MOBILE: ObjectSpec[] = [
  { kind: "coin", position: [-1.05, 3.05, 0], scale: 0.5, rotation: [0.35, 0.6, 0.15], depth: 1 },
  { kind: "glassLavender", position: [1.25, 2.6, -1], scale: 0.42, rotation: [0, 0, 0], depth: 0.8 },
  { kind: "anchorStone", position: [0.75, -3.1, 0.4], scale: 0.62, rotation: [0.2, -0.55, -0.12], depth: 1.2 },
];

type Props = {
  specs: ObjectSpec[];
  colors: ThemeColors;
  quality: Quality;
  /** false = static frame (reduced motion): fully visible, no movement. */
  animate: boolean;
  /** Seconds before the first object springs in. */
  startDelay?: number;
};

export function FloatingObjects({ specs, colors, quality, animate, startDelay = 0.35 }: Props) {
  const coin = useCoinParts(colors, quality);
  const stone = useAnchorStoneParts(colors, quality);
  const glassNavy = useGlassMaterial(colors.navyBright, quality);
  const glassLavender = useGlassMaterial(colors.lavender, quality);

  const groups = useRef<(Group | null)[]>([]);
  const state = useRef(specs.map(() => ({ scale: animate ? 0 : 1, velocity: 0, spin: 0 })));
  const pointer = useRef({ x: 0, y: 0 });
  const time = useRef(0);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    time.current += delta * HERO_SPEED;
    const t = time.current;

    // Smoothed pointer (or a slow figure-eight drift on touch devices).
    const targetX = heroSignals.autoDrift ? Math.sin(t * 0.21) * 0.6 : heroSignals.pointerX;
    const targetY = heroSignals.autoDrift ? Math.sin(t * 0.34) * 0.35 : heroSignals.pointerY;
    const ease = 1 - Math.exp(-delta * 3);
    pointer.current.x += (targetX - pointer.current.x) * ease;
    pointer.current.y += (targetY - pointer.current.y) * ease;

    specs.forEach((spec, i) => {
      const g = groups.current[i];
      if (!g) return;
      const s = state.current[i];

      if (!animate) {
        g.position.set(...spec.position);
        g.scale.setScalar(spec.scale);
        g.rotation.set(...spec.rotation);
        return;
      }

      // Entrance: under-damped spring from 0 → 1, staggered.
      if (t > startDelay + i * OBJECTS.stagger) {
        const accel = (1 - s.scale) * OBJECTS.springStiffness - s.velocity * OBJECTS.springDamping;
        s.velocity += accel * delta;
        s.scale += s.velocity * delta;
      }

      const phase = i * 1.7;
      const bob = Math.sin(t * OBJECTS.bobSpeed + phase) * OBJECTS.bobAmplitude;
      const px = -pointer.current.x * OBJECTS.parallax * spec.depth;
      const py = pointer.current.y * OBJECTS.parallax * spec.depth * 0.6;
      const scrollY = heroSignals.scroll * OBJECTS.scrollDrift * spec.depth;

      g.position.set(spec.position[0] + px, spec.position[1] + bob + py + scrollY, spec.position[2]);
      g.scale.setScalar(spec.scale * Math.max(0, s.scale));

      s.spin += delta * OBJECTS.spinSpeed * (i % 2 ? -1 : 1) * HERO_SPEED;
      const wobbleX = Math.sin(t * 0.3 + phase) * 0.18 + pointer.current.y * 0.15;
      if (spec.kind === "coin") {
        // Coins turn within their face plane and only tilt gently, so the stamped face stays visible.
        g.rotation.set(
          spec.rotation[0] + wobbleX,
          spec.rotation[1] + Math.sin(t * 0.4 + phase) * 0.45 + pointer.current.x * 0.25,
          spec.rotation[2] + s.spin,
        );
      } else {
        g.rotation.set(
          spec.rotation[0] + wobbleX,
          spec.rotation[1] + (spec.kind === "anchorStone" ? Math.sin(t * 0.35 + phase) * 0.5 : s.spin) + pointer.current.x * 0.25,
          spec.rotation[2] + Math.cos(t * 0.25 + phase) * 0.08,
        );
      }
    });
  });

  return (
    <>
      {specs.map((spec, i) => (
        <group
          key={i}
          ref={(el) => {
            groups.current[i] = el;
          }}
          position={spec.position}
          scale={animate ? 0 : spec.scale}
          rotation={spec.rotation}
        >
          {spec.kind === "coin" && <Coin parts={coin} />}
          {spec.kind === "anchorStone" && <AnchorStone parts={stone} />}
          {spec.kind === "glassNavy" && <GlassOrb material={glassNavy} quality={quality} />}
          {spec.kind === "glassLavender" && <GlassOrb material={glassLavender} quality={quality} />}
        </group>
      ))}
    </>
  );
}
