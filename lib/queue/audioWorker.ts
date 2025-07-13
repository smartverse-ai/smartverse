import { Queue } from "@upstash/queue";
import fs from "fs";
import OpenAI from "openai";
import path from "path";
import { createWriteStream } from "fs";

const queue = new Queue({
  url: process.env.UPSTASH_QUEUE_URL!,
  token: process.env.UPSTASH_QUEUE_TOKEN!,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

async function processJob(job: any) {
  const file = fs.createReadStream(job.filepath);

  const transcript = await openai.audio.transcriptions.create({
    file,
    model: "whisper-1",
    language: "ar",
    response_format: "text",
  });

  const outputPath = path.join("public", "transcripts", `${job.id}.txt`);
  fs.writeFileSync(outputPath, transcript);
  console.log("✅ تم تفريغ الملف:", outputPath);
}

export async function startAudioWorker() {
  while (true) {
    const job = await queue.dequeue();

    if (job) {
      console.log("⚙️ معالجة مهمة:", job.id);
      await processJob(job);
    } else {
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
}
