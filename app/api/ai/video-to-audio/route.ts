// 📍 app/api/ai/video-to-audio/route.ts

import { writeFile, mkdir, unlink, readdir, stat } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';

// 🛠️ تعيين المسار الكامل لـ ffmpeg
ffmpeg.setFfmpegPath(
  'C:\\smartverse-enhanced\\node_modules\\ffmpeg-static\\ffmpeg.exe'
);

// 🧹 تنظيف الملفات الأقدم من مدة محددة
async function cleanOldFiles(dir: string, maxAgeMinutes = 60) {
  try {
    const files = await readdir(dir);
    const now = Date.now();

    await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(dir, file);
        const stats = await stat(filePath);
        const ageMinutes = (now - stats.mtimeMs) / 1000 / 60;

        if (ageMinutes > maxAgeMinutes) {
          await unlink(filePath).catch(() => {});
        }
      })
    );
  } catch (e) {
    console.warn('⚠️ فشل تنظيف الملفات القديمة:', e);
  }
}

export async function POST(req: Request) {
  const contentType = req.headers.get('content-type') || '';
  if (!contentType.includes('multipart/form-data')) {
    return NextResponse.json(
      { error: '❌ نوع المحتوى غير مدعوم. يجب أن يكون Multipart.' },
      { status: 400 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: '⚠️ لم يتم إرسال أي ملف.' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    const audioDir = path.join(process.cwd(), 'public', 'audios');

    await mkdir(uploadsDir, { recursive: true });
    await mkdir(audioDir, { recursive: true });

    // 🧹 تنظيف الملفات القديمة قبل البدء
    await Promise.all([
      cleanOldFiles(uploadsDir),
      cleanOldFiles(audioDir),
    ]);

    const uniqueId = randomUUID();
    const inputFileName = `${uniqueId}-${file.name}`;
    const outputFileName = `${uniqueId}.mp3`;

    const inputPath = path.join(uploadsDir, inputFileName);
    const outputPath = path.join(audioDir, outputFileName);

    // 💾 كتابة ملف الفيديو المؤقت
    await writeFile(inputPath, buffer);

    return new Promise((resolve) => {
      ffmpeg(inputPath)
        .audioCodec('libmp3lame')
        .audioBitrate(128)
        .format('mp3')
        .on('end', async () => {
          await unlink(inputPath).catch(console.warn);

          const audioUrl = `/audios/${outputFileName}`;
          resolve(NextResponse.json({ audioUrl }));
        })
        .on('error', async (err) => {
          console.error('❌ فشل التحويل:', err.message);
          await unlink(inputPath).catch(() => {});
          resolve(
            NextResponse.json(
              {
                error:
                  'فشل تحويل الملف. تأكد من أن تنسيق الفيديو مدعوم مثل MP4 أو MOV أو MKV.',
              },
              { status: 500 }
            )
          );
        })
        .save(outputPath); // ✅ مباشرة حفظ الملف الناتج
    });
  } catch (error) {
    console.error('❌ خطأ عام في السيرفر:', error);
    return NextResponse.json(
      { error: 'حدث خطأ غير متوقع في السيرفر.' },
      { status: 500 }
    );
  }
}
