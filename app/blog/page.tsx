// app/blog/page.tsx
import Link from "next/link";

const articles: Record<string, { title: string; date: string }> = {
  "how-to-summarize": {
    title: "كيفية تلخيص النصوص الطويلة باستخدام الذكاء الاصطناعي",
    date: "2025-07-05",
  },
  "why-ai-summarizer-is-better": {
    title: "لماذا تعتبر أدوات التلخيص بالذكاء الاصطناعي أفضل؟",
    date: "2025-07-05",
  },
};

export default function BlogPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold mb-6">📚 مقالاتنا</h1>
      <ul className="space-y-4">
        {Object.entries(articles).map(([slug, { title, date }]) => (
          <li key={slug}>
            <Link href={`/blog/${slug}`} className="block p-4 border rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="text-sm text-muted-foreground">📅 {date}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

