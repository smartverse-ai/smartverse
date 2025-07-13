"use client";

import { useEffect, useState } from "react";
import {
  Loader2,
  Upload,
  Download,
  FileVideo,
  RefreshCcw,
  FileText,
  ClipboardCopy,
  Share2,
  CheckCircle,
  Youtube,
} from "lucide-react";
import axios from "axios";

export default function FileConverterPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [downloadName, setDownloadName] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [ytAudioUrl, setYtAudioUrl] = useState("");
  const [ytDownloadName, setYtDownloadName] = useState("");
  const [ytLoading, setYtLoading] = useState(false);
  const [ytError, setYtError] = useState("");

  const resetForm = () => {
    setFile(null);
    setAudioUrl("");
    setError("");
    setProgress(0);
    setCopied(false);
    setDownloadName("");
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setAudioUrl("");
    setError("");
    setProgress(0);
    setCopied(false);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const fakeProgress = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 10 : prev));
      }, 300);

      const response = await axios.post("/api/ai/video-to-audio", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      clearInterval(fakeProgress);
      setProgress(100);
      setAudioUrl(response.data.audioUrl);
    } catch (err) {
      console.error("Error:", err);
      setError("❌ حدث خطأ أثناء التحويل. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  const handleYoutubeConvert = async () => {
    setYtLoading(true);
    setYtError("");
    setYtAudioUrl("");
    setYtDownloadName("");

    try {
      const response = await axios.post("/api/youtube-to-audio", { url: youtubeUrl });
      const url = response.data.audioUrl;
      setYtAudioUrl(url);
      setYtDownloadName(`youtube-audio-${Date.now()}.m4a`);
    } catch (err) {
      console.error("YouTube error:", err);
      setYtError("❌ فشل تحويل الرابط. تأكد أن الرابط صحيح ومدعوم.");
    } finally {
      setYtLoading(false);
    }
  };

  const handleTranscribeRedirect = () => {
    window.location.href = "/study/audio-to-text";
  };

  const handleCopy = async () => {
    if (!audioUrl) return;
    await navigator.clipboard.writeText(window.location.origin + audioUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (audioUrl) {
      setDownloadName(`converted-audio-${Date.now()}.mp3`);
    }
  }, [audioUrl]);

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 text-center">
      <h1 className="text-3xl font-bold mb-8 text-primary">
        🎧 تحويل الفيديو إلى صوت MP3
      </h1>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl border space-y-6">
        {/* رفع ملف فيديو */}
        <label className="block text-sm font-medium text-gray-700 dark:text-white">
          اختر ملف فيديو:
        </label>

        <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6">
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
          />
          <div className="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-300">
            <FileVideo className="w-10 h-10" />
            {file ? (
              <span className="text-sm font-medium text-blue-700">
                {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            ) : (
              <span className="text-sm">اسحب الملف هنا أو اضغط لاختياره</span>
            )}
          </div>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          الحد الأقصى الموصى به: 100MB – يدعم صيغ الفيديو الشائعة مثل MP4 وMOV.
        </p>

        {file && (
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={handleUpload}
              disabled={loading}
              className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4" />
                  جاري التحويل
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  تحويل إلى MP3
                </>
              )}
            </button>

            <button
              onClick={handleTranscribeRedirect}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition"
            >
              <FileText className="h-4 w-4" />
              حوّله إلى نص
            </button>

            <button
              onClick={resetForm}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition"
            >
              <RefreshCcw className="h-4 w-4" />
              ملف جديد
            </button>
          </div>
        )}

        {loading && (
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {error && <p className="text-red-600 font-medium mt-4">{error}</p>}

        {audioUrl && (
          <div className="mt-6 text-center space-y-3">
            <p className="text-green-600 font-medium flex items-center justify-center gap-1">
              <CheckCircle className="w-5 h-5" /> تم التحويل بنجاح!
            </p>

            <a
              href={audioUrl}
              download={downloadName}
              className="inline-flex items-center gap-2 text-white bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              <Download className="h-5 w-5" />
              تحميل الصوت
            </a>
          </div>
        )}

        {/* تحويل رابط YouTube */}
        <div className="mt-12 border-t pt-8">
          <h2 className="text-xl font-bold mb-4 text-primary">
            🔗 تحويل رابط YouTube إلى صوت
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="أدخل رابط YouTube هنا"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 dark:bg-gray-800 dark:border-gray-600"
            />

            {youtubeUrl && youtubeUrl.includes("youtube.com") && (
              <div className="aspect-video mt-2">
                <iframe
                  className="w-full h-full rounded-xl"
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                    youtubeUrl
                  )}`}
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            )}

            <div className="flex flex-col md:flex-row justify-center gap-3">
              <button
                onClick={handleYoutubeConvert}
                disabled={ytLoading || !youtubeUrl}
                className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition disabled:opacity-50"
              >
                {ytLoading ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4" />
                    جاري التحويل
                  </>
                ) : (
                  <>
                    <Youtube className="h-4 w-4" />
                    تحويل الرابط إلى MP3
                  </>
                )}
              </button>

              {/* ✅ زر تحميل فيديو MP4 من YouTube */}
              <button
                onClick={() => {
                  if (!youtubeUrl) return;
                  const videoId = getYouTubeVideoId(youtubeUrl);
                  if (videoId) {
                    window.open(
                      `/api/youtube-to-video?url=${encodeURIComponent(youtubeUrl)}`,
                      "_blank"
                    );
                  }
                }}
                disabled={!youtubeUrl}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition disabled:opacity-50"
              >
                <Download className="h-4 w-4" />
                تحميل الفيديو MP4
              </button>
            </div>

            {ytError && <p className="text-red-600 font-medium">{ytError}</p>}

            {ytAudioUrl && (
              <div className="mt-4 space-y-2">
                <p className="text-green-600 font-medium flex items-center gap-1">
                  <CheckCircle className="w-5 h-5" /> تم التحويل بنجاح!
                </p>
                <a
                  href={ytAudioUrl}
                  download={ytDownloadName}
                  className="inline-flex items-center gap-2 text-white bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  <Download className="h-5 w-5" />
                  تحميل الصوت
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// 🔧 استخراج ID الفيديو من رابط YouTube
function getYouTubeVideoId(url: string) {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : "";
}
