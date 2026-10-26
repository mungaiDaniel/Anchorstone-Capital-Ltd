"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { applyLink, nav, products } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { buttonClasses } from "@/components/ui/Button";
import { Logo } from "./Logo";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileProducts, setMobileProducts] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
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
    setDropdownOpen(false);
  }

  // Desktop dropdown: close on outside click / Escape.
  useEffect(() => {
    if (!dropdownOpen) return;
    const onPointer = (e: PointerEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setDropdownOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        dropdownRef.current?.querySelector<HTMLElement>("button")?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [dropdownOpen]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Mobile menu: lock scroll, trap focus, close on Escape.
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
  const link = (active: boolean) =>
    `text-sm font-semibold transition-colors ${active ? "text-brand" : "text-body hover:text-brand"}`;

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur-lg transition-shadow duration-300 ${
          scrolled ? "border-line shadow-soft" : "border-transparent"
        }`}
      >
        <nav aria-label="Main" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
          <Logo />

          <ul className="hidden items-center gap-8 lg:flex">
            {nav.map((item) =>
              "children" in item ? (
                <li key={item.href} ref={dropdownRef} className="relative">
                  <button
                    type="button"
                    aria-expanded={dropdownOpen}
                    aria-controls="products-menu"
                    onClick={() => setDropdownOpen((v) => !v)}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setDropdownOpen(true);
                        requestAnimationFrame(() => document.querySelector<HTMLElement>("#products-menu a")?.focus());
                      }
                    }}
                    className={`inline-flex items-center gap-1 ${link(isActive(item.href))}`}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={`size-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {dropdownOpen && (
                    <ul
                      id="products-menu"
                      className="absolute top-full left-1/2 mt-3 w-80 -translate-x-1/2 rounded-2xl border border-line bg-white p-2 shadow-lift"
                    >
                      {products.map((p) => (
                        <li key={p.slug}>
                          <Link
                            href={`/products/${p.slug}`}
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-tint"
                          >
                            <Icon name={p.icon} className="size-5 text-brand" />
                            {p.name}
                          </Link>
                        </li>
                      ))}
                      <li className="mt-1 border-t border-line pt-1">
                        <Link
                          href="/products"
                          className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-brand hover:bg-tint"
                        >
                          All products
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={link(isActive(item.href))}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>

          <div className="flex items-center gap-2">
            <Link href={applyLink.href} className={buttonClasses({ className: "hidden sm:inline-flex" })}>
              {applyLink.label}
            </Link>
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
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-white px-4 pt-4 pb-10 sm:top-20 lg:hidden"
        >
          <ul className="flex flex-col">
            {nav.map((item) =>
              "children" in item ? (
                <li key={item.href} className="border-b border-line">
                  <button
                    type="button"
                    aria-expanded={mobileProducts}
                    aria-controls="mobile-products"
                    onClick={() => setMobileProducts((v) => !v)}
                    className="flex w-full items-center justify-between py-4 font-heading text-2xl text-ink"
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={`size-5 transition-transform ${mobileProducts ? "rotate-180" : ""}`}
                    />
                  </button>
                  {mobileProducts && (
                    <ul id="mobile-products" className="pb-3 pl-2">
                      {products.map((p) => (
                        <li key={p.slug}>
                          <Link href={`/products/${p.slug}`} className="flex items-center gap-3 py-2.5 text-body">
                            <Icon name={p.icon} className="size-5 text-brand" />
                            {p.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link href="/products" className="block py-2.5 font-semibold text-brand">
                          All products
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="block py-4 font-heading text-2xl text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
          <Link href={applyLink.href} className={buttonClasses({ size: "lg", className: "mt-8 w-full" })}>
            {applyLink.label}
          </Link>
        </div>
      )}
    </>
  );
}
