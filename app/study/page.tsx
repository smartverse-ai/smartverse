// app/study/page.tsx

"use client";

import ToolCard from "@/components/ui/ToolCard";

export default function StudyToolsPage() {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4 space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">أدوات ذكية للطلاب</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          استخدم أدوات SmartVerse لتسريع دراستك، فهم المقررات، وتسهيل الكتابة الأكاديمية.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ToolCard
          title="📝 التلخيص الذكي"
          description="حوّل النصوص الطويلة إلى ملخصات مركزة بذكاء."
          href="/study/summarize"
        />
        <ToolCard
          title="📘 حل الواجبات"
          description="احصل على إجابات دقيقة ومبررة لأسئلتك الدراسية."
          href="/study/solve-homework"
        />
        <ToolCard
          title="✍️ تصحيح القواعد"
          description="تدقيق نحوي وإملائي فوري لنصوصك الأكاديمية."
          href="/study/grammar-check"
        />
      </div>
    </div>
  );
}
