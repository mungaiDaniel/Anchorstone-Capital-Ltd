import Image from "next/image";
import type { TeamMember } from "@/content/team";

type ProfilePhotoProps = {
  member: TeamMember;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/**
 * Team member portrait. Shows the headshot when `member.photo` is set,
 * otherwise a branded monogram (initials) — never a stand-in stock photo.
 * Headshots are ~750px, so `sizes` should not ask for much more than that.
 */
export function ProfilePhoto({ member, sizes, priority, className = "" }: ProfilePhotoProps) {
  return (
    <div className={`relative overflow-hidden bg-linear-to-br from-brand-800 via-brand-700 to-brand-500 ${className}`}>
      {member.photo ? (
        <Image
          src={member.photo.src}
          alt={member.photo.alt}
          fill
          quality={85}
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
          style={{ objectPosition: member.photo.position ?? "center top" }}
        />
      ) : (
        <div aria-hidden="true" className="absolute inset-0">
          {/* Decorative rings */}
          <span aria-hidden="true" className="absolute -right-1/4 -bottom-1/4 aspect-square w-3/4 rounded-full border border-white/10" />
          <span aria-hidden="true" className="absolute -right-1/8 -bottom-1/8 aspect-square w-1/2 rounded-full border border-white/10" />
          <span aria-hidden="true" className="absolute -top-1/4 -left-1/4 aspect-square w-2/3 rounded-full bg-brand-400/20 blur-2xl" />
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center font-mono text-[clamp(2.5rem,9vw,5rem)] font-semibold tracking-tight text-white/90"
          >
            {member.initials}
          </span>
        </div>
      )}
    </div>
  );
}
