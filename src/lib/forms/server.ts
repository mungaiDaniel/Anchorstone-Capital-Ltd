import { headers } from "next/headers";
import { siteConfig } from "@/content/site";

/** Best-effort client IP for rate limiting (Vercel sets x-forwarded-for). */
export async function clientIp(): Promise<string> {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

/* Basic in-memory rate limit. Per server instance only — fine as a first line of defence;
   move to a shared store (e.g. Upstash/Vercel KV) if abuse appears. */
const hits = new Map<string, number[]>();

export function rateLimited(key: string, limit = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (v.every((t) => now - t >= windowMs)) hits.delete(k);
  return false;
}

export type SendResult = { ok: true } | { ok: false };

/**
 * Emails the Anchorstone inbox through Resend's REST API.
 * Env: RESEND_API_KEY (required in production), RESEND_FROM (optional, a verified sender).
 * With no key: the submission is logged and treated as sent in development only.
 */
export interface Attachment {
  filename: string;
  /** base64 */
  content: string;
}

export async function sendToInbox({
  subject,
  text,
  replyTo,
  to = siteConfig.contact.email.address,
  attachments,
}: {
  subject: string;
  text: string;
  replyTo?: string;
  to?: string;
  attachments?: Attachment[];
}): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[email] RESEND_API_KEY not set — logging instead of sending.\nSubject: ${subject}\n${text}`);
      return { ok: true };
    }
    console.error("[email] RESEND_API_KEY is not set; submission could not be sent.");
    return { ok: false };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.RESEND_FROM ?? `${siteConfig.shortName} Website <onboarding@resend.dev>`,
        to: [to],
        subject,
        text,
        ...(replyTo ? { reply_to: replyTo } : {}),
        ...(attachments?.length ? { attachments } : {}),
      }),
    });
    if (!res.ok) {
      console.error(`[email] Resend responded ${res.status}: ${await res.text()}`);
      return { ok: false };
    }
    return { ok: true };
  } catch (err) {
    console.error("[email] Resend request failed", err);
    return { ok: false };
  }
}
