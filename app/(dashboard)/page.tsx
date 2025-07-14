export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">الإعدادات</h1>
      <p className="text-muted-foreground">
        قم بتحديث إعدادات حسابك وتخصيص تجربة استخدامك للمنصة.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="border p-4 rounded-lg shadow-sm bg-white">
          <h2 className="font-semibold text-lg mb-2">المعلومات الشخصية</h2>
          <p className="text-sm text-gray-500">تحديث الاسم والبريد الإلكتروني.</p>
        </div>

        <div className="border p-4 rounded-lg shadow-sm bg-white">
          <h2 className="font-semibold text-lg mb-2">الأمان وكلمة المرور</h2>
          <p className="text-sm text-gray-500">تغيير كلمة المرور وتفعيل المصادقة الثنائية.</p>
        </div>

        <div className="border p-4 rounded-lg shadow-sm bg-white">
          <h2 className="font-semibold text-lg mb-2">الإشعارات</h2>
          <p className="text-sm text-gray-500">التحكم في إعدادات التنبيهات والبريد الإلكتروني.</p>
        </div>

        <div className="border p-4 rounded-lg shadow-sm bg-white">
          <h2 className="font-semibold text-lg mb-2">حذف الحساب</h2>
          <p className="text-sm text-gray-500">إغلاق حسابك بشكل دائم.</p>
        </div>
      </div>
    </div>
  );
}
