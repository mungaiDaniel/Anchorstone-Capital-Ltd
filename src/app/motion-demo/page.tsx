import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { MOTION_INTENSITY, duration, effect, stagger } from "@/lib/motion";
import { loanProducts } from "@/content/loans";
import { applySteps } from "@/content/steps";
import { heroCopy } from "@/content/hero";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon, BoltIcon, EyeIcon, HeadsetIcon, ShieldCheckIcon } from "@/components/ui/icons";
import { PageHeader } from "@/components/sections/PageHeader";
import { Reveal, type RevealVariant } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { SplitText } from "@/components/motion/SplitText";
import { CountUp } from "@/components/motion/CountUp";
import { Parallax } from "@/components/motion/Parallax";
import { Magnetic } from "@/components/motion/Magnetic";
import { TiltCard } from "@/components/motion/TiltCard";
import { Marquee } from "@/components/motion/Marquee";
import { DrawLine } from "@/components/motion/DrawLine";
import { AuroraBackground } from "@/components/effects/AuroraBackground";
import { GridGlow } from "@/components/effects/GridGlow";
import { NoiseOverlay } from "@/components/effects/NoiseOverlay";
import { WaveRibbon } from "@/components/effects/WaveRibbon";
import { FloatingDecor } from "@/components/effects/FloatingDecor";
import { GlassCard } from "@/components/effects/GlassCard";

// Temporary review page — not linked from the site and excluded from search engines.
export const metadata: Metadata = {
  title: "Motion system demo",
  robots: { index: false, follow: false },
};

function Demo({ name, props, children, tone = "light" }: { name: string; props?: string; children: ReactNode; tone?: "light" | "lavender" | "dark" }) {
  const bg = { light: "bg-white", lavender: "bg-lavender-50", dark: "bg-brand-950 text-white" }[tone];
  return (
    <section className={`relative isolate overflow-hidden border-b border-line py-20 ${bg}`}>
      <Container>
        <p className={`font-mono text-xs ${tone === "dark" ? "text-brand-200" : "text-brand-600"}`}>
          {"<"}
          {name}
          {">"}
          {props && <span className={tone === "dark" ? "text-brand-300" : "text-ink-500"}> {props}</span>}
        </p>
        <div className="mt-8">{children}</div>
      </Container>
    </section>
  );
}

const variants: RevealVariant[] = ["up", "left", "right", "scale", "blur"];
const whyIcons = [BoltIcon, EyeIcon, ShieldCheckIcon, HeadsetIcon];
const why = ["Fast disbursement", "Transparent terms", "Ethical lending", "Personalized support"];

