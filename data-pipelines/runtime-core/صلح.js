let handler = async (m, { conn }) => {
    // تحقق من أن الرقم هو الرقم المحدد فقط
    if (m.sender !== '967772350066@s.whatsapp.net') {
        return m.reply('🚩 *هذا الأمر مخصص فقط للرقم 967772350066*', m);
    }

    let المجموعات = Object.keys(db.data.chats).filter(jid => jid.endsWith('@s.whatsapp.net'));

    let عدد_المجموعات = 0;
    for (let id of المجموعات) {
        delete db.data.chats[id];
        عدد_المجموعات += 1;
        try {
            conn.groupMetadata(id);
        } catch (e) {
            delete db.data.chats[id];
        }
    }

    if (عدد_المجموعات == 0) {
        await m.reply('قاعدة البيانات سليمة، لا توجد مجموعات معطوبة.');
    } else {
        await m.reply(`تم بنجاح تنظيف قاعدة البيانات من المجموعات المعطوبة.\nالإجمالي: ${عدد_المجموعات} مجموعة/معرف.`);
    }
};

handler.help = handler.command = ['اصلاح', 'صلح'];
handler.tags = ['المالك'];
handler.owner = true;

export default handler;