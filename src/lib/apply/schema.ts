/**
 * Loan application form — fields, rules and validation.
 * Fields, labels and required flags mirror the original site's WPForms form (#289).
 */
import { calculatorConfig } from "@/lib/loan-calculator";

export const employmentStatuses = ["Employed", "Business Owner"] as const;
export type EmploymentStatus = (typeof employmentStatuses)[number];

export type FileFieldKey = "idDocument" | "photo" | "payslips" | "bankStatement" | "mpesaStatement";

export type LoanApplication = {
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  phone: string;
  employmentStatus: EmploymentStatus | "";
  employerName: string;
  jobTitle: string;
  workLocation: string;
  buildingFloor: string;
  loanAmount: string;
  mpesaPassword: string;
  referrerName: string;
  files: Record<FileFieldKey, File[]>;
};

export type FieldKey = Exclude<keyof LoanApplication, "files"> | FileFieldKey;
export type FormErrors = Partial<Record<FieldKey, string>>;

// TODO(client): the original uploader allowed 256 MB per file — confirm a sensible limit.
export const MAX_FILE_MB = 10;

type Ext = "pdf" | "jpg" | "png";
const mimeByExt: Record<Ext, string[]> = {
  pdf: ["application/pdf"],
  jpg: ["image/jpeg"],
  png: ["image/png"],
};

export const fileFields: Record<
  FileFieldKey,
  { label: string; hint: string; types: Ext[]; maxFiles: number; required: boolean }
> = {
  idDocument: {
    label: "Copy of ID (front and back)",
    hint: "PDF, JPG or PNG · up to 2 files",
    types: ["pdf", "jpg", "png"],
    maxFiles: 2,
    required: true,
  },
  photo: {
    label: "Upload Passport Size Photo / Selfie",
    hint: "JPEG, PNG or PDF · 1 file",
    types: ["jpg", "png", "pdf"],
    maxFiles: 1,
    required: true,
  },
  payslips: {
    label: "Upload Payslip (last 3 months)",
    hint: "PDF · up to 3 files",
    types: ["pdf"],
    maxFiles: 3,
    required: true,
  },
  bankStatement: {
    label: "Upload Bank Statement (last 6 months)",
    hint: "PDF · 1 file",
    types: ["pdf"],
    maxFiles: 1,
    required: true,
  },
  mpesaStatement: {
    label: "Upload M-Pesa Statement (last 12 months)",
    hint: "PDF · 1 file",
    types: ["pdf"],
    maxFiles: 1,
    required: true,
  },
};

export const acceptAttr = (types: Ext[]) =>
  types.flatMap((t) => [`.${t}`, ...(t === "jpg" ? [".jpeg"] : []), ...mimeByExt[t]]).join(",");

/** Required text fields — the same set the original form marked as required. */
export const requiredFields: FieldKey[] = [
  "firstName",
  "lastName",
  "email",
  "idDocument",
  "photo",
  "payslips",
  "bankStatement",
  "mpesaStatement",
  "mpesaPassword",
  "referrerName",
];

export const emptyApplication = (loanAmount = ""): LoanApplication => ({
  firstName: "",
  lastName: "",
  email: "",
  location: "",
  phone: "",
  employmentStatus: "",
  employerName: "",
  jobTitle: "",
  workLocation: "",
  buildingFloor: "",
  loanAmount,
  mpesaPassword: "",
  referrerName: "",
  files: { idDocument: [], photo: [], payslips: [], bankStatement: [], mpesaStatement: [] },
});

// Messages reuse the original form's wording where it had one.
const REQUIRED = "This field is required.";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Kenyan mobile: 07xx / 01xx, or +254 / 254 followed by 7xx / 1xx.
const PHONE_RE = /^(?:0|\+?254)(?:7|1)\d{8}$/;

const extOf = (name: string) => {
  const e = name.split(".").pop()?.toLowerCase() ?? "";
  return (e === "jpeg" ? "jpg" : e) as Ext;
};

function validateFiles(key: FileFieldKey, files: File[]): string | undefined {
  const rule = fileFields[key];
  if (rule.required && files.length === 0) return "Please upload this document.";
  if (files.length > rule.maxFiles)
    return `You can upload up to ${rule.maxFiles} file${rule.maxFiles > 1 ? "s" : ""}.`;
  for (const f of files) {
    const ext = extOf(f.name);
    const typeOk = rule.types.includes(ext) || rule.types.some((t) => mimeByExt[t].includes(f.type));
    if (!typeOk) return `“${f.name}” isn’t an accepted file type.`;
    if (f.size > MAX_FILE_MB * 1024 * 1024) return `“${f.name}” is larger than ${MAX_FILE_MB} MB.`;
  }
}

export function validateApplication(v: LoanApplication): FormErrors {
  const errors: FormErrors = {};
  const req = (key: Exclude<FieldKey, FileFieldKey>) => {
    if (!String(v[key]).trim()) errors[key] = REQUIRED;
  };

  req("firstName");
  req("lastName");
  req("email");
  if (!errors.email && !EMAIL_RE.test(v.email.trim())) errors.email = "Please enter a valid email address.";

  const phone = v.phone.replace(/[\s-]/g, "");
  if (phone && !PHONE_RE.test(phone)) errors.phone = "Enter a valid Kenyan phone number, e.g. 0712 345 678.";

  if (v.loanAmount.trim()) {
    const n = Number(v.loanAmount.replace(/[,\s]/g, ""));
    const { min, max } = calculatorConfig.amount;
    if (!Number.isFinite(n) || n < min || n > max)
      errors.loanAmount = `Amount must be between ${min.toLocaleString("en-KE")} and ${max.toLocaleString("en-KE")}.`;
  }

  req("mpesaPassword");
  req("referrerName");

  (Object.keys(fileFields) as FileFieldKey[]).forEach((key) => {
    const msg = validateFiles(key, v.files[key]);
    if (msg) errors[key] = msg;
  });

  return errors;
}
