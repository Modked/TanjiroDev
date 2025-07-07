let handler = async (m, { conn }) => {
    const chatData = db.data.chats[m.chat] || {};

    if (!chatData.total) chatData.total = {};

    const participantCounts = chatData.total;

    // تصفية معرف البوت من التفاعل
    const filteredData = Object.entries(participantCounts)
        .filter(([jid]) => jid !== conn.user.jid) // استبعاد البوت
        .sort((a, b) => b[1] - a[1]);

    const totalMessages = filteredData.reduce((acc, [, total]) => acc + total, 0);

    // إضافة مسافة صغيرة بين المنشن وعدد الرسائل
    const messageSummary = filteredData
        .map(([jid, total], index) => `‏*¦${total}¦* ${jid.replace(/(\d+)@.+/, '@$1')} ⚚`)
        .join('\n\n'); // مسافة بين التفاعل (بين كل متفاعل)

    // رابط الصورة الكبيرة التي ستظهر
    const imageUrl = 'https://qu.ax/qrPZm.jpg'; // استبدل هذا بالرابط الفعلي للصورة

    // تفاعل البوت على الرسالة باستخدام الإيموجي 📊
    await m.react('📊');

    // إرسال الرد مع الصورة الكبيرة
    await conn.sendMessage(
        m.chat,
        {
            text: `*❐════╊⊰💠⊱╉════❐*\n\n${messageSummary}\n\n*¦👥¦ ❉اجمالي➹الرسائل➹${totalMessages}❈*\n\n*❐════╊⊰💠⊱╉════❐*`,
            contextInfo: {
                mentionedJid: filteredData.map(([jid]) => jid),
                externalAdReply: {
                    mediaUrl: imageUrl,
                    mediaType: 2, // 2 يعني صورة
                    title: 'تفاعل الدردشة',
                    body: 'هيا بنا نتابع تفاعل الأعضاء!',
                    thumbnailUrl: imageUrl,
                }
            }
        }
    );
};

handler.help = ['totalchat'];
handler.tags = ['owner'];
handler.command = /^التفاعل$/i;
handler.group = true;

handler.before = function (m) {
    if (!m.isGroup) return false;

    if (!db.data.chats[m.chat]) db.data.chats[m.chat] = {};
    if (!db.data.chats[m.chat].total) db.data.chats[m.chat].total = {};

    const lastReset = db.data.chats[m.chat].lastReset || 0;
    if (Date.now() - lastReset > 2592000000) { // 30 يومًا
        db.data.chats[m.chat].total = {}; 
        db.data.chats[m.chat].lastReset = Date.now();
    }

    if (!m.text) return;

    // عدم تسجيل رسائل البوت
    if (m.sender === conn.user.jid) return;

    if (!db.data.chats[m.chat].total[m.sender]) {
        db.data.chats[m.chat].total[m.sender] = 0;
    }

    db.data.chats[m.chat].total[m.sender] += 1;
};

export default handler;