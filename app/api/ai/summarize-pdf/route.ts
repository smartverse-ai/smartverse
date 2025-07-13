// ✅ /api/ai/summarize-pdf.ts
import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import { Buffer } from "buffer";

// ✅ تأكد من وجود المفتاح
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) throw new Error("❌ متغير البيئة OPENAI_API_KEY غير موجود");

const openai = new OpenAI({ apiKey });

// ✅ تقسيم النص إلى أجزاء
function chunkText(text: string, maxWords = 800): string[] {
  const words = text.split(/\s+/);
  const chunks: string[] = [];
  for (let i = 0; i < words.length; i += maxWords) {
    chunks.push(words.slice(i, i + maxWords).join(" "));
  }
  return chunks;
}

// ✅ توليد البرومبت الذكي
function buildPrompt(text: string, language: string, summaryType: string): string {
  const langLabel: Record<string, string> = {
    ar: "العربية",
    en: "English",
    fr: "Français",
  };

  const summaryStyle: Record<string, string> = {
    paragraph: "في فقرة واحدة موجزة وواضحة",
    bullets: "في نقاط رئيسية مختصرة وواضحة",
  };

  const lang = langLabel[language] || "العربية";
  const style = summaryStyle[summaryType] || "فقرة واحدة";

  const forceLang =
    language === "fr"
      ? "⚠️ Répondez uniquement en français."
      : language === "en"
      ? "⚠️ Respond only in English."
      : "⚠️ أجب فقط باللغة العربية.";

  return `
${forceLang}

قم بتلخيص النص التالي ${style} باللغة ${lang}، دون إعادة الصياغة الحرفية، وبدون إضافة أي معلومات من عندك:

"""${text}"""
`;
}

// ✅ الوظيفة الرئيسية
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const language = (formData.get("language") as string) || "ar";
    const summaryType = (formData.get("summaryType") as string) || "paragraph";

    if (!file || file.type !== "application/pdf") {
      return NextResponse.json({ error: "🚫 يجب رفع ملف PDF فقط." }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "🚫 الحد الأقصى لحجم الملف هو 5MB." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const pdfData = await pdfParse(buffer);
    const rawText = pdfData.text?.trim() || "";

    if (rawText.split(/\s+/).length < 20) {
      return NextResponse.json({ error: "📄 الملف يحتوي على محتوى غير كافٍ للتلخيص." }, { status: 400 });
    }

    const chunks = chunkText(rawText, 800);
    const partialSummaries: string[] = [];

    for (const chunk of chunks) {
      const prompt = buildPrompt(chunk, language, summaryType);
      const res = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "أنت مساعد ذكي متخصص في التلخيص الأكاديمي." },
          { role: "user", content: prompt },
        ],
        temperature: 0.4,
        max_tokens: 500,
      });

      const summary = res.choices?.[0]?.message?.content?.trim();
      if (summary) partialSummaries.push(summary);

      // ⏱️ تجنّب rate limit
      await new Promise((res) => setTimeout(res, 300));
    }

    const combined = partialSummaries.join("\n\n");

    const finalPrompt = `
الملخصات الجزئية التالية تم إنتاجها بناءً على النص الأصلي:

"""${combined}"""

الرجاء دمجها في ${summaryType === "bullets" ? "نقاط رئيسية واضحة" : "فقرة قصيرة شاملة"} دون إعادة الحشو أو التكرار.
${language === "ar" ? "⚠️ أجب فقط باللغة العربية." : language === "en" ? "⚠️ Answer only in English." : "⚠️ Répondez uniquement en français."}
`;

    const finalRes = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "أنت مساعد ذكي يجمع ويلخص المحتوى النهائي بدقة." },
        { role: "user", content: finalPrompt },
      ],
      temperature: 0.3,
      max_tokens: 600,
    });

    const finalSummary = finalRes.choices?.[0]?.message?.content?.trim();
    const preview = rawText.split(/\s+/).slice(0, 200).join(" ") + "...";

    if (!finalSummary) {
      return NextResponse.json({ error: "❌ فشل في توليد الملخص النهائي." }, { status: 500 });
    }

    return NextResponse.json({
      summary: finalSummary,
      preview,
    });
  } catch (error) {
    console.error("❌ خطأ أثناء المعالجة:", error);
    return NextResponse.json(
      { error: "⚠️ حدث خطأ غير متوقع أثناء التلخيص." },
      { status: 500 }
    );
  }
}
