let handler = async (m, { conn, args, usedPrefix, command }) => {
  const owners = global.owner.map(([num]) => num + '@s.whatsapp.net');
  if (!owners.includes(m.sender)) {
    return conn.reply(m.chat, '❌ هذا الأمر مخصص للمالك فقط!', m);
  }
  if (!args[0] || !args[1]) {
    return conn.reply(m.chat, `❗ الاستعمال:\n${usedPrefix + command} @user 1000`, m);
  }
  let target = m.mentionedJid && m.mentionedJid[0] || m.quoted && m.quoted.sender || args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
  
  // معالجة حالة lid
  if (target.endsWith('@lid')) {
    let [res] = await conn.onWhatsApp(target.split('@')[0]);
    if (!res || !res.exists) return conn.reply(m.chat, '❗ الرقم غير موجود في واتساب.', m);
    target = res.jid;
  }
  
  // ✅ إذا لم يكن المستخدم موجودًا في قاعدة البيانات، يتم إنشاؤه تلقائيًا
  if (!global.db.data.users[target]) {
    global.db.data.users[target] = { exp: 0, limit: 10, level: 0, registered: false, name: await conn.getName(target) };
  }
  
  let amount = parseInt(args[1]);
  if (isNaN(amount)) return conn.reply(m.chat, '❗ أدخل رقم صحيح.', m);
  global.db.data.users[target].exp += amount;
  let username = await conn.getName(target);
  let number = target.split('@')[0];
  conn.reply(m.chat, `✅ تم إعطاء *${amount}* نقطة خبرة إلى:\n👤 الاسم: *${username}*\n📞 الرقم: *@${number}*`, m, { mentions: [target] });
};

handler.help = ['باب @user 1000'];
handler.tags = ['owner'];
handler.command = ['باب'];
export default handler;