const linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;
let enviando;
const handler = async (m, { conn, text, isMods, isOwner, isPrems, args }) => {
    if (enviando) return;
    enviando = true;
    try {
        const link = text;
        if (!link || !link.match(linkRegex)) throw '*[❗] خطأ، ضع رابط المجموعة التي تريد إضافة البوت إليها.*';
        
        const [_, code] = link.match(linkRegex) || [];
        let minutes = parseInt(args[1]);
        if (isNaN(minutes) || minutes < 1) minutes = 60; // الافتراضي 60 دقيقة إذا لم يتم تحديد المدة
        
        if (isPrems || isMods || isOwner || m.fromMe) {
            const res = await conn.groupAcceptInvite(code);
            const chatId = res.gid;
            
            let expirationTime = new Date().getTime() + minutes * 60000; // حساب وقت الخروج
            global.db.data.chats[chatId] = global.db.data.chats[chatId] || {};
            global.db.data.chats[chatId].expired = expirationTime;
            
            await conn.sendMessage(m.chat, { text: `*[ ✔️ ] تم الانضمام بنجاح!\nسيغادر البوت المجموعة بعد ${minutes} دقيقة(s).` }, { quoted: m });
        } else {
            conn.sendMessage(m.chat, { text: '*[❗] تم إرسال الطلب إلى المطور، انتظر الموافقة.*' }, { quoted: m });
            const data = global.owner.filter(([id]) => id)[0];
            const dataArray = Array.isArray(data) ? data : [data];
            for (const entry of dataArray) {
                await conn.sendMessage(entry + '@s.whatsapp.net', { text: `*[❗] طلب جديد لإضافة البوت*\n\n*—◉ المرسل:* @${m.sender.split('@')[0]}\n*—◉ رابط المجموعة:* ${link}`, mentions: [m.sender] }, { quoted: m });
            }
        }
    } catch (error) {
        console.error(error);
        throw '*[❗] خطأ أثناء الانضمام.*';
    } finally {
        enviando = false;
    }
};

// فحص دوري لخروج البوت من المجموعات المنتهية الصلاحية
setInterval(async () => {
    let now = new Date().getTime();
    for (let chatId in global.db.data.chats) {
        if (global.db.data.chats[chatId].expired && global.db.data.chats[chatId].expired <= now) {
            try {
                await conn.groupLeave(chatId);
                delete global.db.data.chats[chatId];
            } catch (err) {
                console.error(`خطأ أثناء محاولة مغادرة المجموعة ${chatId}:`, err);
            }
        }
    }
}, 60000); // يتحقق كل دقيقة

handler.help = ['join [chat.whatsapp.com] [عدد الدقائق]'];
handler.tags = ['premium'];
handler.command = /^join|ادخل$/i;
handler.private = true;
handler.rowner = true;

export default handler;