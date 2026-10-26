import Link from "next/link";
import { products, profilePdf, siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Watermark } from "@/components/ui/Watermark";
import { Logo } from "./Logo";

const company = [
  { label: "About Us", href: "/about-us" },
  { label: "Our Team", href: "/our-team" },
  { label: "Media", href: "/media" },
];

export function Footer() {
  const { contact } = siteConfig;
  return (
    <footer className="on-dark relative isolate overflow-hidden bg-navy text-soft">
      <Watermark className="-right-16 -bottom-24" />
      <Container className="grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="space-y-5">
          <Logo tone="dark" />
          <p className="max-w-xs text-sm leading-relaxed">
            Fast, fair and transparent credit for individuals, students and small businesses in Kenya.
          </p>
          <p className="max-w-xs text-sm font-semibold text-white">{siteConfig.licenceLine}</p>
        </div>

        <nav aria-label="Footer products">
          <p className="eyebrow mb-4 text-white">Products</p>
          <ul className="space-y-2.5 text-sm">
            {products.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`} className="transition-colors hover:text-white">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer company">
          <p className="eyebrow mb-4 text-white">Company</p>
          <ul className="space-y-2.5 text-sm">
            {company.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={profilePdf} download className="transition-colors hover:text-white">
                Download profile
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <p className="eyebrow mb-4 text-white">Contact</p>
          <address className="space-y-2.5 text-sm not-italic">
            <p>{contact.address.display}</p>
            <p>
              <a href={contact.phone.href} className="transition-colors hover:text-white">
                {contact.phone.display}
              </a>
            </p>
            <p>
              <a href={contact.email.href} className="break-all transition-colors hover:text-white">
                {contact.email.display}
              </a>
            </p>
          </address>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-wrap items-center justify-between gap-2 py-6 text-xs">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}
          </p>
          <Link href="/privacy" className="transition-colors hover:text-white">
            Privacy
          </Link>
        </Container>
      </div>
    </footer>
  );
}
