/**
 * Shared POST helper for the site's forms. Each form keeps its own `submit.ts`
 * (the one place its data leaves the browser) and calls this.
 *
 * With no endpoint configured nothing is sent:
 *   - development: submission is simulated locally
 *   - production:  the form shows `unavailableMessage`
 */
export type SubmitResult = { ok: true } | { ok: false; message: string };

export async function postForm(
  endpoint: string | undefined,
  body: FormData,
  { label, unavailableMessage }: { label: string; unavailableMessage: string },
): Promise<SubmitResult> {
  if (!endpoint) {
    if (process.env.NODE_ENV !== "production") {
      await new Promise((r) => setTimeout(r, 1200));
      console.info(`[${label}] No endpoint configured — simulated success. Nothing was sent.`);
      return { ok: true };
    }
    return { ok: false, message: unavailableMessage };
  }

  try {
    const res = await fetch(endpoint, { method: "POST", body });
    if (!res.ok) return { ok: false, message: "We couldn’t send your submission. Please try again." };
    return { ok: true };
  } catch {
    return { ok: false, message: "Network error — please check your connection and try again." };
  }
}
