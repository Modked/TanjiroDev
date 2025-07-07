let handler = {};

handler.all = async function (m, { conn }) {
    let responses = [
        '🔱 *كفايا كرهت اني بوت*',
        '*امين معايا الفنان طب احب اطمنك انا شغال⚡*',
        '*معاك البوت اطلب وتمنى ⚡*',
        '*وييييييي تعرف تعمل دي 🤺*',
        '*شغال ياااااااابا*',
        '*بحبك 🌹❤️*',
        '*موجود 🙋🏻‍♂️*',
        '*مين معايا الفنان طب احب اطمنك انا شغال*',
        '*انا في الخدمة🗿*',
        '*في الخدمة ياسطا👀*',
        '*اي ياسطا شغال متخفش🧞*'
    ];

    if (/^بوت$/i.test(m.text)) {
        let randomIndex = Math.floor(Math.random() * responses.length);
        let replyText = responses[randomIndex];

        let message = {
            text: replyText,
            contextInfo: {
                externalAdReply: {
                    title: "🤖 بوت ساسكي ⚡",
                    body: "اضغط هنا لرؤية المزيد",
                    mediaType: 1,
                    thumbnailUrl: "https://files.catbox.moe/pujol5.jpg", // رابط الصورة المباشر
                    sourceUrl: "https://whatsapp.com/channel/0029VaklBGFHFxOwODjsoP13" // ضع رابط البوت الخاص بك
                }
            }
        };

        await conn.sendMessage(m.chat, message, { quoted: m });
    }

    return true;
};

export default handler;