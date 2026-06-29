import { jsPDF } from "jspdf";

export interface SpecPdfSection {
  label: string;
  content: string;
}

export function downloadSpecificationPdf(options: {
  title: string;
  subtitle?: string;
  sections: SpecPdfSection[];
  filename?: string;
}): void {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxWidth = pageWidth - margin * 2;
  let y = margin;

  const addLine = (text: string, fontSize: number, bold = false) => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    const lines = doc.splitTextToSize(text, maxWidth) as string[];
    for (const line of lines) {
      if (y > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += fontSize * 0.45;
    }
    y += 2;
  };

  addLine(options.title, 18, true);
  if (options.subtitle) addLine(options.subtitle, 11);
  y += 4;

  for (const section of options.sections) {
    addLine(section.label, 12, true);
    addLine(section.content, 10);
    y += 3;
  }

  doc.setFontSize(8);
  doc.setTextColor(120);
  doc.text(
    `Tamrix — ${new Date().toLocaleDateString("fr-FR")}`,
    margin,
    doc.internal.pageSize.getHeight() - 10
  );

  doc.save(options.filename ?? "cahier-des-charges-tamrix.pdf");
}
