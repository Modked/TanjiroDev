const linkRegex = /https:\/\/chat\.whatsapp\.com\/|https:\/\/whatsapp\.com\/channel\//i;

export async function before(m, { conn, isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe) return !0;

    if (!m.isGroup) return !1;

    const chat = global.db.data.chats[m.chat];
    const delet = m.key.participant;
    const bang = m.key.id;
    const bot = global.db.data.settings[this.user.jid] || {};
    const user = `@${m.sender.split`@`[0]}`;
    const isGroupLink = linkRegex.exec(m.text);

    if (chat.antiLink2 && isGroupLink && !isAdmin) {
        if (isBotAdmin) {
            const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`;

            // استثناء رابط المجموعة نفسها
            if (m.text.includes(linkThisGroup)) return !0;
        }

        await this.sendMessage(m.chat, {
            text: `*「 🚫 روابط محظورة 」*\nمرحبًا ${user}، يمنع إرسال روابط مجموعات أو قنوات واتساب هنا!`,
            mentions: [m.sender]
        }, { quoted: m });

        if (!isBotAdmin) return m.reply('*⚠️ البوت ليس أدمن، لا يمكنه حذف الرسائل أو طرد الأعضاء.*');

        if (isBotAdmin && bot.restrict) {
            await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet } });
            const responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
            if (responseb[0].status === '404') return;
        } else if (!bot.restrict) {
            return m.reply('*⚠️ خاصية الطرد غير مفعلة، لكن يُرجى عدم إرسال روابط المجموعات والقنوات.*');
        }
    }

    return !0;
}