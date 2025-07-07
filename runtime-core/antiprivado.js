export async function before(m, {conn, isAdmin, isBotAdmin, isOwner, isROwner}) {
  if (m.isBaileys && m.fromMe) return !0;
  if (m.isGroup) return !1;
  if (!m.message) return !0;
  if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA') || m.text.includes('serbot') || m.text.includes('jadibot')) return !0;
  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[this.user.jid] || {};
  if (bot.antiPrivate && !isOwner && !isROwner) {
    await m.reply(`> "🍧 هلا @${m.sender.split`@`[0]}, ، أنا آسف، ليس 🍭مسموحًا لي بالتحدث على الخاص 🍫لذا سيتم حظرك/A\n\n> *🍫يمكنك الانضمام إلى القناة الرسمية للبوت🍿* 👇\n\n\n> $https://whatsapp.com/channel/0029VaklBGFHFxOwODjsoP13\n\n\n> توسل للمطور *تانجيرو*«+967 772350066» للي تريده، نيههههههههههاا`, false, { mentions: [m.sender] });
    await this.updateBlockStatus(m.chat, 'block');
  }
  return !1;
}