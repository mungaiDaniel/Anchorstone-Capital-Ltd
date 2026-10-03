"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "motion/react";
import { useEffect, useState } from "react";
import { applyLink, mainNav } from "@/lib/site";
import { Wordmark } from "./Wordmark";

/** Pages whose first section is a dark hero — the navbar starts as clear glass there. */
const DARK_TOP_ROUTES = new Set(["/", "/about-us", "/apply-loan", "/our-team", "/contact-us"]);

/**
 * Floating glass-pill navbar, fixed over the page.
 * Top of a dark hero: transparent glass + white text. After scrolling (or on light pages):
 * frosted white pill + navy text, slightly narrower and shorter.
 */
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The 404 page also opens on a dark hero; it renders under whatever path was requested.
  const knownLight = pathname.startsWith("/our-team/");
  const dark = (DARK_TOP_ROUTES.has(pathname) || !knownLight) && !scrolled && !open;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <div
        className={`pointer-events-auto mx-auto rounded-[1.75rem] border backdrop-blur-xl transition-all duration-500 ease-out-expo ${
          scrolled ? "max-w-5xl" : "max-w-7xl"
        } ${
          dark
            ? "border-white/12 bg-white/[0.06] shadow-[inset_0_1px_0_rgb(255_255_255/0.08)]"
            : "border-line/80 bg-white/80 shadow-soft"
        }`}
      >
        <nav
          aria-label="Main"
          className={`flex items-center justify-between pr-2 pl-5 transition-all duration-500 ease-out-expo sm:pl-6 ${
            scrolled ? "h-14" : "h-16"
          }`}
        >
          <Wordmark inverted={dark} />

          <ul className="hidden items-center gap-7 md:flex">
            {mainNav.map((link) => {
              // Nested routes (e.g. /our-team/[slug]) keep their section highlighted.
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              const tone = dark
                ? active
                  ? "text-white"
                  : "text-brand-100 hover:text-white"
                : active
                  ? "text-brand-900"
                  : "text-ink-600 hover:text-brand-900";
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`font-mono text-sm transition-colors ${tone}`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href={applyLink.href}
              className={`hidden h-10 items-center rounded-full px-5 font-mono text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 sm:inline-flex ${
                dark
                  ? "bg-white text-brand-900 hover:shadow-[0_8px_30px_-8px_rgb(255_255_255/0.5)]"
                  : "bg-brand-900 text-white shadow-soft hover:bg-brand-800 hover:shadow-lift"
              }`}
            >
              {applyLink.label}
            </Link>
            <button
              type="button"
              className={`inline-flex size-10 items-center justify-center rounded-full md:hidden ${
                dark ? "text-white hover:bg-white/10" : "text-brand-900 hover:bg-lavender-100"
              }`}
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
        </nav>

        <AnimatePresence>
          {open && (
            <m.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden md:hidden"
            >
              <ul className="flex flex-col gap-1 border-t border-line px-3 py-3">
                {[...mainNav, applyLink].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={pathname === link.href ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-3 py-3 font-mono text-sm text-brand-900 hover:bg-lavender-100"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
