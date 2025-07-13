// lib/saveUtils.ts

import { writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

/**
 * حفظ ملف مرفوع مؤقتًا على الخادم (في /tmp)
 * @param file - ملف من FormData API
 * @param extension - الامتداد المطلوب مثل .mp3 أو .mp4
 * @returns المسار الكامل للملف المؤقت
 */
export async function saveTempFile(file: File, extension: string): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const filename = `${randomUUID()}${extension}`;
  const tempPath = path.join(process.cwd(), "tmp", filename);

  await writeFile(tempPath, buffer);

  return tempPath;
}
