export async function before(m) {
  if (m.key.fromMe) return true;

  const chat = global.db.data.chats[m.chat] || {};
  const bot = global.bot || {};

  // 🔒 شرط عام لتعطيل الصوتيات
  if (bot.audios_bot === false || chat.audios_bot === false) return false;

  return true;
}