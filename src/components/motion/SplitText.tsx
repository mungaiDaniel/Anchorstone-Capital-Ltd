"use client";

import { Fragment, useRef, type CSSProperties } from "react";
import { stagger } from "@/lib/motion";
import { useScrollReveal } from "./useScrollReveal";

type SplitTextProps = {
  /** Plain text. For `mode="lines"`, pass an array (one entry per line). */
  text: string | string[];
  as?: "h1" | "h2" | "h3" | "p" | "span";
  mode?: "words" | "lines";
  /** "load": CSS-only, plays on first paint (use for page titles). "scroll": once in view. */
  trigger?: "load" | "scroll";
  delay?: number;
  className?: string;
  /** Classes for each word/line span (e.g. gradient text). */
  unitClassName?: string;
};

/**
 * Word-by-word (or line-by-line) blur-to-sharp reveal. Renders real text in the server
 * HTML; screen readers get the full sentence via aria-label.
 */
export function SplitText({ text, as: Tag = "h2", mode = "words", trigger = "scroll", delay = 0, className = "", unitClassName = "" }: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(trigger === "scroll" ? ref : { current: null });

  const lines = Array.isArray(text) ? text : [text];
  const label = lines.join(" ");
  const step = mode === "words" ? stagger.words : stagger.lines;
  let i = 0;

  return (
    <Tag
      ref={ref as never}
      aria-label={label}
      className={`${trigger === "load" ? "split-load" : ""} ${className}`}
      style={{ "--split-step": `${step}s`, "--reveal-delay": `${delay}s` } as CSSProperties}
    >
      {lines.map((line, li) => (
        <span key={li} aria-hidden="true" className="block">
          {mode === "lines" ? (
            <span className={`split-unit ${unitClassName}`} style={{ "--i": i++ } as CSSProperties}>
              {line}
            </span>
          ) : (
            line.split(" ").map((word, wi) => (
              <Fragment key={wi}>
                {wi > 0 && " "}
                <span className={`split-unit ${unitClassName}`} style={{ "--i": i++ } as CSSProperties}>
                  {word}
                </span>
              </Fragment>
            ))
          )}
        </span>
      ))}
    </Tag>
  );
}
