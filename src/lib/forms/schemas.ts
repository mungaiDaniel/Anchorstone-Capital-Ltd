import { z } from "zod";
import { contactTimes, contactTopics, getProduct, lendingProducts, products, TALENT_POOL, partnerPitch, careers } from "@/content/site";

/** Shared between the browser (instant feedback) and the server actions (the real check). */

export type FormErrors = Record<string, string>;
export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: FormErrors;
  /** Echoed back so the form keeps what the visitor typed after a failed submit. */
  values?: Record<string, string>;
  reference?: string;
};
export const initialFormState: FormState = { status: "idle" };

// Kenyan mobile: 07xx / 01xx, or +254 / 254 followed by 7xx / 1xx.
const PHONE_RE = /^(?:0|\+?254)[17]\d{8}$/;
const phone = z
  .string()
  .trim()
  .min(1, "Enter your phone number.")
  .transform((v) => v.replace(/[\s-]/g, ""))
  .refine((v) => PHONE_RE.test(v), "Enter a valid Kenyan phone number, e.g. 0712 345 678 or +254 712 345 678.");

const email = z.string().trim().min(1, "Enter your email address.").pipe(z.email("Enter a valid email address."));
const fullName = z.string().trim().min(2, "Enter your full name.").max(120, "That name is too long.");

const checked = (message: string) =>
  z.string(message).refine((v) => v === "on" || v === "true", message);

export const contactSchema = z.object({
  name: fullName,
  phone,
  email,
  topic: z.enum(contactTopics.map((t) => t.value) as [string, ...string[]], "Choose a topic."),
  message: z.string().trim().min(10, "Please tell us a little more (at least 10 characters).").max(5000, "Please keep your message under 5,000 characters."),
  consent: checked("Please agree so we can contact you about your enquiry."),
});

export const INCOME_RANGES = ["Below KES 30,000", "KES 30,000 – 60,000", "KES 60,000 – 100,000", "KES 100,000 – 200,000", "Above KES 200,000"] as const;
export const EMPLOYMENT_TYPES = ["Salaried employee", "Self-employed / business owner", "Student or sponsored", "Other"] as const;

export const COUNTIES = [
  "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo-Marakwet", "Embu", "Garissa", "Homa Bay", "Isiolo", "Kajiado",
  "Kakamega", "Kericho", "Kiambu", "Kilifi", "Kirinyaga", "Kisii", "Kisumu", "Kitui", "Kwale", "Laikipia", "Lamu",
  "Machakos", "Makueni", "Mandera", "Marsabit", "Meru", "Migori", "Mombasa", "Murang'a", "Nairobi", "Nakuru",
  "Nandi", "Narok", "Nyamira", "Nyandarua", "Nyeri", "Samburu", "Siaya", "Taita-Taveta", "Tana River", "Tharaka-Nithi",
  "Trans Nzoia", "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot",
] as const;

/** Tenure ceiling for products with no stated cap. TODO(client): confirm for Study Abroad. */
export const DEFAULT_MAX_TENURE = 60;

const productSlugs = lendingProducts.map((p) => p.slug) as [string, ...string[]];

export const applySchema = z
  .object({
    name: fullName,
    nationalId: z
      .string()
      .trim()
      .regex(/^\d{6,10}$/, "Enter your National ID number (6–10 digits)."),
    phone,
    email,
    product: z.enum(productSlugs, "Choose a product."),
    amount: z.coerce
      .number("Enter the amount you need.")
      .int("Enter a whole number.")
      .min(1_000, "The minimum amount is KES 1,000."),
    tenure: z.coerce.number("Enter a repayment period in months.").int("Enter a whole number of months.").min(1, "Choose at least 1 month."),
    employmentType: z.enum(EMPLOYMENT_TYPES, "Choose an option."),
    county: z.enum(COUNTIES, "Choose your county."),
    incomeRange: z.enum(INCOME_RANGES, "Choose an income range."),
    consentCredit: checked("We need your consent to run a credit check."),
    consentPrivacy: checked("Please accept the privacy notice."),
  })
  .superRefine((v, ctx) => {
    const p = getProduct(v.product);
    if (p?.maxAmount && v.amount > p.maxAmount) {
      ctx.addIssue({
        code: "custom",
        path: ["amount"],
        message: `The maximum for the ${p.name} is KES ${p.maxAmount.toLocaleString("en-US")}.`,
      });
    }
    const maxTenure = p?.maxTenureMonths ?? DEFAULT_MAX_TENURE;
    if (v.tenure > maxTenure) {
      ctx.addIssue({ code: "custom", path: ["tenure"], message: `The maximum repayment period is ${maxTenure} months.` });
    }
  });

