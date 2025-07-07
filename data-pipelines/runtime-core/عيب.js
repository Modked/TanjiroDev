let handler = async (m, { conn }) => {
  if (m.key.fromMe) return;

  const chat = global.db.data.chats[m.chat] || {};
  const bot = global.bot || {};

  // 🔒 شرط تعطيل نظام الصوتيات
  if (bot.audios_bot === false || chat.audios_bot === false) return;

  const vn = './media/عيب.mp3';
  await conn.sendPresenceUpdate('recording', m.chat);
  await conn.sendMessage(m.chat, {
    audio: { url: vn },
    ptt: true,
    mimetype: 'audio/mpeg',
    fileName: `عيب.mp3`
  }, { quoted: m });
};

handler.help = ['notification'];
handler.tags = ['notification'];
handler.customPrefix = /عيب|عيب يجدعان|متشتمش|عيب يستا|بلاش شتايم/i;
handler.command = new RegExp;

export default handler;