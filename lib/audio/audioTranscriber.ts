import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { saveAsTXT } from "./saveAsTXT";
import { saveAsPDF } from "./saveAsPDF";
import { saveAsDOCX } from "./saveAsDOCX";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function transcribeAudio(filePath: string, fileName: string) {
  const fileStream = fs.createReadStream(filePath);
  
  const response = await openai.audio.transcriptions.create({
    file: fileStream,
    model: "whisper-1",
    language: "ar", // دعم اللغة العربية
    response_format: "text",
  });

  const text = response as string;

  // حفظ النص كملفات متعددة
  await saveAsTXT(text, fileName);
  await saveAsPDF(text, fileName);
  await saveAsDOCX(text, fileName);

  return text;
}
