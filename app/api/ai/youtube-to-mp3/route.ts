// 📍 app/api/ai/youtube-to-mp3/route.ts

import { NextRequest } from "next/server";
import path from "path";
import { randomUUID } from "crypto";
import ytdl from "ytdl-core";
import ffmpeg from "fluent-ffmpeg";
import { mkdir } from "fs/promises";

ffmpeg.setFfmpegPath("C:\\ffmpeg\\bin\\ffmpeg.exe");

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const { url } = await req.json();

    if (!url || !ytdl.validateURL(url)) {
      return Response.json(
        { error: "❌ رابط YouTube غير صالح. يرجى التحقق." },
        { status: 400 }
      );
    }

    const audioDir = path.join(process.cwd(), "public", "audios");
    await mkdir(audioDir, { recursive: true });

    const info = await ytdl.getInfo(url);
    const safeTitle = info.videoDetails.title
      .replace(/[^a-zA-Z0-9_\u0600-\u06FF]/g, "_")
      .slice(0, 50);

    const fileName = `${safeTitle}-${randomUUID()}.mp3`;
    const outputPath = path.join(audioDir, fileName);
    const audioUrl = `/audios/${fileName}`;

    return await new Promise<Response>((resolve) => {
      const stream = ytdl(url, {
        quality: "highestaudio",
        filter: "audioonly",
        highWaterMark: 1 << 25,
      });

      ffmpeg(stream)
        .audioBitrate(128)
        .format("mp3")
        .on("end", () => {
          resolve(
            Response.json({
              success: true,
              audioUrl,
              message: "✅ تم تحويل الفيديو بنجاح.",
            })
          );
        })
        .on("error", (err) => {
          console.error("❌ خطأ في ffmpeg:", err.message);
          resolve(
            Response.json(
              {
                success: false,
                error: "فشل تحويل رابط YouTube إلى صوت",
              },
              { status: 500 }
            )
          );
        })
        .save(outputPath);
    });
  } catch (err: any) {
    console.error("❌ خطأ في السيرفر:", err);
    return Response.json(
      { error: "حدث خطأ غير متوقع في الخادم" },
      { status: 500 }
    );
  }
}
