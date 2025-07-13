// lib/ffmpeg.ts

import ffmpegPath from "ffmpeg-static";
import ffmpeg from "fluent-ffmpeg";
import path from "path";
import fs from "fs/promises";

// ضبط مسار ffmpeg لاستخدام النسخة الثابتة
ffmpeg.setFfmpegPath(ffmpegPath || "");

/**
 * تحويل فيديو إلى صوت بصيغة MP3
 * @param inputPath - المسار المؤقت لملف الفيديو
 * @returns مسار ملف الصوت الناتج
 */
export async function convertVideoToAudio(inputPath: string): Promise<string> {
  const outputPath = inputPath.replace(path.extname(inputPath), ".mp3");

  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .toFormat("mp3")
      .on("end", () => resolve(outputPath))
      .on("error", (err) => reject(err))
      .save(outputPath);
  });
}
