import { Queue } from "@upstash/queue";

export interface AudioJob {
  filePath: string;
  fileName: string;
  userId?: string;
}

export const audioQueue = new Queue<AudioJob>({
  url: process.env.UPSTASH_QUEUE_URL!,
  token: process.env.UPSTASH_QUEUE_TOKEN!,
});
