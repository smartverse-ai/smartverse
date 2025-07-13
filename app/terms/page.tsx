// app/terms/page.tsx

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-right">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">الشروط والأحكام</h1>

      <p className="mb-4 text-gray-700">
        من خلال استخدامك لموقع <strong>SmartVerse</strong>، فإنك توافق على الشروط والأحكام التالية. يرجى قراءتها بعناية.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">1. القبول بالشروط</h2>
      <p className="text-gray-700 mb-4">
        باستخدامك للموقع أو أي من أدواته، فإنك تقر بأنك قرأت وفهمت وتوافق على الالتزام بهذه الشروط.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">2. استخدام المنصة</h2>
      <ul className="list-disc pr-5 text-gray-700 space-y-1">
        <li>يُمنع استخدام الأدوات لأغراض غير قانونية أو مضرة.</li>
        <li>يجب عدم مشاركة حسابك مع الآخرين دون إذن.</li>
        <li>يُسمح بالاستخدام الشخصي أو التجاري وفقًا للخطة المشترك بها.</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">3. حقوق الملكية الفكرية</h2>
      <p className="text-gray-700 mb-4">
        جميع الحقوق، بما في ذلك حقوق الملكية الفكرية، محفوظة لـ SmartVerse. لا يجوز نسخ أو إعادة توزيع المحتوى بدون إذن كتابي.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">4. المحتوى المُنشأ باستخدام الذكاء الاصطناعي</h2>
      <p className="text-gray-700 mb-4">
        أنت المسؤول الوحيد عن استخدام نتائج الأدوات، ويجب التأكد من صحتها قبل نشرها أو الاعتماد عليها.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">5. التعديلات على الشروط</h2>
      <p className="text-gray-700 mb-4">
        نحتفظ بحق تعديل هذه الشروط في أي وقت. سيتم إشعارك عبر الموقع أو البريد الإلكتروني عند حدوث تغييرات جوهرية.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">6. إنهاء الخدمة</h2>
      <p className="text-gray-700 mb-4">
        نحتفظ بالحق في تعليق أو إنهاء حسابك إذا تم انتهاك الشروط أو تم استخدام الأدوات بشكل غير قانوني.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">7. التواصل معنا</h2>
      <p className="text-gray-700">
        لأي استفسارات بخصوص الشروط والأحكام، يرجى مراسلتنا على:  
        <a href="mailto:support@smartverse.ai" className="text-blue-600 underline ml-1">support@smartverse.ai</a>
      </p>
    </div>
  );
}
