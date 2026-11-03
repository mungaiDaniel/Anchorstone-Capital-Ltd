/** Appointment slots. TODO(client): confirm office hours — Mon–Fri, 09:00–16:30 assumed. */
export const BOOKING_TIMES = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00"] as const;
export const BOOKING_DAYS_AHEAD = 21;

const EAT_OFFSET_MS = 3 * 60 * 60 * 1000; // Nairobi is UTC+3 all year

const iso = (d: Date) => d.toISOString().slice(0, 10);

/** Bookable weekdays as YYYY-MM-DD in Nairobi time, starting tomorrow. */
export function bookableDates(now = new Date()): string[] {
  const today = new Date(now.getTime() + EAT_OFFSET_MS);
  const out: string[] = [];
  for (let i = 1; i <= BOOKING_DAYS_AHEAD; i++) {
    const d = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + i));
    if (d.getUTCDay() !== 0 && d.getUTCDay() !== 6) out.push(iso(d));
  }
  return out;
}

export function formatBookingDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
