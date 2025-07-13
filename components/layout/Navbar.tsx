"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const navLinks = [
  { href: "/tools", label: "الأدوات" },
  { href: "/study", label: "للطلاب" },
  { href: "/business", label: "للمسوقين" },
  { href: "/blog", label: "المدونة" },
  { href: "/pricing", label: "الأسعار" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* شعار الموقع */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          SmartVerse
        </Link>

        {/* روابط التنقل على الشاشات الكبيرة */}
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "hover:text-blue-600 transition",
                pathname.startsWith(link.href) ? "text-blue-600 font-semibold" : ""
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* أزرار الدخول أو الملف الشخصي */}
        <div className="hidden md:flex items-center gap-3">
          <SignedOut>
            <Link href="/sign-in" className="text-gray-600 hover:text-blue-600">
              تسجيل الدخول
            </Link>
            <Link
              href="/sign-up"
              className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition"
            >
              إنشاء حساب
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        {/* زر القائمة الجانبية للجوال */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="فتح القائمة"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* القائمة المنسدلة للموبايل */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 py-3 space-y-3 border-t">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block text-gray-700 hover:text-blue-600 transition",
                pathname.startsWith(link.href) ? "text-blue-600 font-semibold" : ""
              )}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <hr />

          <SignedOut>
            <Link
              href="/sign-in"
              className="block text-gray-600 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              تسجيل الدخول
            </Link>
            <Link
              href="/sign-up"
              className="block text-blue-600 hover:text-blue-800 font-medium"
              onClick={() => setIsOpen(false)}
            >
              إنشاء حساب
            </Link>
          </SignedOut>

          <SignedIn>
            <div className="pt-2">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </div>
      )}
    </header>
  );
}
