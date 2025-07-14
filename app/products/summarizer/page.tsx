// app/products/summarizer/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function SummarizerProductPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      {/* العنوان الرئيسي */}
      <div className="text-center space-y-4">
        <Sparkles className="w-10 h-10 mx-auto text-blue-500" />
        <h1 className="text-4xl font-bold">Smart Summarizer</h1>
        <p className="text-gray-600 text-lg">
          أداة تلخيص ذكية تعتمد على الذكاء الاصطناعي لتحويل النصوص الطويلة إلى ملخصات احترافية.
        </p>
        <Link href="/study/summarize">
          <Button size="lg" className="mt-4">ابدأ التلخيص الآن</Button>
        </Link>
      </div>

      {/* المميزات */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "تلخيص احترافي",
            desc: "نلخص لك المقالات، الأبحاث، أو المحاضرات بطريقة ذكية.",
          },
          {
            title: "دعم اللغة العربية والإنجليزية",
            desc: "الأداة تدعم لغتين لتلبية جميع احتياجاتك.",
          },
          {
            title: "سهل وسريع",
            desc: "واجهة بسيطة تُمكنك من الوصول للنتيجة خلال ثوانٍ.",
          },
        ].map((feature, i) => (
          <div key={i} className="p-5 border rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* دعوة للتجربة */}
      <div className="text-center bg-blue-50 py-10 rounded-2xl">
        <h2 className="text-2xl font-bold mb-3">جرب الأداة مجانًا الآن!</h2>
        <p className="text-gray-600 mb-4">ابدأ بتلخيص أول نص واكتشف قوة الذكاء الاصطناعي.</p>
        <Link href="/study/summarize">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">ابدأ التلخيص</Button>
        </Link>
      </div>
    </div>
  );
}
