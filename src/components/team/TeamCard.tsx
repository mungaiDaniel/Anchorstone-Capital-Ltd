import Link from "next/link";
import { summaryOf, type TeamMember } from "@/content/team";
import { ArrowRightIcon } from "@/components/ui/icons";
import { ProfilePhoto } from "./ProfilePhoto";

type TeamCardProps = { member: TeamMember; compact?: boolean; headingLevel?: "h2" | "h3" };

/** Whole card is one link (stretched) to the member's profile page. */
export function TeamCard({ member, compact = false, headingLevel: H = "h2" }: TeamCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-soft transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-lift">
      <ProfilePhoto
        member={member}
        sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
        className={`${compact ? "aspect-[16/9]" : "aspect-[16/10] sm:aspect-[4/5]"} transition-transform duration-700 ease-out-expo`}
      />
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="eyebrow text-brand-600">{member.role}</p>
        <H className="mt-2 text-xl font-semibold sm:text-2xl">
          <Link
            href={`/our-team/${member.slug}`}
            className="after:absolute after:inset-0 after:rounded-[1.75rem] focus-visible:outline-none after:focus-visible:ring-4 after:focus-visible:ring-brand-200"
          >
            {member.name}
          </Link>
        </H>
        {!compact && <p className="mt-3 line-clamp-3 text-[0.95rem] leading-relaxed">{summaryOf(member)}</p>}
        <span className="mt-auto inline-flex items-center gap-2 pt-6 font-mono text-sm font-medium text-brand-700">
          View profile
          <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
