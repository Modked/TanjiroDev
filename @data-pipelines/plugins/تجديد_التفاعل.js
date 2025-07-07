let handler = async (m, { conn }) => {
    const chatData = db.data.chats[m.chat] || {};
    
    if (!chatData.total) chatData.total = {};

    // ✨ التأكد من أن الرسالة في مجموعة
    if (!m.isGroup) return;

    try {
        // 🌟 جلب بيانات المجموعة
        const groupMetadata = await conn.groupMetadata(m.chat);

        // 🔑 استخراج المشاركين الذين لديهم صلاحيات مشرف
        const groupAdmins = groupMetadata.participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin').map(p => p.id);

        // 🚫 التحقق من صلاحية المستخدم
        if (!groupAdmins.includes(m.sender)) {
            return m.reply("🚫 *لا يمكنك تجديد التفاعل، أنت لست مشرفًا!* 🚫");
        }

        // ⏳ التحقق إذا كانت 24 ساعة قد مرت منذ آخر تجديد
        const lastReset = chatData.lastReset || 0;
        if (Date.now() - lastReset <= 86400000) { // 24 ساعة بالميللي ثانية
            return m.reply("⏳ *لا داعي لتجديد التفاعل، يجب أن تمر 24 ساعة لتجديد التفاعل.* ⏳");
        }

        // 🔄 تجديد التفاعل للمجموعة
        chatData.total = {};  // إعادة تعيين التفاعل
        db.data.chats[m.chat].lastReset = Date.now();
        m.reply("✨ *تم تجديد التفاعل بنجاح!* ✨");
    } catch (error) {
        console.error(error);
        m.reply("❗ *حدث خطأ أثناء تجديد التفاعل. يرجى المحاولة مرة أخرى.* ❗");
    }
};

handler.help = ['تجديد_التفاعل'];
handler.tags = ['owner'];
handler.command = /^تجديد_التفاعل$/i;
handler.group = true;

export default handler;