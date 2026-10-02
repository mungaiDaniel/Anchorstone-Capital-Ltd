/**
 * ─── The ONLY place a loan application leaves the browser. ───
 *
 * Connect your backend by setting NEXT_PUBLIC_LOAN_APPLICATION_ENDPOINT (it receives a
 * multipart/form-data POST built by `toFormData` below), or replace the body of
 * `submitLoanApplication` with your own API call. Nothing is collected or stored until then
 * (see `postForm` for the dev / production behaviour).
 *
 * The data includes ID documents, financial statements and an M-Pesa statement password —
 * send it only over HTTPS to a backend that stores it securely.
 */
import { postForm, type SubmitResult } from "@/lib/forms/post";
import type { FileFieldKey, LoanApplication } from "./schema";

export type { SubmitResult };

export function submitLoanApplication(application: LoanApplication): Promise<SubmitResult> {
  return postForm(process.env.NEXT_PUBLIC_LOAN_APPLICATION_ENDPOINT, toFormData(application), {
    label: "apply",
    unavailableMessage: "Online applications are temporarily unavailable. Please try again later.",
  });
}

/** Flat multipart payload: text fields by name, files as repeated `<field>[]` entries. */
export function toFormData({ files, ...fields }: LoanApplication): FormData {
  const data = new FormData();
  Object.entries(fields).forEach(([key, value]) => data.append(key, String(value).trim()));
  (Object.keys(files) as FileFieldKey[]).forEach((key) =>
    files[key].forEach((file) => data.append(`${key}[]`, file, file.name)),
  );
  return data;
}
