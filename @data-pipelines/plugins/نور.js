/*
 • اتعملت بإيد Eslam ✌️
 • بيانات مستخلصة من Shannz 
 • الذكاء الصناعي اصدار llama-3.3-70b متفوق علي Meta Ai 😁
 • الذكاء الصناعي - Venice (يقدر يعمل صور 💥)
 • متشلش حقوق الكود عشان ما يبقاش فيه مشاكل ✋
 • https://whatsapp.com/channel/0029VasoQ3rEFeXn7Ij6oG37 */

import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// دالة ترجمة باستخدام خدمة Google Translate المجانية
const translateText = async (text, targetLang = "en") => {
  try {
    const response = await axios.get("https://translate.googleapis.com/translate_a/single", {
      params: {
        client: "gtx",
        sl: "auto", // اللغة المصدر يتم تحديدها تلقائيًا
        tl: targetLang, // اللغة المستهدفة
        dt: "t",
        q: text, // النص المراد ترجمته
      },
    });

    // استخراج النص المترجم
    return response.data[0][0][0];
  } catch (error) {
    console.error("خطأ في الترجمة:", error.message);
    throw new Error("❌ ماعرفتش أترجم النص!");
  }
};

const handler = async (m, { text, command, args }) => {
  const venice = {
    chatbot: async (question, model = "llama-3.3-70b") => {
      const data = JSON.stringify({
        requestId: "scrape-for-all",
        modelId: model,
        prompt: [
          {
            content: question,
            role: "user",
          },
        ],
        systemPrompt: "",
        conversationType: "text",
        temperature: 0.8,
        webEnabled: true,
        topP: 0.9,
        isCharacter: false,
        clientProcessingTime: 2834,
      });

      const config = {
        method: "POST",
        url: "https://venice.ai/api/inference/chat",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0",
          "Content-Type": "application/json",
          "accept-language": "id-ID",
          referer: "https://venice.ai/chat",
          "x-venice-version": "20241221.032412",
          origin: "https://venice.ai",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          priority: "u=4",
          te: "trailers",
        },
        data: data,
      };

      const res = await axios.request(config);
      const chunks = res.data
        .split("\n")
        .filter((chunk) => chunk)
        .map((chunk) => JSON.parse(chunk));
      const answer = chunks.map((chunk) => chunk.content).join("");
      return answer;
    },

    txt2img: async (prompt) => {
      // لو المستخدم كتب بالعربي هنترجم الأول للإنجليزي باستخدام خدمة Google Translate المجانية
      if (/[\u0600-\u06FF]/.test(prompt)) {
        prompt = await translateText(prompt, "en");
      }

      const data = JSON.stringify({
        modelId: "fluently-xl-final-akash",
        requestId: "INlNFRX",
        prompt: prompt,
        seed: 15391382,
        negativePrompt: "",
        cfgScale: 5,
        aspectRatio: "1:1",
        width: 1024,
        height: 1024,
        customSeed: "",
        steps: 30,
        isCustomSeed: false,
        isHighRes: false,
        safeVenice: true,
        stylePreset: "",
        hideWatermark: false,
        favoriteImageStyles: [],
        stylesTab: 0,
        loraStrength: 75,
        imageToImageStrength: 50,
        clientProcessingTime: 3808,
      });

      const config = {
        method: "POST",
        url: "https://venice.ai/api/inference/image",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0",
          "Content-Type": "application/json",
          "accept-language": "id-ID",
          referer: "https://venice.ai/chat",
          "x-venice-version": "20241221.032412",
          origin: "https://venice.ai",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          priority: "u=4",
          te: "trailers",
        },
        responseType: "arraybuffer",
        data: data,
      };
      const res = await axios.request(config);
      const filePath = path.join(__dirname, "image.png");
      fs.writeFileSync(filePath, res.data);
      return filePath;
    },
  };

  if (command === "نور") {
    if (!args[0]) return m.reply("🧐 اكتبلي سؤال عشان أجاوبك يا معلم!");
    const response = await venice.chatbot(args.join(" "));
    m.reply(`🤖 الرد بتاع الذكاء الصناعي: ${response}`);
  }

  if (command === "تصميم") {
    if (!args[0])
      return m.reply("❌ اكتب وصف للصورة اللي عايزها يا فنان!");
    const filePath = await venice.txt2img(args.join(" "));
    await conn.sendMessage(m.chat, {
      image: { url: filePath },
      caption: "🖼️ الصورة اتعملت بنجاح! 🎉",
    });
  }
};

handler.command = ["نور", "تصميم"];
handler.tags = ["ai"];
handler.help = [
  "نور + السؤال بتاعك",
  "تصميم + الوصف للصورة",
];
export default handler;