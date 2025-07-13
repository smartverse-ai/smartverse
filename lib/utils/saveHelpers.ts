// lib/utils/saveHelpers.ts

import fs from "fs";
import PDFDocument from "pdfkit";
import { Document, Packer, Paragraph, TextRun } from "docx";

export async function saveAsTXT(text: string, filepath: string) {
  fs.writeFileSync(filepath, text);
}

export async function saveAsPDF(text: string, filepath: string) {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filepath));
  doc.font("Times-Roman").fontSize(12).text(text);
  doc.end();
}

export async function saveAsDOCX(text: string, filepath: string) {
  const paragraphs = text.split("\n").map((line) => new Paragraph(line));
  const doc = new Document({ sections: [{ properties: {}, children: paragraphs }] });
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(filepath, buffer);
}
