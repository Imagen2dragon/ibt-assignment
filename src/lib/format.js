// Day 43 & Day 47: Intl formatting native to the browser
export const etb = new Intl.NumberFormat("en-ET", {
  style: "currency",
  currency: "ETB",
  maximumFractionDigits: 0,
});

export const when = new Intl.DateTimeFormat("en-ET", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Africa/Addis_Ababa", // EAT, UTC+3
});

export function formatETB(amount) {
  return etb.format(Number(amount) || 0);
}

export function formatAddisTime(isoDateString) {
  if (!isoDateString) return "";
  return when.format(new Date(isoDateString));
}
