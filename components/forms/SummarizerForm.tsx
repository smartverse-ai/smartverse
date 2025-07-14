"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import ResultBox from "@/components/ui/ResultBox";

export const SummarizerForm = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/ai/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setResult(data.summary);
    } catch (error) {
      setResult("حدث خطأ أثناء التلخيص.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Textarea
        rows={8}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="أدخل النص الذي ترغب في تلخيصه..."
      />
      <Button onClick={handleSummarize} disabled={loading}>
        {loading ? "جاري التلخيص..." : "تلخيص"}
      </Button>
      {result && <ResultBox result={result} />}
    </div>
  );
};