export function rawValues(formData: FormData): Record<string, string> {
  const raw: Record<string, string> = {};
  formData.forEach((v, k) => {
    if (typeof v === "string") raw[k] = v;
  });
  return raw;
}

/** Runs a schema over FormData; returns typed data or a flat { field: message } map. */
export function parseForm<S extends z.ZodType>(
  schema: S,
  formData: FormData,
): { ok: true; data: z.output<S> } | { ok: false; errors: FormErrors; values: Record<string, string> } {
  const raw = rawValues(formData);
  const result = schema.safeParse(raw);
  if (result.success) return { ok: true, data: result.data };
  const errors: FormErrors = {};
  for (const issue of result.error.issues) {
    const key = String(issue.path[0] ?? "form");
    errors[key] ??= issue.message;
  }
  return { ok: false, errors, values: raw };
}

/* ── Quick apply (modal + home card): a call-back request ── */
const quickProducts = [...lendingProducts.map((p) => p.slug), "insurance"] as unknown as [string, ...string[]];
export const quickApplySchema = z.object({
  name: fullName,
  phone,
  amount: z.coerce.number("Enter the amount you need.").int("Enter a whole number.").min(1_000, "The minimum amount is KES 1,000.").max(50_000_000, "Please enter a smaller amount."),
  product: z.enum(quickProducts, "Choose a product."),
  contactTime: z.enum(contactTimes, "Choose a preferred time."),
  email: z.string().trim().refine((v) => v === "" || z.email().safeParse(v).success, "Enter a valid email address."),
  consent: checked("Please agree so we can contact you."),
}).superRefine((v, ctx) => {
  const p = getProduct(v.product);
  if (p?.maxAmount && v.amount > p.maxAmount) {
    ctx.addIssue({ code: "custom", path: ["amount"], message: `The maximum for the ${p.name} is KES ${p.maxAmount.toLocaleString("en-US")}.` });
  }
});

/* ── Partners ── */
export const PARTNER_TYPES = partnerPitch.types.map((t) => t.title) as [string, ...string[]];
export const partnerSchema = z.object({
  organisation: z.string().trim().min(2, "Enter your organisation’s name.").max(160),
  name: fullName,
  email,
  phone,
  partnerType: z.enum(PARTNER_TYPES, "Choose a partner type."),
  message: z.string().trim().min(10, "Please tell us a little more (at least 10 characters).").max(3000, "Please keep it under 3,000 characters."),
  consent: checked("Please agree so we can contact you."),
});

/* ── Careers ── */
export const CV_MAX_BYTES = 5 * 1024 * 1024;
export const CV_TYPES: Record<string, string> = {
  pdf: "application/pdf",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};
export const careerAreas = [...careers.roles.map((r) => r.title), TALENT_POOL];
export const careersSchema = z.object({
  name: fullName,
  email,
  phone,
  area: z.string().refine((v) => careerAreas.includes(v), "Choose a role or area of interest."),
  linkedin: z.string().trim().refine((v) => v === "" || /^https?:\/\/(www\.)?linkedin\.com\/.+/i.test(v), "Enter a full LinkedIn URL, e.g. https://www.linkedin.com/in/yourname."),
  note: z.string().trim().max(1_000, "Please keep your note under 1,000 characters."),
  consent: checked("Please agree to our privacy notice so we can process your application."),
});

/** Validates a CV upload (shared by browser and server). Returns an error message or undefined. */
export function validateCv(file: File | null | undefined): string | undefined {
  if (!file || file.size === 0) return "Attach your CV (PDF or DOCX).";
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!(ext in CV_TYPES)) return "Your CV must be a PDF or DOCX file.";
  if (file.size > CV_MAX_BYTES) return "Your CV must be 5 MB or smaller.";
}

/** Product options for call-back forms: lending products + insurance enquiry. */
export const quickProductOptions = [...lendingProducts, ...products.filter((p) => !p.isLoan)].map((p) => ({
  value: p.slug,
  label: p.isLoan ? p.name : "Insurance enquiry",
}));
