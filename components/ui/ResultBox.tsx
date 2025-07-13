"use client";

import { Copy } from "lucide-react";
import { useState } from "react";

interface ResultBoxProps {
  result: string;
}

export default function ResultBox({ result }: ResultBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-gray-100 border border-gray-300 rounded-xl p-4 shadow-sm transition">
      <pre className="whitespace-pre-wrap break-words text-sm text-gray-800">{result}</pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 text-gray-600 hover:text-blue-600 transition"
        title="نسخ الملخص"
      >
        <Copy className="w-5 h-5" />
      </button>
      {copied && (
        <div className="absolute bottom-2 right-2 text-xs text-green-600 font-medium">
          تم النسخ!
        </div>
      )}
    </div>
  );
}
