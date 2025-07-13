// app/auth/layout.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SmartVerse | تسجيل الدخول أو إنشاء حساب",
  description: "قم بتسجيل الدخول أو إنشاء حسابك للوصول إلى أدوات SmartVerse الذكية.",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* قسم الصورة أو الشعار */}
      <div className="hidden md:flex items-center justify-center bg-blue-600 text-white p-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">مرحبًا في SmartVerse</h1>
          <p className="text-lg opacity-90">
            أدوات ذكية تساعدك على التلخيص، إعادة الصياغة، وكتابة المحتوى باحتراف.
          </p>
          <p className="text-sm text-blue-100">
            انضم إلينا وابدأ في استخدام تقنيات الذكاء الاصطناعي لتحسين إنتاجيتك.
          </p>
        </div>
      </div>

      {/* قسم النموذج (Login/Register) */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">SmartVerse</h2>
            <p className="text-gray-500 text-sm mt-1">سجّل دخولك أو أنشئ حسابك الآن</p>
          </div>

          <div className="bg-white border rounded-lg shadow-sm p-6">
            {children}
          </div>

          <p className="text-center text-xs text-gray-400">
            © 2025 SmartVerse. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </main>
  );
}
