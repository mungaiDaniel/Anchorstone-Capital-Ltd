"use client";

import { m, type HTMLMotionProps, type Variants } from "motion/react";

const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

type GroupProps = HTMLMotionProps<"div"> & { as?: "div" | "ul" | "ol" };

/** Children wrapped in <StaggerItem> animate in one after another when the group scrolls into view. */
export function StaggerGroup({ as = "div", ...props }: GroupProps) {
  const Component = m[as] as typeof m.div;
  return (
    <Component
      variants={group}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      {...props}
    />
  );
}

type ItemProps = HTMLMotionProps<"div"> & { as?: "div" | "li" };

export function StaggerItem({ as = "div", ...props }: ItemProps) {
  const Component = m[as] as typeof m.div;
  return <Component variants={item} {...props} />;
}
