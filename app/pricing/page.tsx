// app/pricing/page.tsx

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-10">
        خطط الأسعار
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* الخطة المجانية */}
        <div className="border rounded-lg shadow-sm p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">مجاني</h2>
          <p className="text-gray-600 mb-4">ابدأ مجانًا وجرب الأدوات الأساسية.</p>
          <p className="text-3xl font-bold mb-4">0$</p>
          <ul className="space-y-2 mb-6 text-sm text-gray-700">
            <li>✅ الوصول إلى أدوات محدودة</li>
            <li>✅ دعم فني عبر البريد</li>
            <li>✅ تحديثات دورية</li>
          </ul>
          <button className="mt-auto bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            البدء مجانًا
          </button>
        </div>

        {/* الخطة الأساسية */}
        <div className="border-2 border-blue-600 rounded-lg shadow-md p-6 flex flex-col bg-blue-50">
          <h2 className="text-xl font-semibold mb-2 text-blue-800">أساسي</h2>
          <p className="text-gray-700 mb-4">مثالية للمستخدمين الأفراد.</p>
          <p className="text-3xl font-bold mb-4">$9<span className="text-base font-normal">/شهر</span></p>
          <ul className="space-y-2 mb-6 text-sm text-gray-700">
            <li>✅ جميع أدوات الخطة المجانية</li>
            <li>✅ أدوات غير محدودة شهريًا</li>
            <li>✅ دعم مباشر</li>
          </ul>
          <button className="mt-auto bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition">
            اشترك الآن
          </button>
        </div>

        {/* الخطة الاحترافية */}
        <div className="border rounded-lg shadow-sm p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">احترافي</h2>
          <p className="text-gray-600 mb-4">للفِرق والشركات الصغيرة.</p>
          <p className="text-3xl font-bold mb-4">$29<span className="text-base font-normal">/شهر</span></p>
          <ul className="space-y-2 mb-6 text-sm text-gray-700">
            <li>✅ كل مزايا الخطة الأساسية</li>
            <li>✅ صلاحيات للفريق</li>
            <li>✅ دعم مخصص</li>
          </ul>
          <button className="mt-auto bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            اشترك الآن
          </button>
        </div>
      </div>
    </div>
  );
}
