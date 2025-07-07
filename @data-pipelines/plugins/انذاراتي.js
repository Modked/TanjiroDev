let handler = async (m, { conn }) => {
  if (!global.db.data.users[m.sender]) {
    global.db.data.users[m.sender] = { warn: 0 };
  }

  let warns = global.db.data.users[m.sender].warn || 0;

  await conn.sendMessage(m.chat, {
    text: `📛 عدد تحذيراتك الحالية: *${warns}/3*`,
    mentions: [m.sender]
  });
};

handler.command = ['تحذيراتي' ,'انذاراتي', 'تنبيهاتي'];
handler.group = true;

export default handler;