// ✅ /app/layout.tsx
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ToasterClient from "@/components/ui/ToasterClient";

// ✅ تحميل خط Cairo
const cairo = Cairo({
  subsets: ["latin", "arabic"],
  weight: ["400", "600", "700"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SmartVerse - أدوات ذكاء اصطناعي احترافية",
  description: "منصة أدوات ذكية للطلاب والمسوقين والمستخدمين المحترفين.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="ar" dir="rtl" className={cairo.variable}>
        <body className="bg-white text-gray-800 font-sans min-h-screen flex flex-col">
          {/* ✅ Toast الرسائل */}
          <ToasterClient />

          {/* ✅ شريط التنقل (مكون عميل) */}
          <Navbar />

          {/* ✅ المحتوى الرئيسي */}
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
            {children}
          </main>

          {/* ✅ التذييل */}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
