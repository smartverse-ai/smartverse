// app/tools/summarizer/page.tsx

"use client";

import { useState } from "react";

export default function SummarizerTool() {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setSummary("");

    // سيتم لاحقًا استبدال هذا بمحرك GPT فعلي
    setTimeout(() => {
      setSummary("📌 هذا ملخص تجريبي للنص الذي تم إدخاله. سيتم استبداله بتلخيص حقيقي قريبًا.");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">🧠 التلخيص الذكي</h1>
      <p className="text-gray-600 text-center mb-8">
        الصق نصًا أو مقالة وسنقوم بتلخيصه تلقائيًا خلال ثوانٍ باستخدام الذكاء الاصطناعي.
      </p>

      <textarea
        className="w-full h-40 border rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        placeholder="أدخل النص أو المقالة هنا..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <button
        onClick={handleSummarize}
        disabled={loading || !inputText.trim()}
        className="mt-4 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition disabled:opacity-50"
      >
        {loading ? "جارٍ التلخيص..." : "تلخيص النص"}
      </button>

      {summary && (
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <h2 className="text-lg font-semibold text-blue-700 mb-2">🔍 الملخص:</h2>
          <p className="text-gray-800 whitespace-pre-line leading-relaxed">{summary}</p>
        </div>
      )}
    </div>
  );
}
