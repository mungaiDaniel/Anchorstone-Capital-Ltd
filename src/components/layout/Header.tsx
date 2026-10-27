"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { nav, type NavItem } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { ApplyButton } from "@/components/modal/ApplyButton";
import { Logo } from "./Logo";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
const slug = (s: string) => s.replace(/\W+/g, "-").toLowerCase();

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus after navigation (adjust state during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
    setOpenKey(null);
  }

  // Desktop dropdowns: close on outside click / Escape (focus returns to the trigger).
  useEffect(() => {
    if (!openKey) return;
    const onPointer = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenKey(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        navRef.current?.querySelector<HTMLElement>(`[data-trigger="${openKey}"]`)?.focus();
        setOpenKey(null);
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [openKey]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Mobile drawer: lock scroll, trap focus, close on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = menuRef.current;
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return closeMenu();
      if (e.key !== "Tab" || !panel) return;
      const items = [toggleRef.current, ...panel.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(Boolean) as HTMLElement[];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, closeMenu]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const linkCls = (active: boolean) =>
    `text-sm font-semibold transition-colors ${active ? "text-brand" : "text-body hover:text-brand"}`;

  const desktopItem = (item: NavItem) => {
    if (!item.children) {
      return (
        <li key={item.href}>
          <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined} className={linkCls(isActive(item.href))}>
            {item.label}
          </Link>
        </li>
      );
    }
    const open = openKey === item.label;
    const menuId = `menu-${slug(item.label)}`;
    return (
      <li key={item.href} className="relative">
        <button
          type="button"
          data-trigger={item.label}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpenKey(open ? null : item.label)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpenKey(item.label);
              requestAnimationFrame(() => document.querySelector<HTMLElement>(`#${menuId} a`)?.focus());
            }
          }}
          className={`inline-flex items-center gap-1 ${linkCls(isActive(item.href))}`}
        >
          {item.label}
          <ChevronDown aria-hidden="true" className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <ul
            id={menuId}
            className={`absolute top-full mt-3 rounded-2xl border border-line bg-white p-2 shadow-lift ${
              item.mega ? "left-1/2 w-[34rem] -translate-x-1/2" : "left-0 w-60"
            }`}
          >
            {item.children.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className="flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-tint">
                  {c.icon && (
                    <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-tint text-brand">
                      <Icon name={c.icon} className="size-5" />
                    </span>
                  )}
                  <span>
                    <span className="block text-sm font-semibold text-ink">{c.label}</span>
                    {c.text && <span className="mt-0.5 block text-xs leading-snug text-muted">{c.text}</span>}
                  </span>
                </Link>
              </li>
            ))}
            {item.mega && (
              <li className="mt-1 border-t border-line pt-1">
                <Link href={item.href} className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-brand hover:bg-tint">
                  View all products <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </li>
            )}
          </ul>
        )}
      </li>
    );
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur-lg transition-shadow duration-300 ${
          scrolled ? "border-line shadow-soft" : "border-transparent"
        }`}
      >
        <nav aria-label="Main" className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:h-20 sm:px-6 lg:px-8">
          <Logo />

          <ul ref={navRef} className="hidden items-center gap-6 lg:flex xl:gap-7">
            {nav.map(desktopItem)}
          </ul>

          <div className="flex items-center gap-2">
            <ApplyButton arrow className="hidden sm:inline-flex">
              Apply for a Loan
            </ApplyButton>
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full text-ink hover:bg-tint lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Outside <header>: its backdrop-filter would otherwise become the containing block for this fixed panel. */}
      {menuOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          data-lenis-prevent
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-white px-4 pt-2 pb-10 sm:top-20 lg:hidden"
        >
          <ul className="flex flex-col">
            {nav.map((item) =>
              item.children ? (
                <li key={item.href} className="border-b border-line">
                  <button
                    type="button"
                    aria-expanded={mobileOpen === item.label}
                    aria-controls={`m-${slug(item.label)}`}
                    onClick={() => setMobileOpen(mobileOpen === item.label ? null : item.label)}
                    className="flex w-full items-center justify-between py-4 font-heading text-2xl text-ink"
                  >
                    {item.label}
                    <ChevronDown aria-hidden="true" className={`size-5 transition-transform ${mobileOpen === item.label ? "rotate-180" : ""}`} />
                  </button>
                  {mobileOpen === item.label && (
                    <ul id={`m-${slug(item.label)}`} className="pb-3 pl-2">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} className="flex items-center gap-3 py-2.5 text-body">
                            {c.icon && <Icon name={c.icon} className="size-5 text-brand" />}
                            {c.label}
                          </Link>
                        </li>
                      ))}
                      {item.mega && (
                        <li>
                          <Link href={item.href} className="block py-2.5 font-semibold text-brand">
                            View all products →
                          </Link>
                        </li>
                      )}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="block py-4 font-heading text-2xl text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
          <ApplyButton size="lg" arrow className="mt-8 w-full">
            Apply for a Loan
          </ApplyButton>
        </div>
      )}
    </>
  );
}
