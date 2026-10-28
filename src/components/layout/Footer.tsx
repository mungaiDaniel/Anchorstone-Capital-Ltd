import Link from "next/link";
import { products, profilePdf, siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Watermark } from "@/components/ui/Watermark";
import { Logo } from "./Logo";

const explore = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Our Products", href: "/products" },
  { label: "Partners", href: "/partners" },
  { label: "Careers", href: "/careers" },
  { label: "Media Centre", href: "/media" },
];

const socialLabels = { facebook: "Facebook", x: "X", linkedin: "LinkedIn", instagram: "Instagram", youtube: "YouTube" } as const;

export function Footer() {
  const { contact, socials } = siteConfig;
  const socialLinks = (Object.keys(socialLabels) as (keyof typeof socialLabels)[])
    .map((k): { label: string; href: string | undefined } => ({ label: socialLabels[k], href: socials[k] }))
    .filter((s): s is { label: string; href: string } => Boolean(s.href));

  return (
    <footer className="on-dark relative isolate overflow-hidden bg-navy text-on-navy">
      <Watermark className="-right-16 -bottom-24" />
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="space-y-5">
          <Logo tone="dark" />
          <p className="font-heading text-2xl text-white">{siteConfig.motto}</p>
          <p className="max-w-xs text-sm leading-relaxed">
            Fast, fair and transparent credit for individuals, students and small businesses in Kenya.
          </p>
          {socialLinks.length > 0 && (
            <ul className="flex flex-wrap gap-4 text-sm font-semibold">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    {s.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Footer explore">
          <p className="eyebrow mb-4 text-white">Explore</p>
          <ul className="space-y-2.5 text-sm">
            {explore.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={profilePdf} download className="transition-colors hover:text-white">
                Download company profile (PDF)
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label="Footer products">
          <p className="eyebrow mb-4 text-white">Our Products</p>
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
            {contact.officeHours && <p>{contact.officeHours}</p>}
            <p className="pt-2 font-semibold text-white">CBK licensed credit provider</p>
          </address>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-6 text-xs">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}
          </p>
          <p className="flex gap-5">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms &amp; Conditions
            </Link>
            <Link href="/credits" className="transition-colors hover:text-white">
              Photo credits
            </Link>
          </p>
        </Container>
      </div>
    </footer>
  );
}
