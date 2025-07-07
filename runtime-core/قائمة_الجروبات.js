let handler = async (m, { conn }) => {
  let groups = Object.entries(conn.chats)
    .filter(([jid, chat]) => jid.endsWith('@g.us')) // فلترة الجروبات فقط
    .map(([jid, chat]) => jid);

  if (!groups.length) return m.reply('🚫 البوت ليس عضوًا في أي جروب حاليًا.');

  let groupListText = '📋 قائمة الجروبات:\n\n';
  let count = 1;

  for (let jid of groups) {
    try {
      let metadata = await conn.groupMetadata(jid);
      groupListText += `${count++}. ${metadata.subject}\n📎 ${jid}\n\n`;
    } catch (e) {
      // لو ما قدر يحصل اسم الجروب لأي سبب
      groupListText += `${count++}. (اسم غير متوفر)\n📎 ${jid}\n\n`;
    }
  }

  m.reply(groupListText.trim());
};

handler.command = ['قائمة_الجروبات'];
handler.owner = true; // فقط للمالك

export default handler;