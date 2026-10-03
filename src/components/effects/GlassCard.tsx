import type { ComponentPropsWithoutRef } from "react";

type GlassCardProps = ComponentPropsWithoutRef<"div"> & {
  as?: "div" | "article" | "li" | "section";
  /** "light" on white/lavender sections, "dark" on navy. */
  tone?: "light" | "dark";
  /** Lift + brand glow on hover. */
  interactive?: boolean;
};

const tones = {
  light: "border-white/70 bg-white/70 shadow-soft backdrop-blur-xl",
  dark: "border-white/12 bg-white/[0.06] shadow-[inset_0_1px_0_rgb(255_255_255/0.08)] backdrop-blur-xl text-brand-100",
};
const hover = {
  light: "hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_24px_60px_-24px_color-mix(in_oklab,var(--color-brand-500)_55%,transparent)]",
  dark: "hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_24px_60px_-20px_color-mix(in_oklab,var(--color-brand-300)_45%,transparent)]",
};

/** Frosted card with a fine border, soft shadow and (optionally) a brand-coloured hover glow. */
export function GlassCard({ as: Tag = "div", tone = "light", interactive = true, className = "", ...props }: GlassCardProps) {
  return (
    <Tag
      className={`rounded-3xl border transition-all duration-500 ease-out-expo ${tones[tone]} ${interactive ? hover[tone] : ""} ${className}`}
      {...(props as object)}
    />
  );
}
