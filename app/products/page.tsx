// app/products/page.tsx
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const products = [
  {
    id: "1",
    title: "قالب سيرة ذاتية احترافي",
    description: "قالب سهل التعديل بصيغة PDF وWord.",
    price: "5",
    slug: "cv-template",
    image: "/products/cv-template.png",
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
    slug: "monthly-content-plan",
    image: "/products/monthly-plan.png",
  },
  {
    id: "4",
    title: "حزمة الدراسة الذكية",
    description: "أداة تلخيص + ملفات PDF + قوالب تنظيم + مصادر تعليمية.",
    price: "12",
    slug: "smart-study-pack",
    image: "/products/smart-study-pack.png", // ↩️ تأكد من حفظ الصورة بهذا الاسم في public/
  },
];

export default function ProductsPage() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">📦 المنتجات الرقمية</h1>
        <p className="text-muted-foreground">منتجات جاهزة تساعدك على تطوير أعمالك أو مهاراتك.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              {product.image && (
                <img
                  src={product.image}
                  alt={product.title}
                  className="rounded-lg h-40 w-full object-cover mb-4"
                />
              )}
              <CardTitle className="text-xl">{product.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">${product.price}</span>
                <Button asChild>
                  <Link href={`/products/${product.slug}`}>عرض المنتج</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
