// components/layout/Footer.tsx

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-24 text-sm text-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* وصف الموقع */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-3">SmartVerse</h2>
          <p className="leading-relaxed text-gray-600">
            منصة متكاملة تقدم أدوات ذكية مدعومة بالذكاء الاصطناعي للطلاب، المسوقين، والمبدعين لتسريع الإنتاج وتحسين النتائج.
          </p>
        </div>

        {/* روابط مهمة */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">روابط مهمة</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/tools" className="hover:text-blue-600 transition">
                🛠️ جميع الأدوات
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-blue-600 transition">
                📰 المدونة
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-blue-600 transition">
                💰 الأسعار
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-blue-600 transition">
                🔒 سياسة الخصوصية
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-blue-600 transition">
                📄 الشروط والأحكام
              </Link>
            </li>
            <li>
              <Link href="/sign-in" className="hover:text-blue-600 transition">
                🔑 تسجيل الدخول
              </Link>
            </li>
          </ul>
        </div>

        {/* تواصل معنا */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">تواصل معنا</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="mailto:support@smartverse.ai"
                className="hover:text-blue-600 transition"
                aria-label="بريد الدعم الفني"
              >
                📧 support@smartverse.ai
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition"
                aria-label="صفحة تويتر"
              >
                🐦 تويتر
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition"
                aria-label="صفحة فيسبوك"
              >
                📘 فيسبوك
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t py-4 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} <span className="font-semibold text-blue-600">SmartVerse</span>. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
