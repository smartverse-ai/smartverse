// 📍 /app/study/audio-to-text/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import axios from "axios";

export default function AudioToTextPage() {
  const [file, setFile] = useState<File | null>(null);
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [showSubscribe, setShowSubscribe] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      setError("📂 يرجى اختيار ملف صوتي.");
      return;
    }

    setLoading(true);
    setProgress(0);
    setTranscript("");
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("http://127.0.0.1:8000/transcribe", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setProgress(percent);
        },
      });

      setTranscript(res.data.text);
    } catch (err: any) {
      setError(err.response?.data?.error || "❌ حدث خطأ أثناء التفريغ.");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  const handleDownload = (type: string) => {
    if (!transcript) return;

    let mimeType = "text/plain";
    let extension = "txt";

    if (type === "docx") {
      mimeType =
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      extension = "docx";
    } else if (type === "pdf") {
      mimeType = "application/pdf";
      extension = "pdf";
    } else if (type === "srt") {
      mimeType = "text/plain";
      extension = "srt";
    }

    const blob = new Blob([transcript], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `transcript.${extension}`;
    link.click();

    setShowSubscribe(true);
  };

  return (
    <main className="max-w-3xl mx-auto py-16 px-4 space-y-6 text-right">
      <h1 className="text-3xl font-bold text-gray-900 text-center">
        🎙️ تحويل الصوت إلى نص
      </h1>
      <p className="text-center text-gray-500">
        ارفع ملفًا صوتيًا (MP3, WAV...) لتحويله إلى نص مكتوب بدقة عالية.
      </p>

      <div className="bg-white border border-gray-200 shadow-sm p-6 rounded-lg space-y-4">
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full border border-gray-300 p-3 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-800 file:text-white"
        />

        <Button
          onClick={handleUpload}
          disabled={loading || !file}
          className="w-full bg-gray-800 hover:bg-gray-900 text-white text-lg"
        >
          {loading ? `🔄 جارٍ التفريغ... ${progress}%` : "🎧 بدء التفريغ"}
        </Button>

        {loading && (
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gray-800 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg text-sm">
            {error}
          </div>
        )}
      </div>

      {transcript && (
        <div className="bg-gray-50 border border-gray-300 p-6 rounded-lg space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">📜 النص الناتج:</h2>
          <pre className="whitespace-pre-wrap text-gray-800 text-sm max-h-96 overflow-auto bg-white p-4 border border-gray-200 rounded-lg">
            {transcript}
          </pre>

          <div className="flex flex-wrap gap-3 justify-end text-sm pt-2">
            <Button
              onClick={() => handleDownload("txt")}
              className="bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              📄 تحميل TXT
            </Button>
            <Button
              onClick={() => handleDownload("docx")}
              className="bg-blue-100 text-blue-800 hover:bg-blue-200"
            >
              📝 تحميل Word
            </Button>
            <Button
              onClick={() => handleDownload("pdf")}
              className="bg-red-100 text-red-800 hover:bg-red-200"
            >
              📕 تحميل PDF
            </Button>
            <Button
              onClick={() => handleDownload("srt")}
              className="bg-green-100 text-green-800 hover:bg-green-200"
            >
              🎬 تحميل SRT
            </Button>
          </div>
        </div>
      )}

      {showSubscribe && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full text-center space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              📬 اشترك لتصلك آخر الأدوات والميزات
            </h3>
            <p className="text-gray-600 text-sm">
              أدخل بريدك الإلكتروني لتلقي تحديثات مميزة وعروض حصرية.
            </p>
            <input
              type="email"
              placeholder="ادخل بريدك الإلكتروني"
              className="w-full border border-gray-300 p-2 rounded"
            />
            <Button
              className="w-full bg-gray-800 text-white hover:bg-gray-900"
              onClick={() => setShowSubscribe(false)}
            >
              ✅ اشترك الآن
            </Button>
            <button
              onClick={() => setShowSubscribe(false)}
              className="text-gray-500 text-sm underline"
            >
              تخطي الاشتراك الآن
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
