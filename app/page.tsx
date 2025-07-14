// /app/page.tsx

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

const featuredProducts = [
  {
    id: "4",
    title: "حزمة الدراسة الذكية",
    description: "أداة تلخيص + ملفات PDF + قوالب تنظيم + مصادر تعليمية.",
    price: "12",
    slug: "smart-study-pack",
    image: "/products/smart-study-pack.png",
  },
  {
    id: "2",
    title: "باقة تصميمات سوشيال ميديا",
    description: "50 قالب Canva جاهز للريادة.",
    price: "12",
    slug: "social-media-pack",
    image: "/products/social-pack.png",
  },
  {
    id: "3",
    title: "خطة محتوى شهرية للرياديين",
    description: "خطة محتوى يومية جاهزة للنسخ.",
    price: "8",
    slug: "monthly-plan",
    image: "/products/monthly-plan.png",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700">
            أهلاً بك في SmartVerse
          </h1>
          <p className="text-lg text-gray-600">
            أدوات ذكية تساعدك على التلخيص، إعادة الصياغة، وتحسين الإنتاجية سواء كنت طالبًا أو مسوقًا.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link
              href="/study/summarize"
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
            >
              جرّب أداة التلخيص الآن
            </Link>
            <Link
              href="/auth/register"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded hover:bg-blue-50 transition"
            >
              أنشئ حسابك
            </Link>
          </div>
        </div>
      </section>

      {/* ✅ كارد عرض مميز */}
      <section className="max-w-4xl mx-auto mt-12 mb-12 px-4">
        <div className="bg-gradient-to-r from-blue-100 to-white border border-blue-300 rounded-xl p-6 shadow-md text-right">
          <h2 className="text-2xl font-bold text-blue-700 mb-2">🎁 عرض خاص للزوار الجدد</h2>
          <p className="text-gray-700 mb-4">
            احصل على أدوات التلخيص وإعادة الصياغة مجانًا! بدون بطاقة، فقط ابدأ الآن واستفد.
          </p>
          <Link
            href="/offers"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition font-semibold"
          >
            🚀 اكتشف العرض الآن
          </Link>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto text-center space-y-10">
        <h2 className="text-3xl font-bold text-gray-800">🧠 الأدوات الذكية</h2>
        <p className="text-gray-600">مجموعة أدوات ذكية لتحسين الكتابة والإنتاجية مثل التلخيص، الصياغة، إلخ.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-right">
          <ToolPreview title="📝 التلخيص الذكي" description="حوّل النصوص الطويلة إلى ملخصات مفيدة." href="/study/summarize" />
          <ToolPreview title="✍️ إعادة الصياغة" description="أعد كتابة النصوص بطريقة جديدة." href="/study/rewrite" />
          <ToolPreview title="📢 منشئ الإعلانات" description="أنشئ إعلانات جذابة خلال ثوانٍ." href="/business/ad-generator" />
        </div>
        <Link href="/tools" className="text-blue-600 font-medium hover:underline">
          تصفح جميع الأدوات →
        </Link>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-muted/10">
        <div className="max-w-6xl mx-auto px-4 space-y-8 text-center">
          <h2 className="text-3xl font-bold">📦 المنتجات الرقمية</h2>
          <p className="text-muted-foreground text-lg">
            احصل على منتجات جاهزة تساعدك على الدراسة، التسويق، وتنظيم عملك.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow text-right">
                <CardHeader>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="rounded-lg h-40 w-full object-cover"
                  />
                  <CardTitle className="text-xl mt-2">{product.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">${product.price}</span>
                    <Button asChild>
                      <Link href={`/products/${product.slug}`}>عرض</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="pt-6">
            <Button asChild size="lg">
              <Link href="/products">عرض جميع المنتجات</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Student & Marketer */}
      <section className="bg-gray-50 py-16 px-4 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 text-right">
        <div>
          <h3 className="text-2xl font-semibold mb-2">للطلاب</h3>
          <p className="text-gray-600 mb-4">
            أدوات تساعدك في الدراسة، تلخيص المحاضرات، فهم المحتوى، وحل الواجبات.
          </p>
          <Link href="/study" className="text-blue-600 hover:underline">اكتشف أدوات الطلاب →</Link>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-2">للمسوقين</h3>
          <p className="text-gray-600 mb-4">
            مولد أفكار، كتابة محتوى، وتحسين الحملات الإعلانية بذكاء.
          </p>
          <Link href="/business" className="text-blue-600 hover:underline">اكتشف أدوات التسويق →</Link>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 px-4 text-center max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">📰 آخر المقالات</h2>
        <p className="text-gray-600">
          مقالات تعليمية ومصادر قيّمة تساعدك على استخدام أدوات الذكاء الاصطناعي بفعالية.
        </p>
        <Link
          href="/blog"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          تصفح المدونة
        </Link>
      </section>
    </main>
  );
}

function ToolPreview({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Link href={href} className="block border border-gray-200 rounded-lg p-5 hover:shadow-md transition text-gray-800 text-right">
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </Link>
  );
}
