let handler = async (m, { conn, args, usedPrefix, command }) => {
  const pp = 'https://files.catbox.moe/e8rc88.jpg';
  
  // الحصول على بيانات الجروب الحالية
  let isGroupSettings = await conn.groupMetadata(m.chat);
  let isAnnouncement = isGroupSettings.announce;  // الحالة الحالية للجروب (مقفل أو مفتوح)

  // تحديد الزر الذي سيتم عرضه بناءً على الحالة الحالية للجروب
  let buttonLabel = isAnnouncement ? 'فتح' : 'قفل'; 
  let action = isAnnouncement ? 'not_announcement' : 'announcement';

  // إرسال الزر المناسب بناءً على الحالة
  if (args[0] && (args[0] === 'قفل' || args[0] === 'فتح')) {
    // عند الضغط على الزر، تغيير حالة الجروب
    await conn.groupSettingUpdate(m.chat, action);

    // إرسال رسالة تأكيد بعد التغيير باستخدام طريقة sendMessage الصحيحة
    return conn.sendMessage(
      m.chat,
      { text: `*\`تم\`* ${args[0] === 'فتح' ? '*\`فتح🔓\`*' : '*\`قفل🔒\`*'} *\`الروم\`*` }, // الرسالة المناسبة بعد التغيير
      { quoted: m }
    );
  }

  // إذا كان الجروب في حالة معينة، أرسل الزر المناسب فقط لمرة واحدة
  await conn.sendButton(
    m.chat,
    `${isAnnouncement ? '*\`『 الروم مقفول 🔒 』\`*' : '*\`『 الروم مفتوح 🔓 』\`*'}`, // عرض حالة الجروب الحالية
    '> *『 SᗩSƱҠƐ-ß❤Ƭ 』*',
    pp,
    [
      [buttonLabel, `${usedPrefix + command} ${buttonLabel}`] // الزر بناءً على الحالة الحالية
    ],
    null,
    m
  );
};

handler.help = ['group *open/close*'];
handler.tags = ['group'];
handler.command = ['روم', 'جروبيي', 'room', 'جروب']; 
handler.admin = true;
handler.botAdmin = true;

export default handler;