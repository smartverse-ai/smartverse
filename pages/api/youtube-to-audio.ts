import type { NextApiRequest, NextApiResponse } from "next";
import { mkdir } from "fs/promises";
import { randomUUID } from "crypto";
import path from "path";
import { execFile } from "child_process";
import fs from "fs";

type Data = { audioUrl?: string; error?: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url } = req.body;
  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "❌ رابط غير صالح." });
  }

  try {
    const audioDir = path.join(process.cwd(), "public", "audios");
    await mkdir(audioDir, { recursive: true });

    const fileName = `yt-audio-${randomUUID()}.mp3`;
    const outputPath = path.join(audioDir, fileName);

    const ytDlpPath = path.join(process.cwd(), "bin", "yt-dlp.exe");

    await new Promise<void>((resolve, reject) => {
      execFile(
        ytDlpPath,
        [
          "-x",
          "--audio-format", "mp3",
          "-o", outputPath,
          url
        ],
        (error, stdout, stderr) => {
          if (error) {
            console.error("❌ yt-dlp error:", error.message);
            console.error(stderr);
            return reject(new Error("⚠️ فشل التحميل من YouTube."));
          }
          resolve();
        }
      );
    });

    if (!fs.existsSync(outputPath)) {
      return res.status(500).json({ error: "❌ لم يتم إنشاء ملف الصوت." });
    }

    return res.status(200).json({ audioUrl: `/audios/${fileName}` });

  } catch (err: any) {
    console.error("❌ Server error:", err.message || err);
    return res.status(500).json({ error: "⚠️ خطأ داخلي في الخادم." });
  }
}
