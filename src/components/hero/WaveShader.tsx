"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { AdditiveBlending, Color, ShaderMaterial, type Mesh } from "three";
import { HERO_SPEED, WAVES, type ThemeColors } from "./config";
import { heroSignals } from "./signals";

/** Hard upper bound for the shader loop (GLSL needs a constant). */
const MAX_LINES = 40;

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    // Screen-space quad: ignores the camera, always covers the viewport, drawn behind everything.
    gl_Position = vec4(position.xy, 0.9999, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uLines;
  uniform float uIntensity;
  uniform float uCenter;
  uniform float uSpread;
  uniform float uAspect;
  uniform float uFade;
  uniform vec3 uColDeep;
  uniform vec3 uColLight;
  uniform vec3 uColHot;

  void main() {
    float x = vUv.x * uAspect;
    // Ribbon lives in the lower part of the hero: skip the work above it.
    if (vUv.y > uCenter + uSpread + 0.3) { gl_FragColor = vec4(0.0); return; }

    vec3 col = vec3(0.0);
    for (int i = 0; i < ${MAX_LINES}; i++) {
      if (float(i) >= uLines) break;
      float t = float(i) / max(uLines - 1.0, 1.0);          // 0..1 across the ribbon
      float fan = 0.55 + 0.45 * sin(x * 0.55 + uTime * 0.35); // ribbon pinches and opens
      float y = uCenter
        + (t - 0.5) * uSpread * fan
        + 0.07 * sin(x * 1.15 + uTime + t * 2.6)
        + 0.035 * sin(x * 2.4 - uTime * 0.8 + t * 5.0)
        + 0.10 * sin(x * 0.45 + uTime * 0.45);
      float d = abs(vUv.y - y);
      float glow = 0.0011 / (d + 0.0016);                    // thin bright core + soft halo
      vec3 tint = mix(uColDeep, uColLight, t);
      tint = mix(tint, uColHot, smoothstep(0.35, 0.0, abs(t - 0.5)) * 0.35);
      col += tint * glow;
    }
    // Soft atmospheric band behind the lines.
    float band = exp(-pow((vUv.y - uCenter) / (uSpread * 0.9 + 0.08), 2.0));
    col += uColDeep * band * 0.18;

    // Fade towards the left/right edges and with scroll.
    float edge = smoothstep(0.0, 0.18, vUv.x) * smoothstep(1.0, 0.82, vUv.x);
    col *= uIntensity * edge * uFade;
    float a = clamp(max(col.r, max(col.g, col.b)), 0.0, 1.0);
    gl_FragColor = vec4(col, a);
  }
`;

export function WaveShader({ colors, lines }: { colors: ThemeColors; lines: number }) {
  const size = useThree((s) => s.size);
  const mesh = useRef<Mesh>(null);

  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        blending: AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uLines: { value: lines },
          uIntensity: { value: WAVES.intensity },
          uCenter: { value: WAVES.centerY },
          uSpread: { value: WAVES.spread },
          uAspect: { value: 1 },
          uFade: { value: 1 },
          uColDeep: { value: new Color(colors.navyBright) },
          uColLight: { value: new Color(colors.lavender) },
          uColHot: { value: new Color(colors.lavenderSoft) },
        },
      }),
    [colors, lines],
  );

  useFrame((_, delta) => {
    const u = (mesh.current?.material as ShaderMaterial | undefined)?.uniforms;
    if (!u) return;
    u.uTime.value += Math.min(delta, 0.05) * WAVES.speed * 8 * HERO_SPEED;
    u.uAspect.value = size.width / Math.max(size.height, 1);
    u.uFade.value = 1 - heroSignals.scroll * 0.7;
  });

  return (
    <mesh ref={mesh} frustumCulled={false} renderOrder={-10} material={material}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  );
}
