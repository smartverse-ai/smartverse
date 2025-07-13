"use client";

import ToolCard from "@/components/ui/ToolCard";

export default function ToolsPage() {
  return (
    <main className="max-w-7xl mx-auto py-16 px-4 space-y-16">
      {/* العنوان والوصف */}
      <section className="text-center space-y-5">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-800">
          جميع الأدوات الذكية
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
          اكتشف الأدوات المتنوعة التي تقدمها{" "}
          <span className="font-semibold text-blue-600">SmartVerse</span> لمساعدتك في الدراسة، الأعمال، المحتوى، وأكثر باستخدام الذكاء الاصطناعي.
        </p>
      </section>

      {/* 🧑‍🎓 أدوات الدراسة */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-700">🎓 أدوات الدراسة</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <ToolCard
            title="📝 التلخيص الذكي"
            description="حوّل النصوص الطويلة إلى ملخصات مفيدة بدقة عالية."
            href="/study/summarize"
          />
          <ToolCard
            title="📘 حل الواجبات"
            description="احصل على حلول فورية ومنطقية لأسئلتك الدراسية."
            href="/study/solve-homework"
          />
          <ToolCard
            title="✍️ تصحيح القواعد"
            description="اكتشف الأخطاء اللغوية والنحوية في نصوصك بسرعة."
            href="/study/grammar-check"
          />
          <ToolCard
            title="🎬 استخراج النص من SRT"
            description="حوّل ملفات الترجمة إلى نص قابل للنسخ أو التحميل بسهولة."
            href="/study/srt-to-text"
          />
          <ToolCard
            title="🎧 تحويل الصوت إلى نص"
            description="حوّل الملفات الصوتية إلى نصوص مكتوبة بسهولة ودقة."
            href="/study/audio-to-text"
          />
        </div>
      </section>

      {/* 💼 أدوات الأعمال والتسويق */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-700">💼 أدوات التسويق والأعمال</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <ToolCard
            title="📢 منشئ الإعلانات"
            description="أنشئ إعلانات احترافية جذابة خلال ثوانٍ."
            href="/business/ad-generator"
          />
          <ToolCard
            title="🧠 كاتب المحتوى"
            description="أنشئ مقالات ومنشورات عالية الجودة تلقائيًا."
            href="/business/content-writer"
          />
          <ToolCard
            title="💡 مولد الأفكار"
            description="احصل على أفكار جديدة لإنتاج المحتوى في أي مجال."
            href="/business/idea-generator"
          />
        </div>
      </section>

      {/* 📎 أدوات الملفات والتحويل */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-700">📎 أدوات الملفات والتحويل</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <ToolCard
            title="🎥 تحويل الفيديو إلى صوت"
            description="حوّل ملفات الفيديو إلى صوت MP3 بسهولة وسرعة."
            href="/tools/video-to-audio"
          />
          <ToolCard
            title="📝 تحويل Word إلى PDF"
            description="ارفع مستند Word واحصل على نسخة PDF جاهزة للتحميل."
            href="/tools/word-to-pdf"
          />
          <ToolCard
            title="📄 تحويل Word إلى SRT"
            description="حوّل محتوى ملف Word إلى ملف ترجمة SRT بسهولة."
            href="/tools/word-to-srt"
          />
          <ToolCard
            title="🔄 محول الملفات"
            description="حوّل أنواع مختلفة من الملفات بسهولة وسرعة."
            href="/tools/file-converter"
          />
        </div>
      </section>
    </main>
  );
}
