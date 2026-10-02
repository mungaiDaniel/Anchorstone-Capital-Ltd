import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { ArrowRightIcon } from "./icons";

type Variant = "primary" | "secondary" | "light" | "accent";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-mono font-medium tracking-tight transition-all duration-300 ease-out-expo hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-brand-700 text-white shadow-soft hover:bg-brand-600 hover:shadow-lift",
  secondary:
    "border border-brand-200 bg-white text-brand-700 hover:border-brand-700 hover:bg-brand-50",
  light: "bg-white text-brand-800 shadow-soft hover:bg-lavender-100 hover:shadow-lift",
  // Gold call-to-action on navy panels (the original calculator's yellow button)
  accent: "bg-accent-gold text-brand-950 shadow-soft hover:bg-white hover:shadow-lift",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[0.95rem]",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className = "",
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: Variant;
  size?: Size;
  /** Show a trailing arrow that nudges on hover. */
  arrow?: boolean;
};

export function ButtonLink({
  variant,
  size,
  arrow = false,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={buttonClasses({ variant, size, className })} {...props}>
      {children}
      {arrow && (
        <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </Link>
  );
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & { variant?: Variant; size?: Size };

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses({ variant, size, className })} {...props} />;
}
