"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";
import { stagger } from "@/lib/motion";
import type { RevealVariant } from "./Reveal";
import { useScrollReveal } from "./useScrollReveal";

type GroupProps = ComponentPropsWithoutRef<"div"> & {
  as?: "div" | "ul" | "ol";
  variant?: RevealVariant;
  /** Seconds between children (default: motion token). */
  step?: number;
  /** Seconds before the first child. */
  delay?: number;
};

/** Reveals its <StaggerItem> children one after another when the group scrolls into view. */
export function StaggerGroup({ as: Tag = "div", variant = "up", step = stagger.items, delay = 0, ...props }: GroupProps) {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref, (el) => {
    el.querySelectorAll<HTMLElement>(":scope > [data-stagger-item], :scope > * > [data-stagger-item]").forEach((child, i) => {
      child.style.setProperty("--reveal-delay", `${delay + i * step}s`);
    });
  });
  return <Tag ref={ref as never} data-stagger={variant} {...(props as object)} />;
}

type ItemProps = ComponentPropsWithoutRef<"div"> & { as?: "div" | "li" | "article" };

export function StaggerItem({ as: Tag = "div", ...props }: ItemProps) {
  return <Tag data-stagger-item="" {...(props as object)} />;
}