export default function MotionDemoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Motion system"
        title="Every primitive, in one place"
        description="Scroll slowly. Each block below is a reusable component from components/motion or components/effects."
        breadcrumb={[{ label: "Motion demo" }]}
      />

      <Demo name="Tokens" props="lib/motion.ts" tone="lavender">
        <dl className="grid gap-4 font-mono text-sm sm:grid-cols-4">
          {[
            ["MOTION_INTENSITY", String(MOTION_INTENSITY)],
            ["duration.base", `${duration.base}s`],
            ["stagger.items", `${stagger.items}s`],
            ["effect.tiltDeg", `${effect.tiltDeg}°`],
          ].map(([k, v]) => (
            <GlassCard key={k} className="p-5" interactive={false}>
              <dt className="text-ink-500">{k}</dt>
              <dd className="mt-1 text-2xl text-brand-800">{v}</dd>
            </GlassCard>
          ))}
        </dl>
      </Demo>

      <Demo name="Reveal" props='variant="up | left | right | scale | blur"'>
        <div className="grid gap-4 sm:grid-cols-5">
          {variants.map((v, i) => (
            <Reveal key={v} variant={v} delay={i * 0.08}>
              <div className="flex h-36 items-center justify-center rounded-3xl bg-brand-50 font-mono text-brand-800">{v}</div>
            </Reveal>
          ))}
        </div>
      </Demo>

      <Demo name="StaggerGroup + StaggerItem" props='variant="up" step={0.09}' tone="lavender">
        <StaggerGroup as="ul" className="grid gap-4 sm:grid-cols-4">
          {why.map((title, i) => {
            const Icon = whyIcons[i];
            return (
              <StaggerItem as="li" key={title}>
                <GlassCard className="p-6">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-700 text-white"><Icon className="size-6" /></span>
                  <p className="mt-5 font-mono font-semibold text-brand-900">{title}</p>
                </GlassCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Demo>

      <Demo name="SplitText" props='mode="words" | "lines"'>
        <SplitText
          text={`Here’s how to apply for a loan at Anchorstone Capital Ltd`}
          className="max-w-3xl text-4xl font-semibold sm:text-5xl"
        />
        <SplitText
          as="p"
          mode="lines"
          text={["To be a catalyst of financial freedom —", "unlocking potential, restoring dignity,", "and building lasting value."]}
          className="mt-10 max-w-3xl font-mono text-2xl text-brand-700"
        />
      </Demo>

      <Demo name="CountUp" props="value prefix suffix — real figures only" tone="dark">
        <AuroraBackground className="-z-10 opacity-60" />
        <dl className="grid gap-8 text-center sm:grid-cols-4">
          {[
            { v: 300000, p: "KES ", label: "Maximum loan amount" },
            { v: 12, p: "< ", s: " hrs", label: "Personal loan disbursement" },
            { v: 24, p: "< ", s: " hrs", label: "Business funds available" },
            { v: 42, label: "Years of combined director experience" },
          ].map((c) => (
            <div key={c.label}>
              <dd className="font-mono text-4xl font-semibold text-white"><CountUp value={c.v} prefix={c.p} suffix={c.s} /></dd>
              <dt className="mt-2 text-sm text-brand-200">{c.label}</dt>
            </div>
          ))}
        </dl>
      </Demo>

      <Demo name="Parallax + FloatingDecor" props="speed={0.6}" tone="lavender">
        <div className="relative grid items-center gap-10 lg:grid-cols-2">
          <Parallax speed={0.35} className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
            <Image src="/images/business-loan-shop-owner.webp" alt="Shop owner smiling behind the counter of her well-stocked retail shop" fill sizes="(min-width:1024px) 50vw, 100vw" quality={85} className="scale-125 object-cover" />
          </Parallax>
          <p className="max-w-md text-lg leading-relaxed">The photo drifts slower than the page; the coin, glass sphere and anchor stone drift at their own speeds and bob gently.</p>
          <FloatingDecor kind="coin" size={70} className="-top-6 left-[46%]" speed={0.9} />
          <FloatingDecor kind="glass" size={52} className="right-6 -bottom-4" speed={0.5} delay={2} />
          <FloatingDecor kind="stone" size={90} className="top-8 right-[12%]" speed={0.7} delay={4} />
        </div>
      </Demo>

      <Demo name="Magnetic" props="strength={1}">
        <div className="flex flex-wrap items-center gap-4">
          <Magnetic>
            <ButtonLink href="/apply-loan" size="lg" arrow>Apply Now</ButtonLink>
          </Magnetic>
          <Magnetic strength={0.6}>
            <ButtonLink href="/contact-us" size="lg" variant="secondary">Contact us</ButtonLink>
          </Magnetic>
          <Link href="/about-us" className="link-draw font-mono text-sm text-brand-700">Underline-draw link (.link-draw)</Link>
        </div>
      </Demo>

      <Demo name="TiltCard" props="glare strength={1}" tone="lavender">
        <div className="grid gap-6 md:grid-cols-3">
          {loanProducts.map((p) => (
            <TiltCard key={p.slug} className="rounded-3xl">
              <GlassCard className="h-full p-8" interactive={false}>
                <p className="eyebrow text-brand-600">{p.label}</p>
                <p className="mt-4 font-mono text-3xl font-semibold text-brand-900">KSh 300,000</p>
                <p className="mt-3 text-sm">{p.hero.speed}</p>
              </GlassCard>
            </TiltCard>
          ))}
        </div>
      </Demo>

      <Demo name="Marquee" props="items seconds gap" tone="dark">
        <Marquee
          items={heroCopy.trustPoints.map((t) => (
            <span key={t} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 font-mono text-xs text-brand-100">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-gold" />
              {t}
            </span>
          ))}
        />
      </Demo>

      <Demo name="DrawLine" props='path="…" scrub — timeline for “how to apply”'>
        <div className="relative">
          <DrawLine scrub path="M 20 60 C 200 10, 350 110, 500 60 S 800 10, 980 60" className="absolute inset-x-0 top-0 hidden h-28 md:block" strokeWidth={2.5} />
          <ol className="relative grid gap-6 md:grid-cols-3 md:pt-10">
            {applySteps.map((s, i) => (
              <Reveal as="li" key={s} delay={i * 0.12} className="text-center">
                <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-700 font-mono text-xl font-semibold text-white ring-8 ring-white">0{i + 1}</span>
                <p className="mx-auto mt-4 max-w-xs">{s}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Demo>

      <Demo name="AuroraBackground + GridGlow + WaveRibbon + NoiseOverlay" props='tone="dark" | "light"' tone="dark">
        <AuroraBackground className="-z-10" />
        <GridGlow className="-z-10" />
        <WaveRibbon className="bottom-0 -z-10 h-40" />
        <NoiseOverlay className="-z-10" />
        <div className="grid min-h-64 gap-6 md:grid-cols-2">
          <GlassCard tone="dark" className="p-8">
            <p className="font-mono text-xl text-white">GlassCard tone=&quot;dark&quot;</p>
            <p className="mt-3 text-sm">Move the mouse over this section — the grid lights up under the cursor.</p>
          </GlassCard>
        </div>
      </Demo>

      <Demo name="Light variants" props='AuroraBackground tone="light" · GlassCard' tone="lavender">
        <AuroraBackground tone="light" className="-z-10" />
        <WaveRibbon tone="light" className="bottom-0 -z-10 h-32" />
        <div className="grid gap-6 md:grid-cols-3">
          {["Integrity", "Stewardship", "Excellence"].map((v) => (
            <GlassCard key={v} className="p-8">
              <p className="font-mono text-xl font-semibold text-brand-900">{v}</p>
              <p className="mt-2 text-sm">Hover for the brand glow.</p>
            </GlassCard>
          ))}
        </div>
      </Demo>

      <Demo name="PageTransition · ScrollProgress · CustomCursor · SmoothScroll" props="global (root layout / template)">
        <p className="max-w-2xl leading-relaxed">
          The lavender bar at the very top tracks scroll progress. On desktop a soft ring trails the cursor and grows over links.
          Navigate to another page to see the navy wipe transition:
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {["/about-us", "/our-team", "/contact-us"].map((href) => (
            <Link key={href} href={href} className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 font-mono text-sm text-brand-800 transition hover:-translate-y-0.5 hover:border-brand-300">
              {href} <ArrowRightIcon className="size-4" />
            </Link>
          ))}
        </div>
      </Demo>
    </>
  );
}
