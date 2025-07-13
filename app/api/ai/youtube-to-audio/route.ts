// 📍 app/api/ai/youtube-to-audio/route.ts

// 👉 إجبار التنفيذ على بيئة Node.js (وليس Edge)
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import path from "path";
import { randomUUID } from "crypto";
import ytdl from "ytdl-core";
import { mkdir } from "fs/promises";
import fs from "fs";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!url || !ytdl.validateURL(url)) {
      return NextResponse.json(
        { error: "❌ رابط YouTube غير صالح." },
        { status: 400 }
      );
    }

    const audioDir = path.join(process.cwd(), "public", "audios");
    await mkdir(audioDir, { recursive: true });

    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title
      .replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, "_")
      .slice(0, 50);
    const fileName = `${title}-${randomUUID()}.m4a`;
    const outputPath = path.join(audioDir, fileName);

    const readStream = ytdl(url, {
      filter: "audioonly",
      quality: "highestaudio",
      highWaterMark: 1 << 25,
    });
    const writeStream = fs.createWriteStream(outputPath);

    readStream.pipe(writeStream);

    writeStream.on("finish", () => {
      console.log("✅ حفظ الصوت:", fileName);
    });
    writeStream.on("error", (err) => {
      console.error("❌ خطأ في كتابة الملف:", err);
    });

    return NextResponse.json({ audioUrl: `/audios/${fileName}` });
  } catch (err: any) {
    console.error("❌ خطأ داخلي:", err);
    return NextResponse.json(
      { error: "⚠️ خطأ داخلي في الخادم. حاول لاحقًا." },
      { status: 500 }
    );
  }
}
