import Link from "next/link";
import { applyLink, contact, mainNav, site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "./Wordmark";

// Legal text and socials are added only if the client supplies them.
export function Footer() {
  return (
    <footer className="bg-brand-950 text-brand-100">
      <Container className="grid gap-10 py-14 md:grid-cols-3">
        <div className="space-y-4">
          <Wordmark inverted />
          <p className="max-w-xs text-sm leading-relaxed text-brand-200">{site.description}</p>
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow mb-4 text-brand-300">Explore</p>
          <ul className="space-y-2 text-sm">
            {[applyLink, ...mainNav].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow mb-4 text-brand-300">Contact</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={contact.phone.href} className="transition-colors hover:text-white">
                {contact.phone.display}
              </a>
            </li>
            <li>
              <a href={contact.email.href} className="break-all transition-colors hover:text-white">
                {contact.email.display}
              </a>
            </li>
            <li className="text-brand-200">
              {contact.address.display}, {contact.address.locality}
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-6 font-mono text-xs text-brand-300">
          Copyright © {new Date().getFullYear()} {site.name}
        </Container>
      </div>
    </footer>
  );
}
