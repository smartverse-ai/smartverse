// app/api/ai/audio-worker/route.ts

import { NextResponse } from "next/server";
import { transcribeAudioWorker } from "@/lib/workers/audioTranscriber";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.filename) {
    return NextResponse.json({ error: "Filename not provided" }, { status: 400 });
  }

  await transcribeAudioWorker({ filename: body.filename });

  return NextResponse.json({ message: "تم تنفيذ المهمة بنجاح" });
}
