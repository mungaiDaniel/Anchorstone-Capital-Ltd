"use client";

import { createContext, Suspense, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { QuickApplyForm, type QuickApplyPreset } from "@/components/forms/QuickApplyForm";
import { quickProductOptions } from "@/lib/forms/schemas";

type Ctx = { open: (preset?: QuickApplyPreset) => void; close: () => void; isOpen: boolean };
const LoanModalContext = createContext<Ctx>({ open: () => {}, close: () => {}, isOpen: false });

/** `const { open } = useLoanModal(); open({ product: "logbook-loan", amount: 200000 })` */
export const useLoanModal = () => useContext(LoanModalContext);

/** Opens the modal when the URL has ?apply=<product-slug> (or ?apply=1), then strips the param. */
function ApplyParamWatcher({ open }: { open: (p?: QuickApplyPreset) => void }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const apply = params.get("apply");
  useEffect(() => {
    if (apply === null) return;
    const product = quickProductOptions.some((o) => o.value === apply) ? apply : undefined;
    open({ product });
    const next = new URLSearchParams(params.toString());
    next.delete("apply");
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [apply, open, params, pathname, router]);
  return null;
}

export function LoanModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preset, setPreset] = useState<QuickApplyPreset | undefined>();
  const [session, setSession] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = useCallback((p?: QuickApplyPreset) => {
    setPreset(p);
    setSession((s) => s + 1);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  // Native <dialog>: modal focus trap, Escape to close and focus return come for free.
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (isOpen && !d.open) d.showModal();
    if (!isOpen && d.open) d.close();
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Native close (Escape key, form method=dialog, programmatic) → keep state in sync.
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onClose = () => setIsOpen(false);
    d.addEventListener("close", onClose);
    d.addEventListener("cancel", onClose); // Escape
    return () => {
      d.removeEventListener("close", onClose);
      d.removeEventListener("cancel", onClose);
    };
  }, []);

  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);

  return (
    <LoanModalContext.Provider value={value}>
      {children}
      <Suspense fallback={null}>
        <ApplyParamWatcher open={open} />
      </Suspense>
      <dialog
        ref={dialogRef}
        aria-label="Apply for a loan"
        data-lenis-prevent
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="m-auto max-h-[92dvh] w-[min(32rem,calc(100vw-1.5rem))] overflow-y-auto rounded-2xl border border-line bg-white p-0 shadow-lift backdrop:bg-navy/60 backdrop:backdrop-blur-sm"
      >
        <div className="relative p-6 sm:p-8">
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-3 right-3 inline-flex size-10 items-center justify-center rounded-full text-ink hover:bg-tint"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
          {isOpen && <QuickApplyForm key={session} preset={preset} heading="Tell us what you need" compact />}
        </div>
      </dialog>
    </LoanModalContext.Provider>
  );
}
