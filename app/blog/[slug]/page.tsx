// app/blog/page.tsx

import Link from "next/link";

const blogPosts = [
  {
    slug: "how-to-summarize-smartly",
    title: "كيف تستخدم Smart Summarizer لتلخيص أي محتوى باحترافية",
    description:
      "في هذا المقال نشرح كيفية استخدام أداة Smart Summarizer للحصول على ملخصات دقيقة لأي نص خلال ثوانٍ.",
  },
  {
    slug: "smart-summarizer-in-education",
    title: "أداة التلخيص الذكي في خدمة الطلاب والمعلمين",
    description:
      "تعرف على كيف تساعد أداة Smart Summarizer الطلاب في تلخيص الدروس والمعلمين في تبسيط الشروحات.",
  },
  {
    slug: "ai-content-summarization-future",
    title: "مستقبل التلخيص باستخدام الذكاء الاصطناعي",
    description:
      "استكشاف كيف يغير الذكاء الاصطناعي مستقبل التلخيص، ودور Smart Summarizer في هذا التغيير.",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">المدونة</h1>
      <div className="grid gap-6">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block border border-gray-200 rounded-xl p-6 hover:shadow-md transition bg-white"
          >
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600">{post.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
