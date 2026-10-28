import Image from "next/image";
import type { SiteImage } from "@/content/images";

/**
 * A slot photo with blur placeholder. `overlay` adds the navy gradient used under white text on heroes and bands.
 * Fills its positioned parent; decorative by default only when `decorative` is set (the alt text is otherwise kept).
 */
export function SitePhoto({
  image,
  sizes,
  priority = false,
  overlay = false,
  decorative = false,
  className = "",
}: {
  image: SiteImage;
  sizes: string;
  priority?: boolean;
  overlay?: boolean;
  decorative?: boolean;
  className?: string;
}) {
  return (
    <>
      <Image
        src={image.src}
        alt={decorative ? "" : image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        blurDataURL={image.blurDataURL}
        className={`absolute inset-0 size-full object-cover ${className}`}
      />
      {overlay && (
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, rgba(11,16,80,.92), rgba(11,16,80,.55))" }}
        />
      )}
    </>
  );
}
