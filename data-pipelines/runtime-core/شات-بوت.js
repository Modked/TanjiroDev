const colors = [
    0xff26c4dc, 0xff792138, 0xff8b6990, 0xfff0b330,
    0xffae8774, 0xff5696ff, 0xffff7b6b, 0xff57c9ff,
    0xff243640, 0xffb6b327, 0xffc69fcc, 0xff54c265,
    0xff6e257e, 0xffc1a03f, 0xff90a841, 0xff7acba5,
    0xff8294ca, 0xffa62c71, 0xffff8a8c, 0xff7e90a3,
    0xff74676a
];

let handler = async (m, { conn, text }) => {
    let _m = Promise.resolve({ key: { id: '' } });

    if (!m.quoted && !text) {
        throw '*مرحبًا بك في بوت ساسكي! للحصول على قائمة الأوامر المتاحة، اكتب: .اوامر. استمتع بتجربة استخدام البوت!*';
    }

    if (m.quoted && m.quoted.mtype !== 'conversation' && !text) {
        _m = m.quoted.forward('status@broadcast');
    }

    if (m.quoted && m.quoted.mtype === 'conversation' && !text) {
        _m = conn.sendMessage('status@broadcast', {
            text: m.quoted.text,
            textArgb: 0xffffffff,
            backgroundArgb: pickRandom(colors)
        }, 'extendedTextMessage');
    }

    if (!m.quoted && text) {
        _m = conn.sendMessage('status@broadcast', {
            text,
            textArgb: 0xffffffff,
            backgroundArgb: pickRandom(colors)
        }, 'extendedTextMessage');
    }

    if (m.quoted && text) {
        _m = conn.forwardMessage('status@broadcast', await m.quoted.cMod('status@broadcast', text));
    }

    // ✅ إرسال الرد مع externalAdReply
    await conn.sendMessage(m.chat, {
        text: '*شكرًا لاستخدامك بوت ساسكي! لاستكشاف المزيد من الميزات، اكتب .اوامر واستمتع بتجربة مميزة معنا.*',
        contextInfo: {
            externalAdReply: {
                title: "🚀 بوت ساسكي - أقوى بوت واتساب!",
                body: "اضغط هنا لاكتشاف المزيد من الميزات المثيرة!",
                thumbnailUrl: "https://files.catbox.moe/gaypyx.jpg", // استبدل بالرابط الصحيح للصورة
                sourceUrl: "https://whatsapp.com/channel/0029VaklBGFHFxOwODjsoP13", // استبدل بالرابط المناسب
            }
        }
    }, { quoted: m });
};

handler.help = ['subirestado'];
handler.tags = ['general'];
handler.command = /^$/i;
handler.register = false;
export default handler;

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}