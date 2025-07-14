import Link from "next/link";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const settingsLinks = [
  { href: "/settings/profile", label: "الملف الشخصي" },
  { href: "/settings/security", label: "الأمان" },
  { href: "/settings/notifications", label: "الإشعارات" },
  { href: "/settings/delete-account", label: "حذف الحساب" },
];

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
      <aside className="space-y-2">
        <h2 className="text-lg font-semibold">إعدادات الحساب</h2>
        <nav className="flex flex-col space-y-2">
          {settingsLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium text-muted-foreground hover:text-primary transition-colors",
                // active link styling:
                // optional: you can enhance with usePathname from next/navigation
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="md:col-span-3 bg-white dark:bg-muted rounded-lg shadow p-6">
        {children}
      </main>
    </div>
  );
}
