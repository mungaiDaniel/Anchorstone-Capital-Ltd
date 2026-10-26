import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "./Eyebrow";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  id?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  id,
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal className={`max-w-3xl ${centered ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && <Eyebrow tone={tone} className={centered ? "justify-center" : ""}>{eyebrow}</Eyebrow>}
      <h2
        id={id}
        className={`mt-4 text-3xl leading-tight sm:text-4xl lg:text-[2.75rem] ${tone === "dark" ? "!text-white" : ""}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-lg leading-relaxed ${tone === "dark" ? "text-soft" : "text-body"}`}>{description}</p>
      )}
    </Reveal>
  );
}
