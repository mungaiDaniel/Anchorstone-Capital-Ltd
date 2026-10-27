import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost-light" | "light" | "link-arrow";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-[10px] font-semibold tracking-tight transition-all duration-300 ease-out-expo hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white shadow-soft hover:bg-navy hover:shadow-lift",
  secondary: "border border-line bg-white text-brand hover:border-brand hover:bg-tint",
  "link-arrow": "!h-auto !rounded-none !px-0 text-brand hover:text-navy hover:translate-y-0",
  "ghost-light": "on-dark border border-white/30 text-white hover:border-white hover:bg-white/10",
  light: "on-dark bg-white text-navy shadow-soft hover:bg-tint hover:shadow-lift",
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
  arrow?: boolean;
};

export function ButtonLink({ variant, size, arrow = false, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses({ variant, size, className })} {...props}>
      {children}
      {arrow && <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />}
    </Link>
  );
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & { variant?: Variant; size?: Size };

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses({ variant, size, className })} {...props} />;
}
