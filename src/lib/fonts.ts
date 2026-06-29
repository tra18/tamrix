/** Apple.com-style system font stack (SF Pro on Apple devices). */
export const fontFamilySans = [
  "-apple-system",
  "BlinkMacSystemFont",
  '"SF Pro Text"',
  '"SF Pro Display"',
  '"Segoe UI"',
  "Roboto",
  '"Helvetica Neue"',
  "Helvetica",
  "Arial",
  "sans-serif",
] as const;

export const fontFamilyCss = fontFamilySans.join(", ");

export function wrapEmailBody(innerHtml: string): string {
  return `<div style="font-family: ${fontFamilyCss}; -webkit-font-smoothing: antialiased; line-height: 1.47059;">${innerHtml}</div>`;
}
