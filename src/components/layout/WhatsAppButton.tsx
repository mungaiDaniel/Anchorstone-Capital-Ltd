"use client";

import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/content/site";
import { useLoanModal } from "@/components/modal/LoanModalProvider";

/** Floating WhatsApp button. Not rendered without a number (TODO(client) in site.ts); hidden while the modal is open. */
export function WhatsAppButton() {
  const { isOpen } = useLoanModal();
  const href = whatsappUrl();
  if (!href || isOpen) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp (opens in a new tab)"
      className="fixed right-4 bottom-4 z-40 inline-flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lift transition hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <MessageCircle aria-hidden="true" className="size-7" />
    </a>
  );
}
