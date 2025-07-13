// 📍 /app/api/ai/audio-to-text/route.ts
import { NextRequest, NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import axios from "axios";
import { Document, Packer, Paragraph } from "docx";
import { v4 as uuidv4 } from "uuid";
import FormData from "form-data";
import puppeteer from "puppeteer";

export const config = {
  api: {
    bodyParser: false,
  },
};

const writeFile = promisify(fs.writeFile);

async function parseForm(req: NextRequest): Promise<string> {
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  fs.mkdirSync(uploadDir, { recursive: true });

  const form = formidable({
    multiples: false,
    uploadDir,
    keepExtensions: true,
  });

  return new Promise((resolve, reject) => {
    form.parse(req as any, (err, fields, files) => {
      if (err) return reject(err);
      const file = Array.isArray(files.file) ? files.file[0] : files.file;
      if (!file || !file.newFilename) return reject("لم يتم رفع الملف.");
      resolve(path.join(uploadDir, file.newFilename));
    });
  });
}

export async function POST(req: NextRequest) {
  try {
    const filePath = await parseForm(req);
    const uniqueId = uuidv4();

    const formData = new FormData();
    formData.append("file", fs.createReadStream(filePath));

    const response = await axios.post("http://127.0.0.1:8000/transcribe", formData, {
      headers: formData.getHeaders(),
    });

    const transcript = response.data.text;
    const generatedDir = path.join(process.cwd(), "public", "generated");
    fs.mkdirSync(generatedDir, { recursive: true });

    // 1. TXT
    const txtFilename = `audio-${uniqueId}.txt`;
    await writeFile(path.join(generatedDir, txtFilename), transcript, "utf8");

    // 2. DOCX
    const doc = new Document({
      sections: [{ children: [new Paragraph(transcript)] }],
    });
    const buffer = await Packer.toBuffer(doc);
    const docxFilename = `audio-${uniqueId}.docx`;
    await writeFile(path.join(generatedDir, docxFilename), buffer);

    // 3. PDF باستخدام Puppeteer
    const htmlContent = `
      <html dir="rtl" lang="ar">
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 2rem;
              line-height: 1.8;
              white-space: pre-wrap;
              direction: rtl;
              text-align: right;
              font-size: 16px;
            }
          </style>
        </head>
        <body>${transcript}</body>
      </html>
    `;

    const pdfFilename = `audio-${uniqueId}.pdf`;
    const pdfPath = path.join(generatedDir, pdfFilename);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });
    await page.pdf({ path: pdfPath, format: "A4" });
    await browser.close();

    // حذف الملف الصوتي الأصلي
    fs.unlinkSync(filePath);

    return NextResponse.json({
      text: transcript,
      downloads: {
        txt: `/generated/${txtFilename}`,
        docx: `/generated/${docxFilename}`,
        pdf: `/generated/${pdfFilename}`,
      },
    });
  } catch (err: any) {
    console.error("❌ Whisper error:", err.message || err);
    return NextResponse.json(
      {
        error: "حدث خطأ أثناء التفريغ",
        details: err.message || "غير معروف",
      },
      { status: 500 }
    );
  }
}
