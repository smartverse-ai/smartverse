export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-white text-center px-4">
      <div>
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-6">
          عذرًا، الصفحة التي تبحث عنها غير موجودة.
        </p>
        <a
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
        >
          العودة إلى الصفحة الرئيسية
        </a>
      </div>
    </div>
  );
}
