let handler = async (m, { conn, text }) => {
    const allowedNumber = "967772350066"; // الرقم المسموح له باستخدام الأمر

    if (!m.sender.includes(allowedNumber)) {
        throw '⚠️ ليس لديك الصلاحية لاستخدام هذا الأمر!';
    }

    let who;
    if (m.isGroup) {
        who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text;
    } else {
        who = m.chat;
    }

    if (!who) throw '❌ قم بالإشارة إلى الشخص الذي تريد إضافته كمالك للبوت (Owner).';

    let userId = who.replace(/[^0-9]/g, ''); // استخراج الرقم فقط بدون @
    
    if (global.owner.some(([number]) => number === userId)) {
        throw '⚠️ هذا المستخدم مضاف بالفعل كمالك للبوت!';
    }

    global.owner.push([userId, 'مالك جديد', true]); // أضف المستخدم إلى قائمة المالكين

    let caption = `✅ تهانينا! @${userId} أصبح الآن مالكًا للبوت. 🎉`;
    
    await conn.reply(m.chat, caption, m, {
        mentions: [who]
    });
};

handler.help = ['addowner'];
handler.tags = ['owner'];
handler.command = /^اضف-مطور$/i;
handler.owner = true;

export default handler;