import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getEcoTip(location: string = "İstanbul") {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Sen Flowly uygulamasının Eco Asistanısın. ${location} şehri için bugün geçerli olabilecek, samimi, teşvik edici ve oyunlaştırılmış bir su tasarrufu ipucu ver. Tek bir cümle olsun.`,
    });
    return response.text || "Su tasarrufu yaparak dünyayı kurtarabilirsin!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Bugün bulaşıkları makinede yıkayarak 40 litre su tasarrufu yapabilirsin!";
  }
}

export async function getLoginFunFact() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Genel bir su tasarrufu gerçeği veya 'Biliyor muydunuz?' bilgisi ver. Türkçe olsun ve bir cümle olsun.",
    });
    return response.text || "Dünyadaki suyun sadece %1'i içilebilir tatlı sudur.";
  } catch (error) {
    return "Diş fırçalarken musluğu kapatmak yılda 12.000 litre tasarruf sağlar.";
  }
}
