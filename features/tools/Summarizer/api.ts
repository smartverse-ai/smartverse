"use server";

import { openai } from "@/lib/ai/openai";

export async function summarizeText(text: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "أنت مساعد تلخيص ذكي. اختصر النص بدقة ووضوح." },
        { role: "user", content: text },
      ],
      temperature: 0.5,
    });

    return response.choices[0].message.content || "لم يتم التلخيص.";
  } catch (error) {
    console.error("خطأ في التلخيص:", error);
    return "حدث خطأ أثناء التلخيص.";
  }
}

