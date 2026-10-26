"use server";

import { getProduct, contactTopics } from "@/content/site";
import { applySchema, contactSchema, parseForm, rawValues, type FormState } from "@/lib/forms/schemas";
import { clientIp, rateLimited, sendToInbox } from "@/lib/forms/server";

const BUSY: FormState = {
  status: "error",
  message: "You’ve sent several submissions in a short time. Please wait a few minutes and try again.",
};
const UNAVAILABLE = (what: string): FormState => ({
  status: "error",
  message: `We couldn’t send your ${what} just now. Please try again, or call or email us directly.`,
});

/** Bots fill the hidden field; pretend success so they learn nothing. */
const isBot = (fd: FormData) => String(fd.get("company_website") ?? "").trim() !== "";

export async function submitContact(_prev: FormState, formData: FormData): Promise<FormState> {
  if (isBot(formData)) return { status: "success" };
  if (rateLimited(`contact:${await clientIp()}`)) return BUSY;

  const parsed = parseForm(contactSchema, formData);
  if (!parsed.ok) return { status: "error", errors: parsed.errors, values: parsed.values, message: "Please fix the highlighted fields." };

  const d = parsed.data;
  const topic = contactTopics.find((t) => t.value === d.topic)?.label ?? d.topic;
  const sent = await sendToInbox({
    subject: `Website enquiry — ${topic} — ${d.name}`,
    replyTo: d.email,
    text: [
      "New website enquiry",
      "",
      `Name:   ${d.name}`,
      `Phone:  ${d.phone}`,
      `Email:  ${d.email}`,
      `Topic:  ${topic}`,
      "",
      "Message:",
      d.message,
    ].join("\n"),
  });
  return sent.ok ? { status: "success" } : { ...UNAVAILABLE("message"), values: rawValues(formData) };
}

const reference = () => {
  const d = new Date();
  const ymd = `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}`;
  const rand = Array.from(crypto.getRandomValues(new Uint8Array(4)), (b) => b.toString(36).padStart(2, "0")).join("").slice(0, 5).toUpperCase();
  return `ACL-${ymd}-${rand}`;
};

export async function submitApplication(_prev: FormState, formData: FormData): Promise<FormState> {
  if (isBot(formData)) return { status: "success", reference: reference() };
  if (rateLimited(`apply:${await clientIp()}`, 3)) return BUSY;

  const parsed = parseForm(applySchema, formData);
  if (!parsed.ok) return { status: "error", errors: parsed.errors, values: parsed.values, message: "Please fix the highlighted fields." };

  const d = parsed.data;
  const ref = reference();
  const product = getProduct(d.product)?.name ?? d.product;
  const sent = await sendToInbox({
    subject: `Loan application ${ref} — ${product} — ${d.name}`,
    replyTo: d.email,
    text: [
      `New loan application  (${ref})`,
      "",
      "APPLICANT",
      `Name:         ${d.name}`,
      `National ID:  ${d.nationalId}`,
      `Phone:        ${d.phone}`,
      `Email:        ${d.email}`,
      `County:       ${d.county}`,
      `Employment:   ${d.employmentType}`,
      "",
      "LOAN REQUEST",
      `Product:      ${product}`,
      `Amount:       KES ${d.amount.toLocaleString("en-US")}`,
      `Tenure:       ${d.tenure} month${d.tenure === 1 ? "" : "s"}`,
      "",
      `Heard about us: ${d.heardFrom}`,
      "Consent to credit check: yes",
      "Privacy notice accepted: yes",
    ].join("\n"),
  });
  return sent.ok ? { status: "success", reference: ref } : { ...UNAVAILABLE("application"), values: rawValues(formData) };
}
