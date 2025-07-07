let handler = async (m, { conn, text }) => {
    // السماح فقط للرقم 967772350066 باستخدام هذا الأمر
    if (m.sender !== '967772350066@s.whatsapp.net') return m.reply('⚠️ ليس لديك الإذن لاستخدام هذا الأمر!');

    let who;
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
    else who = m.chat;
    
    if (!who) throw '❒ منشن الشخص لفك البان';
    
    let users = global.db.data.users;
    users[who].banned = false;
    
    conn.reply(m.chat, `تم الغاء البان!\n@${who.split`@`[0]} has been unbanned`, m, { mentions: [who] });
}

handler.help = ['unban @user'];
handler.tags = ['owner'];
handler.command = /^الغاء_البان$/i;
handler.owner = true;

export default handler;