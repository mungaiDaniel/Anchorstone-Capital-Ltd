"use server";

import { contactTopics, getProduct, siteConfig } from "@/content/site";
import {
  applySchema,
  careersSchema,
  contactSchema,
  parseForm,
  partnerSchema,
  quickApplySchema,
  rawValues,
  validateCv,
  type FormState,
} from "@/lib/forms/schemas";
import { clientIp, rateLimited, sendToInbox } from "@/lib/forms/server";

const BUSY: FormState = {
  status: "error",
  message: "You’ve sent several submissions in a short time. Please wait a few minutes and try again.",
};
const UNAVAILABLE = (what: string): FormState => ({
  status: "error",
  message: `We couldn’t send your ${what} just now. Please try again, or call or email us directly.`,
});
const INVALID = "Please fix the highlighted fields.";

/** Bots fill the hidden field; pretend success so they learn nothing. */
const isBot = (fd: FormData) => String(fd.get("company_website") ?? "").trim() !== "";

const reference = (prefix = "ACL") => {
  const d = new Date();
  const ymd = `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}`;
  const rand = Array.from(crypto.getRandomValues(new Uint8Array(4)), (b) => b.toString(36).padStart(2, "0"))
    .join("")
    .slice(0, 5)
    .toUpperCase();
  return `${prefix}-${ymd}-${rand}`;
};

const kes = (n: number) => `KES ${n.toLocaleString("en-US")}`;

/* ───────────── Contact ───────────── */

export async function submitContact(_prev: FormState, formData: FormData): Promise<FormState> {
  if (isBot(formData)) return { status: "success" };
  if (rateLimited(`contact:${await clientIp()}`)) return BUSY;

  const parsed = parseForm(contactSchema, formData);
  if (!parsed.ok) return { status: "error", errors: parsed.errors, values: parsed.values, message: INVALID };

  const d = parsed.data;
  const topic = contactTopics.find((t) => t.value === d.topic)?.label ?? d.topic;
  const sent = await sendToInbox({
    subject: `Website enquiry — ${topic} — ${d.name}`,
    replyTo: d.email,
    text: ["New website enquiry", "", `Name:   ${d.name}`, `Phone:  ${d.phone}`, `Email:  ${d.email}`, `Topic:  ${topic}`, "", "Message:", d.message].join("\n"),
  });
  return sent.ok ? { status: "success" } : { ...UNAVAILABLE("message"), values: rawValues(formData) };
}

/* ───────────── Quick apply (modal + home card) ───────────── */

export async function submitQuickApply(_prev: FormState, formData: FormData): Promise<FormState> {
  if (isBot(formData)) return { status: "success", reference: reference("CB") };
  if (rateLimited(`quick:${await clientIp()}`)) return BUSY;

  const parsed = parseForm(quickApplySchema, formData);
  if (!parsed.ok) return { status: "error", errors: parsed.errors, values: parsed.values, message: INVALID };

  const d = parsed.data;
  const ref = reference("CB");
  const product = getProduct(d.product);
  const productLabel = product ? (product.isLoan ? product.name : "Insurance enquiry") : d.product;
  const sent = await sendToInbox({
    subject: `Call-back request ${ref} — ${productLabel} — ${d.name}`,
    replyTo: d.email || undefined,
    text: [
      `New call-back request  (${ref})`,
      "",
      `Name:           ${d.name}`,
      `Phone:          ${d.phone}`,
      `Email:          ${d.email || "—"}`,
      `Product:        ${productLabel}`,
      `Amount:         ${kes(d.amount)}`,
      `Best time:      ${d.contactTime}`,
      "Consent to be contacted: yes",
    ].join("\n"),
  });
  return sent.ok ? { status: "success", reference: ref } : { ...UNAVAILABLE("request"), values: rawValues(formData) };
}

/* ───────────── Full application ───────────── */

