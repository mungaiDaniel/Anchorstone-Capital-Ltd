"use client";

import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import type { QuickApplyPreset } from "@/components/forms/QuickApplyForm";
import { Button } from "@/components/ui/Button";
import { useLoanModal } from "./LoanModalProvider";

/** A button that opens the global loan modal, optionally preset with a product / amount. */
export function ApplyButton({
  preset,
  arrow = false,
  children,
  ...props
}: { preset?: QuickApplyPreset; arrow?: boolean; children: ReactNode } & Omit<ComponentProps<typeof Button>, "onClick" | "children">) {
  const { open } = useLoanModal();
  return (
    <Button {...props} onClick={() => open(preset)}>
      {children}
      {arrow && <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />}
    </Button>
  );
}
