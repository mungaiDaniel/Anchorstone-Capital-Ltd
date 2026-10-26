import Image from "next/image";

/** Faint oversized monogram for dark sections. Decorative; place inside a `relative overflow-hidden` parent. */
export function Watermark({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/brand/logo_mono_white.png"
      alt=""
      aria-hidden="true"
      width={420}
      height={545}
      sizes="(min-width: 1024px) 520px, 320px"
      className={`pointer-events-none absolute -z-0 h-auto w-80 select-none opacity-[0.06] lg:w-[32rem] ${className}`}
    />
  );
}
