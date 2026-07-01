/** Strip CR/LF and control chars from email subject lines (header injection). */
export function sanitizeEmailSubject(value: string, maxLen = 200): string {
  return value
    .replace(/[\r\n\0]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLen);
}

/** Mitigate CSV / Excel formula injection when cells are opened in a spreadsheet. */
export function sanitizeCsvCell(value: string): string {
  const normalized = value.replace(/\r?\n/g, " ");
  if (/^[=+\-@\t\r]/.test(normalized)) {
    return `'${normalized}`;
  }
  return normalized;
}
