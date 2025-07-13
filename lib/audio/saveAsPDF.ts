import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

export async function saveAsPDF(text: string, fileName: string) {
  const outputPath = path.join("public", "transcripts", `${fileName}.pdf`);
  const doc = new PDFDocument();
  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);
  doc.font("Times-Roman").fontSize(12).text(text, { align: "right" });
  doc.end();
}
