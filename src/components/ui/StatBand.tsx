import { stats } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/motion/CountUp";

type Stat = { value: number; label: string; prefix?: string; suffix?: string };

/**
 * Headline figures. Values are rendered on the server (CountUp's markup contains the final number);
 * the count-up is an enhancement that is skipped for prefers-reduced-motion.
 */
export function StatBand({
  items = stats,
  tone = "light",
}: {
  items?: Stat[];
  /** "dark" = navy band. */
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <section
      aria-label="Anchorstone at a glance"
      className={dark ? "on-dark bg-navy" : "border-y border-line bg-white"}
    >
      <Container>
        <dl
          className={`grid divide-y sm:grid-cols-2 sm:divide-y-0 lg:divide-x ${items.length > 3 ? "lg:grid-cols-4" : "lg:grid-cols-3"} ${
            dark ? "divide-white/15" : "divide-line"
          }`}
        >
          {items.map((s) => (
            <div key={s.label} className="px-4 py-9 text-center sm:py-12">
              <dd className={`order-first font-heading text-5xl ${dark ? "text-white" : "text-brand"}`}>
                <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </dd>
              <dt className={`mt-2 text-sm font-semibold ${dark ? "text-on-navy" : "text-body"}`}>{s.label}</dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