export async function submitApplication(_prev: FormState, formData: FormData): Promise<FormState> {
  if (isBot(formData)) return { status: "success", reference: reference() };
  if (rateLimited(`apply:${await clientIp()}`, 3)) return BUSY;

  const parsed = parseForm(applySchema, formData);
  if (!parsed.ok) return { status: "error", errors: parsed.errors, values: parsed.values, message: INVALID };

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
      `Name:           ${d.name}`,
      `National ID:    ${d.nationalId}`,
      `Phone:          ${d.phone}`,
      `Email:          ${d.email}`,
      `County:         ${d.county}`,
      `Employment:     ${d.employmentType}`,
      `Monthly income: ${d.incomeRange}`,
      "",
      "LOAN REQUEST",
      `Product:        ${product}`,
      `Amount:         ${kes(d.amount)}`,
      `Tenure:         ${d.tenure} month${d.tenure === 1 ? "" : "s"}`,
      "",
      "Consent to credit check: yes",
      "Privacy notice accepted: yes",
    ].join("\n"),
  });
  return sent.ok ? { status: "success", reference: ref } : { ...UNAVAILABLE("application"), values: rawValues(formData) };
}

/* ───────────── Partners ───────────── */

export async function submitPartner(_prev: FormState, formData: FormData): Promise<FormState> {
  if (isBot(formData)) return { status: "success" };
  if (rateLimited(`partner:${await clientIp()}`)) return BUSY;

  const parsed = parseForm(partnerSchema, formData);
  if (!parsed.ok) return { status: "error", errors: parsed.errors, values: parsed.values, message: INVALID };

  const d = parsed.data;
  const sent = await sendToInbox({
    subject: `Partnership enquiry — ${d.organisation} (${d.partnerType})`,
    replyTo: d.email,
    text: [
      "New partnership enquiry",
      "",
      `Organisation:  ${d.organisation}`,
      `Contact:       ${d.name}`,
      `Email:         ${d.email}`,
      `Phone:         ${d.phone}`,
      `Partner type:  ${d.partnerType}`,
      "",
      "Message:",
      d.message,
    ].join("\n"),
  });
  return sent.ok ? { status: "success" } : { ...UNAVAILABLE("enquiry"), values: rawValues(formData) };
}

/* ───────────── Careers (CV attached to the email; never stored) ───────────── */

export async function submitCareer(_prev: FormState, formData: FormData): Promise<FormState> {
  if (isBot(formData)) return { status: "success", reference: reference("CV") };
  if (rateLimited(`career:${await clientIp()}`, 3)) return BUSY;

  const parsed = parseForm(careersSchema, formData);
  const cv = formData.get("cv");
  const cvFile = cv instanceof File ? cv : null;
  const cvError = validateCv(cvFile);
  if (!parsed.ok || cvError) {
    return {
      status: "error",
      errors: { ...(parsed.ok ? {} : parsed.errors), ...(cvError ? { cv: cvError } : {}) },
      values: rawValues(formData),
      message: INVALID,
    };
  }

  const d = parsed.data;
  const ref = reference("CV");
  const file = cvFile as File;
  const content = Buffer.from(await file.arrayBuffer()).toString("base64");
  const sent = await sendToInbox({
    to: siteConfig.contact.careersEmail ?? siteConfig.contact.email.address,
    subject: `Job application ${ref} — ${d.area} — ${d.name}`,
    replyTo: d.email,
    attachments: [{ filename: file.name.replace(/[^\w.\- ]/g, "_"), content }],
    text: [
      `New job application  (${ref})`,
      "",
      `Name:      ${d.name}`,
      `Email:     ${d.email}`,
      `Phone:     ${d.phone}`,
      `Role/area: ${d.area}`,
      `LinkedIn:  ${d.linkedin || "—"}`,
      `CV:        attached (${file.name})`,
      "",
      "Cover note:",
      d.note || "—",
    ].join("\n"),
  });
  return sent.ok ? { status: "success", reference: ref } : { ...UNAVAILABLE("application"), values: rawValues(formData) };
}
