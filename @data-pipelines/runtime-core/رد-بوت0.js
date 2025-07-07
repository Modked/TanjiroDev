let handler = async (m, { conn }) => {
    try {
        let tagUser = '@' + m.sender.split("@")[0];

        // قائمة الردود العشوائية مع externalAdReply مختلف لكل واحد
        let responses = [
            {
                text: '🔱 *كفايا كرهت اني بوت*',
                title: "🤖 البوت زعلان منك! 😢",
                body: "بس برضو شغال علشانك! 🚀",
                sourceUrl: "https://www.google.com"
            },
            {
                text: '*امين معايا الفنان طب احب اطمنك انا شغال⚡*',
                title: "🎭 انت الفنان ولا ايه؟ 🎭",
                body: "البوت تحت أمرك يا نجم! 🔥",
                sourceUrl: "https://www.google.com"
            },
            {
                text: '*معاك البوت اطلب وتمنى ⚡*',
                title: "🎯 اطلب واتمنى! 🎯",
                body: "أنا هنا علشان أنفذ أوامرك! 🤖",
                sourceUrl: "https://www.google.com"
            },
            {
                text: '*وييييييي تعرف تعمل دي 🤺*',
                title: "⚔️ مهارات نينجا! ⚔️",
                body: "أنت جامد، بس هل تقدر تنافس؟ 🔥",
                sourceUrl: "https://www.google.com"
            },
            {
                text: '*شغال ياااااااابا*',
                title: "🚀 البوت شغال 24/7 🚀",
                body: "مافيش أعطال هنا، كله تمام! ✅",
                sourceUrl: "https://www.google.com"
            },
            {
                text: '*بحبك 🌹❤️*',
                title: "❤️ رسالة حب من البوت! ❤️",
                body: "وأنا بحبك برضو! 🥰",
                sourceUrl: "https://www.google.com"
            },
            {
                text: '*موجود 🙋🏻‍♂️*',
                title: "✅ موجود وجاهز ✅",
                body: "قول اللي عندك وأنا تحت أمرك! 🤖",
                sourceUrl: "https://www.google.com"
            },
            {
                text: '*مين معايا الفنان طب احب اطمنك انا شغال*',
                title: "🎙️ هل من أحد هنا؟ 🎙️",
                body: "البوت في الخدمة يا فنان! 🤩",
                sourceUrl: "https://www.google.com"
            },
            {
                text: '*انا في الخدمة🗿*',
                title: "🛠️ البوت في الخدمة دائمًا! 🛠️",
                body: "لا تقلق، كل حاجة تحت السيطرة! 😎",
                sourceUrl: "https://www.google.com"
            },
            {
                text: '*في الخدمة ياسطا👀*',
                title: "👀 ياسطا، أنا هنا! 👀",
                body: "مش هسيبك لوحدك، أنا معاك! 🚀",
                sourceUrl: "https://www.google.com"
            },
            {
                text: '*اي ياسطا شغال متخفش🧞*',
                title: "🧞‍♂️ متخفش، البوت شغال! 🧞‍♂️",
                body: "طلباتك أوامر، متقلقش! 🔥",
                sourceUrl: "https://www.google.com"
            }
        ];

        // اختيار رد عشوائي
        let randomResponse = responses[Math.floor(Math.random() * responses.length)];

        // إرسال الرد مع externalAdReply
        await conn.sendMessage(m.chat, {
            text: randomResponse.text,
            contextInfo: {
                externalAdReply: {
                    title: randomResponse.title,
                    body: randomResponse.body,
                    thumbnailUrl: "https://files.catbox.moe/pujol5.jpg",
                    sourceUrl: randomResponse.sourceUrl,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });

    } catch (error) {
        console.error("❌ خطأ في الأمر ساسكي:", error);
        await conn.sendMessage(m.chat, { text: `⚠️ حدث خطأ: ${error.message}` });
    }
};

handler.customPrefix = /^بوت$/i;
handler.command = new RegExp();

export default handler;