"use client";

import { useRef, type ComponentPropsWithoutRef, type CSSProperties } from "react";
import { useScrollReveal } from "./useScrollReveal";

export type RevealVariant = "up" | "left" | "right" | "scale" | "blur";
type Tag = "div" | "section" | "article" | "li" | "p" | "span" | "figure";

type RevealProps = ComponentPropsWithoutRef<"div"> & {
  as?: Tag;
  variant?: RevealVariant;
  /** Seconds to wait after the trigger. */
  delay?: number;
  /** Override the travel distance in px (default from motion tokens). */
  y?: number;
  /** "scroll" (default): once when scrolled into view. "load": on page load, pure CSS. */
  trigger?: "scroll" | "load";
};

/** Fade + move into place. Never hides content before JS runs (see useScrollReveal). */
export function Reveal({ as: Tag = "div", variant = "up", delay = 0, y, trigger = "scroll", className = "", style, ...props }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(trigger === "scroll" ? ref : { current: null });

  const vars = {
    ...(delay ? { "--reveal-delay": `${delay}s` } : {}),
    ...(y !== undefined ? { "--motion-distance": `${y}px` } : {}),
    ...style,
  } as CSSProperties;

  return (
    <Tag
      ref={ref as never}
      data-reveal={variant}
      className={`${trigger === "load" ? "reveal-load" : ""} ${className}`}
      style={vars}
      {...(props as object)}
    />
  );
}
