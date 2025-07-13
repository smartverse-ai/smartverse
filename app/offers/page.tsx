// 📍 /app/offers/page.tsx
export default function OffersPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-6 flex flex-col items-center justify-center text-center">
      <div className="max-w-2xl space-y-6">
        <h1 className="text-4xl font-bold text-blue-700">
          🎁 عرض خاص للطلاب والمسوقين
        </h1>
        <p className="text-gray-700 text-lg">
          احصل على ملخصات ذكية وادوات مجانية مقابل الاشتراك في خطتنا المجانية 👇
        </p>

        <div className="bg-white rounded-xl shadow-md p-6 space-y-4 border border-blue-200">
          <h2 className="text-2xl font-semibold text-blue-600">
            ✅ المزايا التي ستحصل عليها:
          </h2>
          <ul className="list-disc text-right pr-6 text-gray-700 space-y-2">
            <li>تلخيص ملفات PDF بشكل فوري</li>
            <li>تلخيص النصوص الطويلة إلى نقاط رئيسية</li>
            <li>اختيار لغة التلخيص: عربي / إنجليزي / فرنسي</li>
            <li>تنبيهات صوتية عند انتهاء التلخيص</li>
          </ul>
        </div>

        <a
          href="/study/summarize"
          className="inline-block mt-4 bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition"
        >
          🚀 جرّب الآن مجانًا
        </a>

        {/* ✅ لاحقًا هنا هنضيف عرض CPA حقيقي */}
        <div className="mt-8 text-sm text-gray-500">
          أو <a href="#" className="text-blue-600 underline">افتح المزيد من المميزات</a> بمقابل بسيط
        </div>
      </div>
    </main>
  );
}
