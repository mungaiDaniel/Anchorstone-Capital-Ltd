"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "motion/react";
import { useEffect, useState } from "react";
import { applyLink, mainNav } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "./Wordmark";

// Placeholder shell — final styling is refined once the Home page HTML is pasted.
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/85 backdrop-blur-md transition-[border-color,box-shadow] duration-300 ${
        scrolled ? "border-line shadow-soft" : "border-transparent"
      }`}
    >
      <Container as="nav" aria-label="Main" className="flex h-16 items-center justify-between lg:h-20">
        <Wordmark />

        <ul className="hidden items-center gap-8 md:flex">
          {mainNav.map((link) => {
            // Nested routes (e.g. /our-team/[slug]) keep their section highlighted.
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`font-mono text-sm transition-colors hover:text-brand-900 ${
                    active ? "text-brand-900" : "text-ink-600"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href={applyLink.href}
            className="hidden rounded-full bg-brand-900 px-5 py-2.5 font-mono text-sm font-medium text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-800 hover:shadow-lift sm:inline-flex"
          >
            {applyLink.label}
          </Link>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full text-brand-900 hover:bg-lavender-100 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line bg-white md:hidden"
          >
            <Container as="ul" className="flex flex-col gap-1 py-4">
              {[...mainNav, applyLink].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={pathname === link.href ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 font-mono text-sm text-brand-900 hover:bg-lavender-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </Container>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
