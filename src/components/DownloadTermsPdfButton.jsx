import { useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import Icon from "./Icon";

/**
 * Builds a real PDF in the browser from the terms sections and triggers
 * a download — no server involved, since the content is already static
 * text we have on the client. Uses pdf-lib (runs in any JS environment,
 * including browsers) rather than a Python tool, since this needs to
 * work on-demand for every site visitor, not generate one file ahead
 * of time.
 *
 * Takes `sections` (same shape TermsContent renders from) so this
 * stays in sync with the on-page content automatically — there's no
 * separate hardcoded copy of the text to drift out of date.
 */
export default function DownloadTermsPdfButton({ title, lastUpdated, sections }) {
  const [generating, setGenerating] = useState(false);

  const handleDownload = async () => {
    setGenerating(true);
    try {
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const pageWidth = 595;
      const pageHeight = 842;
      const margin = 50;
      const maxWidth = pageWidth - margin * 2;

      let page = pdfDoc.addPage([pageWidth, pageHeight]);
      let y = pageHeight - margin;

      const ensureSpace = (lineHeight) => {
        if (y < margin + lineHeight) {
          page = pdfDoc.addPage([pageWidth, pageHeight]);
          y = pageHeight - margin;
        }
      };

      // Wraps a string to fit maxWidth, returning an array of lines —
      // pdf-lib has no built-in text wrapping, so this measures each
      // word with the actual font/size before deciding where to break.
      const wrapText = (text, size, useFont) => {
        const words = text.split(" ");
        const lines = [];
        let current = "";
        for (const word of words) {
          const test = current ? `${current} ${word}` : word;
          if (useFont.widthOfTextAtSize(test, size) > maxWidth && current) {
            lines.push(current);
            current = word;
          } else {
            current = test;
          }
        }
        if (current) lines.push(current);
        return lines;
      };

      const drawParagraph = (text, { size = 11, useFont = font, lineGap = 16, color = rgb(0.25, 0.25, 0.25) } = {}) => {
        const lines = wrapText(text, size, useFont);
        for (const line of lines) {
          ensureSpace(lineGap);
          page.drawText(line, { x: margin, y, size, font: useFont, color });
          y -= lineGap;
        }
      };

      // Title
      drawParagraph(title, { size: 22, useFont: boldFont, lineGap: 28, color: rgb(0, 0.32, 0.22) });
      drawParagraph(`Last updated: ${lastUpdated}`, { size: 10, color: rgb(0.4, 0.4, 0.4) });
      y -= 10;

      sections.forEach((section, index) => {
        ensureSpace(30);
        drawParagraph(`${index + 1}. ${section.label}`, {
          size: 14,
          useFont: boldFont,
          lineGap: 20,
          color: rgb(0, 0.32, 0.22),
        });
        section.paragraphs.forEach((paragraph) => {
          drawParagraph(paragraph, { size: 10.5, lineGap: 15 });
          y -= 4;
        });
        y -= 12;
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "KCEE-Terms-of-Service.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF generation failed:", error);
      // TODO: surface a user-facing error toast once a notification system exists
    } finally {
      setGenerating(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={generating}
      className="px-6 py-2 bg-primary text-white font-bold rounded-full hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center gap-2"
    >
      {generating && <Icon name="progress_activity" className="animate-spin text-lg" />}
      {generating ? "Generating..." : "Download PDF"}
    </button>
  );
}
