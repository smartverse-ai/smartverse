// app/business/page.tsx

"use client";

import ToolCard from "@/components/ui/ToolCard";

export default function BusinessToolsPage() {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4 space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">أدوات للمسوقين وصناع المحتوى</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          حسّن حملاتك الإعلانية، أنشئ محتوى جذاب، وابتكر أفكارًا تسويقية جديدة باستخدام أدوات الذكاء الاصطناعي من SmartVerse.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ToolCard
          title="📢 منشئ الإعلانات"
          description="أنشئ إعلانات مقنعة وجذابة خلال ثوانٍ معدودة."
          href="/business/ad-generator"
        />
        <ToolCard
          title="🧠 كاتب المحتوى"
          description="أنشئ مقالات، منشورات، ونصوص تسويقية عالية الجودة تلقائيًا."
          href="/business/content-writer"
        />
        <ToolCard
          title="💡 مولد الأفكار"
          description="احصل على أفكار جديدة ومبتكرة لتوسيع جمهورك وتحقيق نتائج أفضل."
          href="/business/idea-generator"
        />
      </div>
    </div>
  );
}

