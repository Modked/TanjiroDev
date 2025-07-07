let handler = async (m, { isOwner, isAdmin, conn, text, args }) => {
    if (!(isAdmin || isOwner)) {
        global.dfail('admin', m, conn);
        throw false;
    }

    let groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : {};
    let participants = groupMetadata.participants || [];
    let groupAdmins = participants.filter(p => p.admin);
    let groupMembers = participants.filter(p => !p.admin);
    let groupName = groupMetadata.subject || "المجموعة";
    let totalMembers = participants.length || "غير متاح";
    let groupPicture = await conn.profilePictureUrl(m.chat, 'image').catch(() => null);

    let pesan = args.join(" ") || "⚡ *استعدوا أيها الشينوبي، النداء قد صدر!*";
    
    let header = `╭━━━〔 📢 *نداء لجميع الأوتشيها!* 📢 〕━━━⬣\n`;
    let info = `┃ 🏷️ *المجموعة:* 『 ${groupName} 』\n┃ 👥 *عدد الأعضاء:* 『 ${totalMembers} 』\n┃ 💬 *الرسالة:* 『 ${pesan} 』\n╰━━━━━━━━━━━━━━━━⬣\n\n`;

    let adminMentions = `╭───〔 ⚡ *مجلس الشينوبي* ⚡ 〕───⬣\n`;
    for (let admin of groupAdmins) {
        adminMentions += `┃ 🎖️ @${admin.id.split('@')[0]}\n`;
    }
    adminMentions += `╰━━━━━━━━━━━━━━━━⬣\n\n`;

    let memberMentions = `╭───〔 🔥 *الشينوبي المستدعون* 🔥 〕───⬣\n`;
    for (let member of groupMembers) {
        memberMentions += `┃ ✨ @${member.id.split('@')[0]}\n`;
    }
    memberMentions += `╰━━━━━━━━━━━━━━━━⬣`;

    let footer = `╭━━━〔 🤖 *ساسكي بوت* 🤖 〕━━━⬣\n┃ 🚀 *لا مكان للضعفاء!* 💪\n┃ 🔥 *استعدوا للمعركة!* ⚡\n╰━━━━━━━━━━━━━━━━⬣`;

    let teks = `${header}${info}${adminMentions}${memberMentions}${footer}`;

    try {
        // ✅ إرسال الرسالة مع صورة المجموعة (بدون أزرار)
        if (groupPicture) {
            await conn.sendMessage(m.chat, { 
                image: { url: groupPicture }, 
                caption: teks,
                mentions: participants.map(a => a.id) 
            });
        } else {
            await conn.sendMessage(m.chat, { 
                text: teks, 
                mentions: participants.map(a => a.id) 
            });
        }

        // ✅ بعد 2 ثانية، إرسال الصوت
        setTimeout(async () => {
            let audioUrl = 'https://files.catbox.moe/bxje7s.mp3'; // استبدل بالرابط الحقيقي
            await conn.sendMessage(m.chat, { 
                audio: { url: audioUrl }, 
                mimetype: 'audio/mpeg', 
                ptt: true 
            });
        }, 1000); // تأخير 2 ثانية لضمان وصول الرسالة أولًا
    } catch (error) {
        console.error("❌ خطأ أثناء الإرسال:", error);
    }
};

handler.command = /^(tagall|منشن|invocacion|todos|invocación)$/i;
handler.admin = true;
handler.group = true;

export default handler;