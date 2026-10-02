"use client";

import { useState, type ComponentType, type SVGProps } from "react";
import { contact, mapsLinkUrl } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon, CheckIcon, CopyIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/ui/icons";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

type Card = {
  title: string;
  value: string;
  href: string;
  action: string;
  external?: boolean;
  copy?: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const cards: Card[] = [
  { title: "Call us", value: contact.phone.display, href: contact.phone.href, action: "Call now", copy: contact.phone.display, Icon: PhoneIcon },
  { title: "Email", value: contact.email.display, href: contact.email.href, action: "Send an email", copy: contact.email.display, Icon: MailIcon },
  { title: "Visit us", value: `${contact.address.display}, ${contact.address.locality}`, href: mapsLinkUrl, action: "Get directions", external: true, Icon: MapPinIcon },
];

/** Three contact cards that overlap the bottom of the page hero. */
export function ContactCards() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      window.setTimeout(() => setCopied((c) => (c === text ? null : c)), 2000);
    } catch {
      /* clipboard unavailable — the link still works */
    }
  };

  return (
    <Container className="relative z-10 -mt-14 sm:-mt-20">
      <StaggerGroup as="ul" className="grid gap-5 md:grid-cols-3">
        {cards.map(({ title, value, href, action, external, copy: copyText, Icon }) => (
          <StaggerItem
            as="li"
            key={title}
            className="group relative flex flex-col rounded-[1.75rem] border border-line bg-white p-7 shadow-lift transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-brand-200"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-700 text-white shadow-soft transition-transform duration-500 ease-out-expo group-hover:-rotate-6 group-hover:scale-110">
                <Icon className="size-6" />
              </span>
              {copyText && (
                <button
                  type="button"
                  onClick={() => copy(copyText)}
                  className="relative z-10 inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-xs text-ink-600 transition hover:border-brand-300 hover:text-brand-700"
                  aria-label={`Copy ${title === "Email" ? "email address" : "phone number"}`}
                >
                  {copied === copyText ? <CheckIcon className="size-3.5 text-brand-600" /> : <CopyIcon className="size-3.5" />}
                  {copied === copyText ? "Copied" : "Copy"}
                </button>
              )}
            </div>
            <h2 className="mt-6 text-lg font-semibold">{title}</h2>
            <p className="mt-1 font-mono text-[1.05rem] break-all text-brand-800">{value}</p>
            <a
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="mt-auto inline-flex items-center gap-2 pt-6 font-mono text-sm font-medium text-brand-700 after:absolute after:inset-0 after:rounded-[1.75rem]"
            >
              {action}
              {external && <span className="sr-only"> (opens Google Maps in a new tab)</span>}
              <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </StaggerItem>
        ))}
      </StaggerGroup>
      <p aria-live="polite" className="sr-only">
        {copied ? `Copied ${copied}` : ""}
      </p>
    </Container>
  );
}
