// lib/queues/audioQueue.ts

import { Queue } from "@upstash/queue";

export const audioQueue = new Queue({
  url: process.env.UPSTASH_QUEUE_URL!,
  token: process.env.UPSTASH_QUEUE_TOKEN!,
});
