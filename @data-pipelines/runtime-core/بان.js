let handler = async (m, { conn, text }) => {
    // السماح فقط للرقم 967772350066 باستخدام هذا الأمر
    if (m.sender !== '967772350066@s.whatsapp.net') return m.reply('⚠️ ليس لديك الإذن لاستخدام هذا الأمر!');

    let who;
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
    else who = m.chat;

    if (!who) throw '□ منشن الشخص';

    let users = global.db.data.users;
    if (!users[who]) users[who] = {}; // ✅ تهيئة الكائن
    users[who].banned = true;

    conn.reply(m.chat, `@${who.split`@`[0]} لن تستطيع استخدام الأوامر بعد الآن!`, m, { mentions: [who] });
}

handler.help = ['ban @user'];
handler.tags = ['owner'];
handler.command = /^بان$/i;
handler.rowner = true;

export default handler;