import type { ComponentPropsWithoutRef } from "react";

export function Card({ className = "", ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={`rounded-2xl border border-line bg-white p-6 shadow-soft sm:p-7 ${className}`} {...props} />;
}
