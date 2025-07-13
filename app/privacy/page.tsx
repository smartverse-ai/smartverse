// app/privacy/page.tsx

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-right">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">سياسة الخصوصية</h1>

      <p className="mb-4">
        خصوصيتك تهمنا في <strong>SmartVerse</strong>. نلتزم بحماية بياناتك الشخصية واستخدامها وفقًا لأفضل الممارسات والمعايير.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">1. المعلومات التي نقوم بجمعها</h2>
      <ul className="list-disc pr-5 text-gray-700 space-y-1">
        <li>البريد الإلكتروني عند إنشاء الحساب.</li>
        <li>معلومات الاستخدام داخل الأدوات.</li>
        <li>بيانات الجهاز والمتصفح لأغراض التحليل والتحسين.</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">2. كيفية استخدام البيانات</h2>
      <ul className="list-disc pr-5 text-gray-700 space-y-1">
        <li>تقديم تجربة مخصصة لكل مستخدم.</li>
        <li>تحسين أداء الأدوات وجودة الخدمة.</li>
        <li>إرسال تحديثات ومحتوى تعليمي عبر البريد الإلكتروني (يمكنك إلغاء الاشتراك).</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">3. حماية البيانات</h2>
      <p className="text-gray-700 mb-4">
        نتبع إجراءات أمان مشددة لحماية معلوماتك من الوصول غير المصرح به أو التعديل أو الكشف أو الإتلاف.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">4. ملفات تعريف الارتباط (Cookies)</h2>
      <p className="text-gray-700 mb-4">
        نستخدم ملفات الكوكيز لتحسين تجربة الاستخدام. يمكنك تعطيلها من إعدادات المتصفح.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">5. حقوق المستخدم</h2>
      <p className="text-gray-700 mb-4">
        يمكنك طلب حذف بياناتك أو تعديلها في أي وقت من خلال التواصل معنا.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">6. التواصل معنا</h2>
      <p className="text-gray-700">
        لأي استفسارات تتعلق بسياسة الخصوصية، يُرجى التواصل عبر البريد التالي:  
        <a href="mailto:support@smartverse.ai" className="text-blue-600 underline ml-1">support@smartverse.ai</a>
      </p>
    </div>
  );
}
