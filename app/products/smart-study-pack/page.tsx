// app/products/smart-study-pack/page.tsx
import { Button } from "@/components/ui/Button";

export default function SmartStudyPackPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-6">
      <h1 className="text-4xl font-bold text-center">🎓 حزمة الدراسة الذكية</h1>
      <p className="text-center text-muted-foreground text-lg max-w-xl mx-auto">
        كل ما تحتاجه للتفوق الدراسي في مكان واحد: أدوات ذكية + ملفات منظمة + دليل شامل للنجاح.
      </p>

      <img
        src="/products/smart-study-pack.png"
        alt="Smart Study Pack"
        className="rounded-xl w-full max-h-80 object-cover border"
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">📘 ما الذي ستحصل عليه:</h2>
        <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
          <li>📝 أداة التلخيص الذكي (مفعلة مدى الحياة)</li>
          <li>📚 كتيب PDF لتنظيم وقت الدراسة وتطوير الذات</li>
          <li>📊 قوالب Notion وExcel لتنظيم الجدول والمذاكرة</li>
          <li>🧠 روابط لمواقع وتطبيقات تعليمية فعالة</li>
          <li>🎁 ملف مكافأة: أفضل 50 مصدر مجاني للطلاب</li>
        </ul>
      </div>

      <div className="mt-8 p-6 bg-muted/20 rounded-xl border shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-left">
          <p className="text-lg font-semibold text-green-700">🎉 عرض الإطلاق الخاص</p>
          <p className="text-2xl font-bold">$12 فقط (بدلاً من $19)</p>
        </div>
        <Button asChild size="lg">
          <a
            href="https://gumroad.com/l/smart-study-pack" // ← غيره لاحقًا للرابط الحقيقي
            target="_blank"
            rel="noopener noreferrer"
          >
            🔥 اشتري الآن وابدأ التفوق
          </a>
        </Button>
      </div>
    </div>
  );
}
