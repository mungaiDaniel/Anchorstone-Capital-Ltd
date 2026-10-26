/**
 * Angled "shard" edge between a navy section and the light one below it
 * (echoes the A of the monogram). Place as the last child of a `relative` section.
 */
export function DiagonalDivider({
  fill = "var(--color-paper)",
  className = "",
}: {
  /** Colour of the section that follows. */
  fill?: string;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none absolute inset-x-0 bottom-[-1px] h-10 w-full sm:h-16 lg:h-20 ${className}`}
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
    >
      <polygon points="0,100 1440,0 1440,100" fill={fill} />
    </svg>
  );
}
