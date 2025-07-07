let handler = async (m, { conn, text }) => {
  // التحقق من أن المستخدم هو الرقم المسموح به فقط
  if (m.sender !== '994403585483@s.whatsapp.net') {
    throw '⛔ *ليس لديك الإذن لاستخدام هذا الأمر!*';
  }

  let who;
  if (m.isGroup) who = m.mentionedJid[0];
  else who = m.chat;

  if (!who) throw '✳️ *ضع علامة على المستخدم*';

  let txt = text.replace('@' + who.split`@`[0], '').trim();
  if (!txt) throw '✳️ *أدخل مبلغ *خبرة* الذي تريد إضافته*';
  if (isNaN(txt)) throw ' 🔢 *أرقام فقط*';

  let xp = parseInt(txt);
  if (xp < 1) throw '✳️ الحد الأدنى *1*';

  let users = global.db.data.users;

  // تحقق من وجود المستخدم في قاعدة البيانات
  if (!users[who]) throw '✳️ *المستخدم غير موجود في قاعدة البيانات*';

  users[who].exp += xp;

  await m.reply(`≡ ~*تمت إضافة الخبرة*~
*┓✥━═━═━━═━═━✥*
*▢  ▢ المجموع: +${xp}*
*┛✥━═━═━━═━═━✥*`);
};

handler.help = ['addxp <@user>'];
handler.tags = ['econ'];
handler.command = [ 'اعطي3'];
handler.rowner = true;

export default handler;