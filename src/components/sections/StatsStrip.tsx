import { stats } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/motion/CountUp";

/** Three headline figures with thin dividers. Shared by Home and About. */
export function StatsStrip() {
  return (
    <section aria-label="Anchorstone at a glance" className="border-y border-line bg-white">
      <Container>
        <dl className="grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((s) => (
            <div key={s.label} className="px-4 py-8 text-center sm:py-10">
              <dd className="order-first font-heading text-5xl text-brand">
                <CountUp value={s.value} prefix={"prefix" in s ? s.prefix : ""} suffix={s.suffix} />
              </dd>
              <dt className="mt-2 text-sm font-semibold text-body">{s.label}</dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
