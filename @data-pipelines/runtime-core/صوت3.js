let handler = async (m, { conn }) => {
  if (m.key.fromMe) return;

  // ✅ جلب إعدادات البوت
  let botSettings = global.db.data.settings[conn.user.jid] || {};

  // ❌ إذا كانت الخاصية audios_bot غير مفعلة، لا ترسل الصوت
  if (botSettings.audios_bot === false) return;

  // ✅ إرسال الصوت
  const vn = './media/هموت.mp3';
  conn.sendPresenceUpdate('recording', m.chat);
  conn.sendMessage(m.chat, {
    audio: { url: vn },
    ptt: true,
    mimetype: 'audio/mpeg',
    fileName: 'هموت.mp3'
  }, { quoted: m });
};

handler.help = ['notification'];
handler.tags = ['notification'];
handler.customPrefix = /كسم الضحك|هموت|همووت|هموووت|😂|😂😂|😂😂😂|ايه الهزار ده|ضحكني|مش قادر|قهقه|هاهاها/i;
handler.command = new RegExp;

export default handler;