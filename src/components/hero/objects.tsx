"use client";

import { useMemo } from "react";
import {
  CanvasTexture,
  Color,
  CylinderGeometry,
  IcosahedronGeometry,
  MeshPhysicalMaterial,
  Vector3,
  type Material,
} from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import type { ThemeColors } from "./config";

/** "high" = desktop (glass transmission, more segments); "low" = mobile. */
export type Quality = "high" | "low";

// ─── Coin ────────────────────────────────────────────────────────────────────

const COIN = { thickness: 0.14, rimRadius: 0.9, rimTube: 0.045 };

/** Grey-scale stamp (raised = white) used as the coin face bump map: rings + "A" monogram. */
function makeCoinStamp(): CanvasTexture {
  const size = 512;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#7a7a7a";
  ctx.fillRect(0, 0, size, size);
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.39, 0, Math.PI * 2);
  ctx.stroke();
  // Dotted inner ring
  ctx.fillStyle = "#e6e6e6";
  for (let i = 0; i < 48; i++) {
    const a = (i / 48) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(size / 2 + Math.cos(a) * size * 0.335, size / 2 + Math.sin(a) * size * 0.335, 4, 0, Math.PI * 2);
    ctx.fill();
  }
  const mono = getComputedStyle(document.documentElement).getPropertyValue("--font-jetbrains-mono").trim();
  ctx.fillStyle = "#ffffff";
  ctx.font = `700 ${size * 0.42}px ${mono || "monospace"}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("A", size / 2, size / 2 + size * 0.02);
  const tex = new CanvasTexture(c);
  tex.anisotropy = 4;
  return tex;
}

export function useCoinParts(colors: ThemeColors, quality: Quality) {
  return useMemo(() => {
    const segments = quality === "high" ? 72 : 40;
    const geometry = new CylinderGeometry(1, 1, COIN.thickness, segments, 1);
    geometry.rotateX(Math.PI / 2); // faces point at the camera by default
    const gold = new Color(colors.gold).multiplyScalar(0.92);
    const stamp = makeCoinStamp();
    const face = new MeshPhysicalMaterial({
      color: gold,
      metalness: 1,
      roughness: 0.26,
      bumpMap: stamp,
      bumpScale: 4,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2,
    });
    const edge = new MeshPhysicalMaterial({ color: gold, metalness: 1, roughness: 0.34 });
    // CylinderGeometry groups: 0 = side, 1 = top cap, 2 = bottom cap
    const materials: Material[] = [edge, face, face];
    return { geometry, materials, rimMaterial: edge, segments };
  }, [colors, quality]);
}

export function Coin({ parts }: { parts: ReturnType<typeof useCoinParts> }) {
  const z = COIN.thickness / 2;
  return (
    <group>
      <mesh geometry={parts.geometry} material={parts.materials} />
      {[z, -z].map((rz) => (
        <mesh key={rz} position={[0, 0, rz]} material={parts.rimMaterial}>
          <torusGeometry args={[COIN.rimRadius, COIN.rimTube, 12, parts.segments]} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Glass sphere ────────────────────────────────────────────────────────────

export function useGlassMaterial(tint: string, quality: Quality) {
  return useMemo(() => {
    const color = new Color(tint);
    if (quality === "high") {
      return new MeshPhysicalMaterial({
        color: color.clone().lerp(new Color("white"), 0.55),
        transmission: 1,
        thickness: 1.4,
        roughness: 0.06,
        ior: 1.45,
        attenuationColor: color,
        attenuationDistance: 1.6,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        iridescence: 0.25,
        envMapIntensity: 1.2,
      });
    }
    // Mobile: no transmission pass — a glossy tinted shell reads as glass at small sizes.
    return new MeshPhysicalMaterial({
      color,
      metalness: 0.15,
      roughness: 0.08,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      transparent: true,
      opacity: 0.88,
      envMapIntensity: 1.4,
    });
  }, [tint, quality]);
}

export function GlassOrb({ material, quality }: { material: Material; quality: Quality }) {
  const seg = quality === "high" ? 64 : 32;
  return (
    <mesh material={material}>
      <sphereGeometry args={[1, seg, seg]} />
    </mesh>
  );
}

// ─── Anchor stone ────────────────────────────────────────────────────────────

/** A smooth river pebble, gently irregular, with a gold anchor inlaid on its face. */
export function useAnchorStoneParts(colors: ThemeColors, quality: Quality) {
  return useMemo(() => {
    // Icosahedron faces are unindexed; merge so normals are smoothed across faces (no faceting).
    const geometry = mergeVertices(new IcosahedronGeometry(1, quality === "high" ? 6 : 4));
    const p = geometry.attributes.position;
    const v = new Vector3();
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i);
      const wobble = 1 + 0.045 * Math.sin(v.x * 3.1 + v.y * 2.3) * Math.cos(v.z * 2.7);
      v.multiplyScalar(wobble);
      p.setXYZ(i, v.x * 1.28, v.y * 0.86, v.z * 0.62);
    }
    geometry.computeVertexNormals();

    const stone = new MeshPhysicalMaterial({
      color: new Color(colors.navy).multiplyScalar(0.5),
      roughness: 0.38,
      metalness: 0.1,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      sheen: 0.25,
      sheenColor: new Color(colors.lavender),
      sheenRoughness: 0.5,
    });
    const gold = new MeshPhysicalMaterial({
      color: new Color(colors.gold).multiplyScalar(0.92),
      metalness: 1,
      roughness: 0.22,
    });
    return { geometry, stone, gold };
  }, [colors, quality]);
}

export function AnchorStone({ parts }: { parts: ReturnType<typeof useAnchorStoneParts> }) {
  const g = parts.gold;
  return (
    <group>
      <mesh geometry={parts.geometry} material={parts.stone} />
      {/* Anchor emblem, sitting proud of the stone's front face */}
      <group position={[0, 0.04, 0.64]} scale={0.66}>
        <mesh position={[0, 0.42, 0]} material={g}>
          <torusGeometry args={[0.1, 0.032, 12, 32]} />
        </mesh>
        <mesh position={[0, 0.02, 0]} material={g}>
          <cylinderGeometry args={[0.036, 0.036, 0.66, 16]} />
        </mesh>
        <mesh position={[0, 0.24, 0]} material={g}>
          <boxGeometry args={[0.38, 0.055, 0.06]} />
        </mesh>
        {/* Curved arms (lower half-circle) */}
        <mesh position={[0, -0.03, 0]} rotation={[0, 0, Math.PI]} material={g}>
          <torusGeometry args={[0.3, 0.036, 12, 40, Math.PI]} />
        </mesh>
        {/* Flukes */}
        {[-1, 1].map((s) => (
          <mesh key={s} position={[0.3 * s, 0.03, 0]} rotation={[0, 0, -0.35 * s]} material={g}>
            <coneGeometry args={[0.07, 0.15, 12]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
