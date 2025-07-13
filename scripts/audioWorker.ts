// 📍 المسار: scripts/audioWorker.ts

require("dotenv").config(); // تحميل متغيرات البيئة

import fs from "fs";
import path from "path";
import fetch from "node-fetch"; // لإرسال الطلبات خارج المتصفح
import { OpenAI } from "openai";
import { v4 as uuidv4 } from "uuid";
import { saveAsTXT, saveAsPDF, saveAsDOCX } from "../lib/saveUtils";

// ✅ متغيرات البيئة
const QSTASH_TOKEN = process.env.QSTASH_TOKEN!;
const QUEUE_NAME = process.env.QSTASH_QUEUE_NAME!;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
const BASE_URL = "https://qstash.upstash.io/v2";

// 🛑 التحقق من المتغيرات الأساسية
if (!QSTASH_TOKEN || !QUEUE_NAME || !OPENAI_API_KEY) {
  console.error("❌ تأكد من وجود QSTASH_TOKEN و QSTASH_QUEUE_NAME و OPENAI_API_KEY في ملف .env.local");
  process.exit(1);
}

// 🎯 إعداد OpenAI
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

// 🎧 دالة تفريغ الصوت
async function transcribeAudio(filepath: string): Promise<string> {
  const file = fs.createReadStream(filepath);
  const transcription = await openai.audio.transcriptions.create({
    file,
    model: "whisper-1",
    language: "auto",
    response_format: "text",
  });
  return transcription;
}

// 📥 معالجة قائمة الانتظار
async function processJobs() {
  console.log("📥 جاري فحص قائمة الانتظار...");

  const res = await fetch(`${BASE_URL}/queues/${QUEUE_NAME}/receive`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${QSTASH_TOKEN}`,
    },
  });

  if (!res.ok) {
    console.warn("⚠️ لم يتم استلام مهام من QStash.");
    return;
  }

  const jobs = await res.json();

  if (!Array.isArray(jobs) || jobs.length === 0) {
    console.log("✅ لا توجد مهام حالياً.");
    return;
  }

  for (const job of jobs) {
    try {
      const body = JSON.parse(job.body);
      const filepath = body?.filepath;

      if (!filepath || !fs.existsSync(filepath)) {
        throw new Error("⚠️ الملف غير موجود أو غير صالح.");
      }

      console.log("🎧 تفريغ الملف:", filepath);
      const result = await transcribeAudio(filepath);

      const id = uuidv4();
      const outputDir = path.join(process.cwd(), "public", "transcripts");
      const basePath = path.join(outputDir, id);
      fs.mkdirSync(outputDir, { recursive: true });

      await saveAsTXT(result, `${basePath}.txt`);
      await saveAsPDF(result, `${basePath}.pdf`);
      await saveAsDOCX(result, `${basePath}.docx`);

      console.log(`✅ تم الحفظ بنجاح في:
  /transcripts/${id}.txt
  /transcripts/${id}.pdf
  /transcripts/${id}.docx`);

      await fetch(`${BASE_URL}/messages/${job.messageId}/ack`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${QSTASH_TOKEN}`,
        },
      });

      console.log("🗑️ تم حذف المهمة من الطابور.\n");

    } catch (err: any) {
      console.error("❌ خطأ أثناء المعالجة:", err?.message || err);
    }
  }
}

// 🚀 التشغيل
processJobs();
