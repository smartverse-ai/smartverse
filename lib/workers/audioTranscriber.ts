// lib/workers/audioTranscriber.ts

import fs from "fs";
import path from "path";
import { OpenAI } from "openai";
import { saveAsPDF, saveAsTXT, saveAsDOCX } from "../utils/saveHelpers";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function transcribeAudioWorker(payload: { filename: string }) {
  const { filename } = payload;

  const filepath = path.join(process.cwd(), "public/uploads", filename);

  const file = fs.createReadStream(filepath);

  const transcript = await openai.audio.transcriptions.create({
    file,
    model: "whisper-1",
    language: "auto",
    response_format: "text",
  });

  const text = transcript as string;

  const baseName = filename.replace(/\.[^/.]+$/, "");

  const outputDir = path.join(process.cwd(), "public/transcripts");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const filePathTXT = path.join(outputDir, `${baseName}.txt`);
  const filePathPDF = path.join(outputDir, `${baseName}.pdf`);
  const filePathDOCX = path.join(outputDir, `${baseName}.docx`);

  await Promise.all([
    saveAsTXT(text, filePathTXT),
    saveAsPDF(text, filePathPDF),
    saveAsDOCX(text, filePathDOCX),
  ]);

  console.log("✅ تم تفريغ الملف:", filename);
}
