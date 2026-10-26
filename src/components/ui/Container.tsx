import type { ComponentPropsWithoutRef } from "react";

type ContainerProps = { as?: "div" | "section" | "nav" | "ul" | "header" | "footer" } & ComponentPropsWithoutRef<"div">;

export function Container({ as: Tag = "div", className = "", ...props }: ContainerProps) {
  return <Tag className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`} {...(props as object)} />;
}
