import axios from "axios";
import baileys from "@whiskeysockets/Baileys";
const { generateWAMessageContent, generateWAMessageFromContent, proto } = baileys;

const handler = async (m, { conn, text, args }) => {
  let rawParts = m.text?.trim().split(/\s+/) || [];
  let Tanjiro = "";

  if (rawParts[0]) {
    if (/^[\.\!\/]$/.test(rawParts[0])) {
      // المستخدم كتب فقط نقطة وبعدها مسافة
      if (!rawParts[1]) return; // ← نتجاهل إذا ما كتب شيء بعدها
      Tanjiro = rawParts[1];
    } else {
      Tanjiro = rawParts[0].replace(/^[\.\!\/]/, "") || "deeplor-ai";
    }
  } else {
    Tanjiro = "deeplor-ai";
  }

  if (!text) {
    return m.reply(
      "⚠️ *طريقة الاستخدام:*\n\n" +
      `✧ أرسل الأمر هكذا:\n` +
      "```" +
      `.${Tanjiro} فتاة` +
      "```"
    );
  }

  try {
    m.reply("⏳ جاري توليد الصور بواسطة الذكاء الاصطناعي... انتظر قليلًا يا بطل!");

    let { result } = await generateImages(text);

    // Function to create image message
    async function createImage(url) {
      const { imageMessage } = await generateWAMessageContent(
        { image: { url } },
        { upload: conn.waUploadToServer }
      );
      return imageMessage;
    }

    // تحضير كروت الكاروسيل
    let push = [];
    let i = 1;
    for (let res of result) {
      push.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: `🎨 *النموذج:* ${res.model}\n🔗 *الرابط للتحميل:* ${res.url}`,
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: "> *✦created By✦  :  ❨◣_◢❩ෟ͜͡ᴛᴀɴᴊɪʀᴏ-ෟ͜͡ᴀɪঔ𒆜⁩*",
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: `✨ الصورة رقم ${i++}`,
          hasMediaAttachment: true,
          imageMessage: await createImage(res.url),
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [
            {
              name: "cta_url",
              buttonParamsJson: `{"display_text":"📥 عرض الصورة","url":"${res.url}"}`,
            },
          ],
        }),
      });
    }

    const bot = generateWAMessageFromContent(
      m.chat,
      {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2,
            },
            interactiveMessage: proto.Message.InteractiveMessage.fromObject({
              body: proto.Message.InteractiveMessage.Body.create({
                text: "✅ *تم الانتهاء من توليد الصور بنجاح!*",
              }),
              footer: proto.Message.InteractiveMessage.Footer.create({
                text: "> *✦created By✦  :  ❨◣_◢❩ෟ͜͡ᴛᴀɴᴊɪʀᴏ-ෟ͜͡ᴀɪঔ𒆜⁩*",
              }),
              header: proto.Message.InteractiveMessage.Header.create({
                hasMediaAttachment: false,
              }),
              carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                cards: [...push],
              }),
            }),
          },
        },
      },
      {}
    );

    await conn.relayMessage(m.chat, bot.message, { messageId: bot.key.id });

  } catch (e) {
    console.log(e);
    return m.reply(`❌ *حدث خطأ أثناء توليد الصور:*\n${e.message}`);
  }
};

handler.help = ["deeplor-ai"];
handler.tags = ["ai"];
handler.command = /^(deeplor-ai|ديب-لور|deeplor|deeplor_ai|ديب_لور|ديبلور)$/i;

handler.limit = true;

export default handler;

// Function generateImages
async function generateImages(prompt) {
  try {
    const randomIP = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;

    const userAgentList = [
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      "Mozilla/5.0 (Linux; Android 10; SM-G960U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Mobile Safari/537.36",
    ];

    const models = [
      "Glowing Forest",
      "Vector Art",
      "Princess",
      "LoL",
      "Realistic Anime",
      "West Coast",
      "Blue Rhapsody",
      "Graffiti",
      "Clown",
      "Elf",
    ];

    let pull = [];

    for (let i = 0; i < models.length; i++) {
      const randomUserAgent = userAgentList[Math.floor(Math.random() * userAgentList.length)];

      const source = await axios.post(
        "https://restapi.cutout.pro/web/ai/generateImage/generateAsync",
        {
          prompt: prompt,
          style: models[i],
          quantity: 1,
          width: 512,
          height: 512,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "User-Agent": randomUserAgent,
            "X-Forwarded-For": randomIP,
            "Referer": "https://www.cutout.pro/zh-CN/ai-art-generation/upload",
          },
        }
      );

      if (!source.data.data || !source.data.data.batchId) {
        throw new Error(`لم أستطع الحصول على batchId من السيرفر للنموذج: ${models[i]}`);
      }

      const batchId = source.data.data.batchId;

      let status = false;

      while (!status) {
        const txt2img = await axios.get(
          `https://restapi.cutout.pro/web/ai/generateImage/getGenerateImageTaskResult?batchId=${batchId}`,
          {
            headers: {
              Accept: "application/json, text/plain, */*",
              "User-Agent": randomUserAgent,
              "X-Forwarded-For": randomIP,
              "Referer": "https://www.cutout.pro/zh-CN/ai-art-generation/upload",
            },
          }
        );

        const image = txt2img.data.data.text2ImageVoList;

        status = image.every((image) => image.status === 1);

        if (status) {
          const model_result = image.map((image) => ({
            model: models[i],
            url: image.resultUrl,
            creator_scrape: "INS",
          }));

          pull = pull.concat(model_result);
        } else {
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      }
    }

    return { result: pull };
  } catch (error) {
    console.log(error);
    throw error;
  }
}