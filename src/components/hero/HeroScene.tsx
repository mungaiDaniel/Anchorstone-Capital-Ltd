"use client";

/**
 * WebGL layers of the hero (loaded lazily, client-only):
 *   main canvas  → wave ribbon (screen-space shader) + floating objects + dust particles
 *   near canvas  → 2 large foreground objects, CSS-blurred for a cheap depth-of-field (desktop only)
 */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { PMREMGenerator } from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { OBJECTS, PARTICLES, RENDER, WAVES, readThemeColors, type ThemeColors } from "./config";
import { FloatingObjects, LAYOUT_DESKTOP, LAYOUT_MOBILE, LAYOUT_NEAR } from "./FloatingObjects";
import { Particles } from "./Particles";
import { WaveShader } from "./WaveShader";

type Props = {
  heroRef: RefObject<HTMLElement | null>;
  mobile: boolean;
  /** false when the user prefers reduced motion → render one static frame. */
  animate: boolean;
  onReady: () => void;
};

const CAMERA = { position: [0, 0, 10] as [number, number, number], fov: 35 };

export default function HeroScene({ heroRef, mobile, animate, onReady }: Props) {
  const colors = useMemo<ThemeColors>(() => readThemeColors(), []);
  const running = useRunWhileVisible(heroRef);
  const [degraded, setDegraded] = useState(false);

  const frameloop = !animate ? "demand" : running ? "always" : "never";
  const quality = mobile ? "low" : "high";
  const light = mobile || degraded;

  return (
    <>
      <div className="absolute inset-0">
      <Canvas
        frameloop={frameloop}
        dpr={mobile ? RENDER.dprMobile : RENDER.dprDesktop}
        camera={CAMERA}
        gl={{ alpha: true, antialias: !mobile, powerPreference: "high-performance" }}
        onCreated={() => requestAnimationFrame(onReady)}
        aria-hidden="true"
      >
        <Studio colors={colors} />
        <WaveShader colors={colors} lines={light ? WAVES.linesMobile : WAVES.lines} />
        <Particles colors={colors} count={light ? PARTICLES.countMobile : PARTICLES.count} />
        <FloatingObjects
          specs={mobile ? LAYOUT_MOBILE : LAYOUT_DESKTOP}
          colors={colors}
          quality={quality}
          animate={animate}
        />
        {animate && !degraded && <QualityGuard onSlow={() => setDegraded(true)} />}
      </Canvas>
      </div>

      {!mobile && !degraded && (
        <div className="absolute inset-0" style={{ filter: `blur(${OBJECTS.nearBlurPx}px)` }} aria-hidden="true">
          <Canvas
            frameloop={frameloop}
            dpr={0.75}
            camera={CAMERA}
            gl={{ alpha: true, antialias: false }}
          >
            <Studio colors={colors} />
            <FloatingObjects
              specs={LAYOUT_NEAR}
              colors={colors}
              quality="high"
              animate={animate}
              startDelay={0.2}
            />
          </Canvas>
        </div>
      )}
    </>
  );
}

/** Studio lighting: a procedural room environment for reflections plus coloured key/rim lights. */
function Studio({ colors }: { colors: ThemeColors }) {
  const get = useThree((s) => s.get);

  useEffect(() => {
    const { gl, scene } = get();
    const pmrem = new PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const env = pmrem.fromScene(room, 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = 0.85;
    return () => {
      scene.environment = null;
      env.dispose();
      room.dispose();
      pmrem.dispose();
    };
  }, [get]);

  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[-5, 6, 6]} intensity={1.6} color={colors.gold} />
      <pointLight position={[7, 1, 2]} intensity={14} distance={20} color={colors.lavender} />
      <pointLight position={[-6, -4, -2]} intensity={18} distance={20} color={colors.navyBright} />
    </>
  );
}

/** Watches frame time; if it stays slow, steps quality down once (DPR 1, lighter layers). */
function QualityGuard({ onSlow }: { onSlow: () => void }) {
  const setDpr = useThree((s) => s.setDpr);
  const samples = useRef({ frames: 0, total: 0, skipped: 0 });

  useFrame((_, delta) => {
    const s = samples.current;
    if (s.skipped < 60) return void s.skipped++; // ignore warm-up (shader compile, entrance)
    s.frames++;
    s.total += delta * 1000;
    if (s.frames === 90) {
      if (s.total / s.frames > RENDER.slowFrameMs) {
        setDpr(1);
        onSlow();
      }
      s.frames = 0;
      s.total = 0;
    }
  });
  return null;
}

/** true while the hero is on screen and the tab is visible. */
function useRunWhileVisible(ref: RefObject<HTMLElement | null>) {
  const [onScreen, setOnScreen] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    const onVis = () => setTabVisible(document.visibilityState === "visible");
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [ref]);

  return onScreen && tabVisible;
}
