"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, ShaderMaterial, type Points } from "three";
import { HERO_SPEED, PARTICLES, type ThemeColors } from "./config";

/** Volume the dust occupies (scene units, camera looks down -z from z=10). */
const BOX = { x: 7, y: 4.2, zNear: 3, zFar: -5 };

/** Small seeded PRNG so the dust layout is deterministic (and render stays pure). */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const vertexShader = /* glsl */ `
  attribute float aSeed;
  attribute float aSize;
  attribute float aSoft;
  uniform float uTime;
  uniform float uRise;
  uniform float uHeight;
  uniform float uPixelRatio;
  varying float vSoft;
  varying float vTwinkle;
  void main() {
    vec3 p = position;
    // Rise forever, wrapping from top back to bottom.
    p.y = mod(p.y + uTime * uRise * (0.5 + aSeed) + uHeight, uHeight * 2.0) - uHeight;
    p.x += sin(uTime * 0.25 + aSeed * 6.283) * 0.18;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPixelRatio * (10.0 / -mv.z);
    vSoft = aSoft;
    vTwinkle = 0.55 + 0.45 * sin(uTime * (0.8 + aSeed * 1.7) + aSeed * 40.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;
  uniform vec3 uColor;
  uniform vec3 uColorWarm;
  varying float vSoft;
  varying float vTwinkle;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    // Sharp specks have a hot core; "blurred" ones are a faint wide disc.
    float sharp = pow(smoothstep(0.5, 0.0, d), 2.6);
    float soft = smoothstep(0.5, 0.1, d) * 0.28;
    float a = mix(sharp, soft, vSoft) * vTwinkle;
    vec3 c = mix(uColor, uColorWarm, vSoft * 0.35);
    gl_FragColor = vec4(c * a, a);
  }
`;

export function Particles({ colors, count }: { colors: ThemeColors; count: number }) {
  const dpr = useThree((s) => s.viewport.dpr);

  const points = useRef<Points>(null);

  const geometry = useMemo(() => {
    const random = mulberry32(20260210);
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    const size = new Float32Array(count);
    const soft = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (random() * 2 - 1) * BOX.x;
      pos[i * 3 + 1] = (random() * 2 - 1) * BOX.y;
      pos[i * 3 + 2] = BOX.zFar + random() * (BOX.zNear - BOX.zFar);
      seed[i] = random();
      const isSoft = random() < PARTICLES.blurredShare;
      soft[i] = isSoft ? 1 : 0;
      size[i] = isSoft ? 14 + random() * 16 : 2 + random() * 3.5;
    }
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(pos, 3));
    g.setAttribute("aSeed", new BufferAttribute(seed, 1));
    g.setAttribute("aSize", new BufferAttribute(size, 1));
    g.setAttribute("aSoft", new BufferAttribute(soft, 1));
    return g;
  }, [count]);

  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uRise: { value: PARTICLES.riseSpeed },
          uHeight: { value: BOX.y },
          uPixelRatio: { value: 1 },
          uColor: { value: new Color(colors.lavenderSoft) },
          uColorWarm: { value: new Color(colors.gold) },
        },
      }),
    [colors],
  );

  useFrame((_, delta) => {
    const u = (points.current?.material as ShaderMaterial | undefined)?.uniforms;
    if (!u) return;
    u.uTime.value += Math.min(delta, 0.05) * HERO_SPEED;
    u.uPixelRatio.value = dpr;
  });

  return <points ref={points} geometry={geometry} material={material} frustumCulled={false} />;
}
