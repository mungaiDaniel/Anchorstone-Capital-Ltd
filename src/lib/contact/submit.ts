/**
 * ─── The ONLY place a contact message leaves the browser. ───
 * Set NEXT_PUBLIC_CONTACT_ENDPOINT (multipart/form-data POST) or replace this function.
 */
import { postForm, type SubmitResult } from "@/lib/forms/post";
import type { ContactMessage } from "./schema";

export function submitContactMessage(message: ContactMessage): Promise<SubmitResult> {
  const data = new FormData();
  Object.entries(message).forEach(([key, value]) => data.append(key, value.trim()));
  return postForm(process.env.NEXT_PUBLIC_CONTACT_ENDPOINT, data, {
    label: "contact",
    unavailableMessage: "Messages can’t be sent online right now — please call or email us instead.",
  });
}
