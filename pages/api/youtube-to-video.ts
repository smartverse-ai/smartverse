import type { NextApiRequest, NextApiResponse } from "next";
import { mkdir } from "fs/promises";
import { randomUUID } from "crypto";
import path from "path";
import { execFile } from "child_process";
import fs from "fs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const url = req.query.url as string;
  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "❌ رابط غير صالح." });
  }

  try {
    const videoDir = path.join(process.cwd(), "public", "videos");
    await mkdir(videoDir, { recursive: true });

    const fileName = `yt-video-${randomUUID()}.mp4`;
    const outputPath = path.join(videoDir, fileName);

    const ytDlpPath = path.join(process.cwd(), "bin", "yt-dlp.exe");

    await new Promise<void>((resolve, reject) => {
      execFile(
        ytDlpPath,
        [
          "-f", "best[ext=mp4]/best",
          "-o", outputPath,
          url,
        ],
        (error, stdout, stderr) => {
          if (error) {
            console.error("❌ yt-dlp error:", error.message);
            console.error(stderr);
            return reject(new Error("⚠️ فشل تحميل الفيديو من YouTube."));
          }
          resolve();
        }
      );
    });

    if (!fs.existsSync(outputPath)) {
      return res.status(500).json({ error: "❌ لم يتم إنشاء ملف الفيديو." });
    }

    // ✅ Redirect to direct video URL for download
    const videoUrl = `/videos/${fileName}`;
    res.writeHead(302, { Location: videoUrl });
    res.end();

  } catch (err: any) {
    console.error("❌ Server error:", err.message || err);
    return res.status(500).json({ error: "⚠️ خطأ داخلي في الخادم." });
  }
}
