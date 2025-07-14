"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Download, Loader2, X, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function VideoToAudioForm() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setVideoFile(null);
    setAudioUrl(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleUpload = async () => {
    if (!videoFile) return;

    setIsLoading(true);
    setAudioUrl(null);
    setError(null);

    const formData = new FormData();
    formData.append("file", videoFile);

    try {
      const response = await fetch("/api/ai/video-to-audio", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "فشل التحويل");
      }

      const { audioUrl } = await response.json();
      setAudioUrl(audioUrl);
    } catch (err: any) {
      setError(err.message || "حدث خطأ أثناء التحويل.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 max-w-md mx-auto">
      {/* رفع الفيديو */}
      <Input
        ref={inputRef}
        type="file"
        accept="video/*"
        onChange={(e) => {
          setVideoFile(e.target.files?.[0] || null);
          setAudioUrl(null);
          setError(null);
        }}
        aria-label="رفع ملف فيديو"
      />

      {videoFile && (
        <div className="flex justify-between items-center text-sm text-gray-700">
          <span>
            الملف: {videoFile.name} ({(videoFile.size / 1024 / 1024).toFixed(2)} MB)
          </span>
          <button
            onClick={resetForm}
            aria-label="إزالة الملف"
            className="text-red-500 hover:text-red-700"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {error && (
        <p className="text-red-600 text-sm" role="alert">
          {error}
        </p>
      )}

      {/* زر التحويل */}
      <Button
        onClick={handleUpload}
        disabled={isLoading || !videoFile}
        aria-busy={isLoading}
        className="w-full"
      >
        {isLoading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : "تحويل إلى صوت"}
      </Button>

      {/* عرض نتيجة التحويل */}
      {audioUrl && (
        <div className="mt-6 space-y-4">
          <audio controls src={audioUrl} className="w-full rounded" />
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href={audioUrl}
              download={`converted-audio-${Date.now()}.mp3`}
              className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
            >
              <Download className="w-4 h-4" />
              تحميل الصوت
            </a>

            <Link
              href="/study/audio-to-text"
              className="inline-flex items-center gap-2 text-sm text-green-700 hover:underline"
            >
              <ArrowRight className="w-4 h-4" />
              حوله إلى نص
            </Link>

            <button
              onClick={resetForm}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
              type="button"
            >
              رفع ملف جديد
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
