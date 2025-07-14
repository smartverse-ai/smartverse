export interface TranscriptionResult {
  text: string;
  fileId: string;
  downloadLinks: {
    txt: string;
    pdf: string;
    docx: string;
  };
}

export interface SubmitAudioPayload {
  file: File;
}

// 📁 features/tools/AudioTranscriber/api.ts
import { SubmitAudioPayload, TranscriptionResult } from "./types";

export async function submitAudio(payload: SubmitAudioPayload): Promise<TranscriptionResult> {
  const formData = new FormData();
  formData.append("file", payload.file);

  const res = await fetch("/api/ai/audio-to-text", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("فشل رفع الملف للتفريغ");

  return res.json();
}

// 📁 features/tools/AudioTranscriber/AudioForm.tsx
"use client";

import { useState } from "react";
import { submitAudio } from "./api";
import { TranscriptionResult } from "./types";
import { Button } from "@/components/ui/Button";

export default function AudioForm() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<TranscriptionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);

    try {
      const res = await submitAudio({ file });
      setResult(res);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <Button onClick={handleSubmit} disabled={loading || !file}>
        {loading ? "جارٍ التفريغ..." : "تفريغ الصوت"}
      </Button>

      {error && <p className="text-red-500">❌ {error}</p>}

      {result && (
        <div className="p-4 border rounded bg-gray-100 mt-4">
          <h3 className="font-semibold mb-2">النص المفرغ:</h3>
          <p className="whitespace-pre-wrap">{result.text}</p>

          <div className="mt-4 space-x-2">
            <a href={result.downloadLinks.txt} download className="underline text-blue-600">
              تحميل TXT
            </a>
            <a href={result.downloadLinks.pdf} download className="underline text-blue-600">
              تحميل PDF
            </a>
            <a href={result.downloadLinks.docx} download className="underline text-blue-600">
              تحميل DOCX
            </a>
          </div>
        </div>
      )}
    </div>
  );
}