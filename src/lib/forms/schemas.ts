import { z } from "zod";
import { contactTopics, lendingProducts, getProduct } from "@/content/site";

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

export const EMPLOYMENT_TYPES = ["Salaried employee", "Self-employed / business owner", "Student or sponsored", "Other"] as const;
export const HEARD_FROM = ["Referral from friend or family", "Social media", "Google search", "Radio / TV", "Walk-in", "Other"] as const;

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
    heardFrom: z.enum(HEARD_FROM, "Let us know how you heard about us."),
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
