let handler = async (m, { conn }) => {
    try {
        let tagUser = '@' + m.sender.split("@")[0];

        // قائمة الردود العشوائية مع externalAdReply مختلف لكل واحد
        let responses = [
            {
                text: `*قــلــب سـاسـكـي مـن جـوا 👀⚡*\n\n_مرحبًا ${tagUser}, !_`,
                title: "💀 ساسكي في الخدمة! 💀",
                body: "انتبه، فالنينجا لا يرحم! ⚔️",
                sourceUrl: "https://www.google.com"
            },
            {
                text: `*أسطورة الظلام قد وصلت! 🌑🔥*\n\n_ماذا تريد أيها النينجا ${tagUser}؟_`,
                title: "🌙 أسطورة الظلام 🌙",
                body: "النينجا الحقيقي لا يُرى، بل يُحس! 🔥",
                sourceUrl: "https://www.google.com"
            },
            {
                text: `*ساسكي لا يُهزم! 💀⚔️*\n\n_تحياتي لك، أيها المحارب ${tagUser}_`,
                title: "⚔️ العدو الذي لا يُهزم ⚔️",
                body: "هل لديك القوة لمواجهته؟ 🩸",
                sourceUrl: "https://www.google.com"
            },
            {
                text: `*بعيون الشارينغان، أراك بوضوح! 👁️✨*\n\n_هل لديك ما يكفي من القوة، ${tagUser}؟_`,
                title: "👁️ قوة الشارينغان 👁️",
                body: "لا شيء يختبئ عن عيني ساسكي! 🔥",
                sourceUrl: "https://www.google.com"
            },
            {
                text: `*في عالم مليء بالخيانة، يبقى الانتقام هو الحل! 🩸⚔️*\n\n_هل أنت مستعد، ${tagUser}؟_`,
                title: "🩸 الانتقام هو العدالة 🩸",
                body: "ساسكي لا ينسى أبدًا! ⚡",
                sourceUrl: "https://www.google.com"
            }
        ];

        // اختيار رد عشوائي
        let randomResponse = responses[Math.floor(Math.random() * responses.length)];

        let imageUrl = "https://files.catbox.moe/pujol5.jpg";

        // إرسال رد الفعل
        await conn.sendMessage(m.chat, { react: { text: '🙌', key: m.key } });

        // إرسال الرد مع externalAdReply
        await conn.sendMessage(m.chat, {
            text: randomResponse.text,
            contextInfo: {
                externalAdReply: {
                    title: randomResponse.title,
                    body: randomResponse.body,
                    thumbnailUrl: imageUrl,
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

handler.customPrefix = /^ساسكي$/i;
handler.command = new RegExp();

export default handler;