"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function SrtToTextPage() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile || !uploadedFile.name.endsWith(".srt")) {
      alert("⚠️ يرجى رفع ملف SRT فقط");
      return;
    }

    setLoading(true);
    setCopied(false);
    setFile(uploadedFile);

    const content = await uploadedFile.text();
    const lines = content.split("\n");
    const cleaned = lines
      .filter((line) => !/^\d+$/.test(line) && !/-->/.test(line) && line.trim() !== "")
      .join(" ")
      .replace(/\s{2,}/g, " ");

    setText(cleaned);
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (type: "txt" | "doc") => {
    const blob = new Blob([text], {
      type: type === "txt" ? "text/plain" : "application/msword",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `srt-text.${type}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="max-w-3xl mx-auto py-16 px-4 space-y-6 text-right">
      <h1 className="text-3xl font-bold text-blue-700 text-center">📄 استخراج النص من ملف SRT</h1>
      <p className="text-center text-gray-600">
        ارفع ملف الترجمة (SRT) وسيتم استخراج النص فقط بدون التوقيتات.
      </p>

      <input
        type="file"
        accept=".srt"
        onChange={handleFileUpload}
        className="w-full p-2 border border-gray-300 rounded-lg"
      />

      {loading && <p className="text-center text-gray-500">⏳ جارٍ قراءة الملف...</p>}

      {text && (
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg border text-sm max-h-80 overflow-y-auto whitespace-pre-wrap">
            {text}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleCopy}>{copied ? "✅ تم النسخ" : "📋 نسخ النص"}</Button>
            <Button onClick={() => handleDownload("txt")}>⬇️ تحميل كـ .TXT</Button>
            <Button onClick={() => handleDownload("doc")}>⬇️ تحميل كـ .DOC</Button>
          </div>
        </div>
      )}
    </main>
  );
}
