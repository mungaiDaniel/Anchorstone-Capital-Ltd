import Image from "next/image";
import { partners } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Partner logos — hidden entirely while `partners` is empty. Grayscale → colour on hover. */
export function PartnersStrip({ slim = false }: { slim?: boolean }) {
  if (partners.length === 0) return null;
  const list = (
    <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
      {partners.map((p) => (
        <li key={p.name}>
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block grayscale transition duration-300 hover:grayscale-0 focus-visible:grayscale-0"
          >
            <Image src={p.logo} alt={p.name} width={160} height={56} className="h-12 w-auto object-contain" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );

  if (slim) {
    return (
      <section aria-label="Our partners" className="border-y border-line bg-white py-10">
        <Container>
          <p className="eyebrow mb-6 text-center text-muted">Our partners</p>
          {list}
        </Container>
      </section>
    );
  }
  return (
    <section aria-labelledby="partners-title" className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading id="partners-title" eyebrow="Partners" title="Our Partners" align="center" />
        <div className="mt-12">{list}</div>
      </Container>
    </section>
  );
}
