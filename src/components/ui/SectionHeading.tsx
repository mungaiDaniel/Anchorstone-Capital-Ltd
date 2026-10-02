import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** Heading level; defaults to h2. */
  as?: "h1" | "h2";
  id?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Tag = "h2",
  id,
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal className={`${centered ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow && (
        <p className={`eyebrow flex items-center gap-3 text-brand-600 ${centered ? "justify-center" : ""}`}>
          <span aria-hidden="true" className="h-px w-8 bg-brand-300" />
          {eyebrow}
        </p>
      )}
      <Tag id={id} className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem]">
        {title}
      </Tag>
      {description && <p className="mt-5 text-lg leading-relaxed text-ink-600">{description}</p>}
    </Reveal>
  );
}
