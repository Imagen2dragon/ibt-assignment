// Day 47: Export data cleanly
export function toCsv(rows) {
  if (!rows || rows.length === 0) return "";
  const cell = (v) => {
    const s = String(v ?? "");
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [Object.keys(rows[0]), ...rows.map(Object.values)]
    .map((r) => r.map(cell).join(","))
    .join("\n");
}

export function downloadCsv(text, filename) {
  const blob = new Blob([text], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
