export async function enqueueAudioJob(filename: string) {
  const QSTASH_URL = process.env.QSTASH_URL!;
  const QSTASH_TOKEN = process.env.QSTASH_TOKEN!;
  const QSTASH_QUEUE_NAME = process.env.QSTASH_QUEUE_NAME!;

  if (!QSTASH_TOKEN || !QSTASH_QUEUE_NAME || !QSTASH_URL) {
    throw new Error("❌ تأكد من وجود QSTASH_TOKEN و QSTASH_QUEUE_NAME و QSTASH_URL في ملف .env.local");
  }

  const response = await fetch(
    `${QSTASH_URL}/v2/publish/${QSTASH_QUEUE_NAME}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${QSTASH_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filepath: `public/uploads/${filename}` }),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error("فشل إرسال المهمة إلى QStash: " + text);
  }

  const data = await response.json();
  return data;
}
