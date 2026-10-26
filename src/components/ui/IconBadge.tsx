import type { IconName } from "@/content/site";
import { Icon } from "./Icon";

export function IconBadge({
  name,
  tone = "light",
  size = "md",
  className = "",
}: {
  name: IconName;
  tone?: "light" | "dark";
  size?: "md" | "lg";
  className?: string;
}) {
  const box = size === "lg" ? "size-20" : "size-12";
  const icon = size === "lg" ? "size-9" : "size-6";
  return (
    <span
      className={`inline-flex ${box} shrink-0 items-center justify-center rounded-full ${
        tone === "dark" ? "bg-white/10 text-white ring-1 ring-white/25" : "bg-tint text-brand"
      } ${className}`}
    >
      <Icon name={name} className={icon} />
    </span>
  );
}
