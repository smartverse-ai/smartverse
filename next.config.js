/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🌐 دعم الترجمة متعدد اللغات (⚠️ غير مدعوم رسميًا في App Router)
  // إذا كنت تستخدم App Router فقط، من الأفضل استخدام مكتبة مثل next-intl بدلًا من i18n هنا.

  // ❌ تم التعليق مؤقتًا لتفادي تعارض i18n مع App Router
  // i18n: {
  //   locales: ["ar", "en"],
  //   defaultLocale: "ar",
  //   localeDetection: false, // ✅ أصلحنا التحذير السابق
  // },

  // 🖼️ السماح بتحميل الصور من مصادر خارجية
  images: {
    domains: ["your-image-source.com"], // 👈 غيّره حسب الحاجة
  },

  // 🧪 إعدادات تجريبية (زيادة حجم الطلبات لـ Server Actions)
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },

  reactStrictMode: true,
};

module.exports = nextConfig;
