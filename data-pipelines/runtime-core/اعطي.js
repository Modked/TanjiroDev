let handler = async (m, { conn, args, usedPrefix, command }) => {
  const owners = global.owner.map(([num]) => num + '@s.whatsapp.net');
  if (!owners.includes(m.sender)) {
    return conn.reply(m.chat, '❌ هذا الأمر مخصص للمالك فقط!', m);
  }

  if (!args[0] || !args[1]) {
    return conn.reply(m.chat, `❗ الاستعمال:\n${usedPrefix + command} @user 1000`, m);
  }

  let target = m.mentionedJid && m.mentionedJid[0]
            || m.quoted && m.quoted.sender
            || args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';

  // إذا كان JID فيه lid، نستخدم onWhatsApp لتحويله إلى s.whatsapp.net
  if (target.endsWith('@lid')) {
    let [res] = await conn.onWhatsApp(target.split('@')[0]);
    if (!res || !res.exists) return conn.reply(m.chat, '❗ الرقم غير موجود في واتساب.', m);
    target = res.jid;
  }

  if (!(target in global.db.data.users)) {
    return conn.reply(m.chat, `❗ المستخدم غير موجود في قاعدة البيانات.\n(JID المستخدم: ${target})`, m);
  }

  let amount = parseInt(args[1]);
  if (isNaN(amount)) return conn.reply(m.chat, '❗ أدخل رقم صحيح.', m);

  global.db.data.users[target].exp += amount;

  let username = await conn.getName(target);
  conn.reply(m.chat, `✅ تم إعطاء *${amount}* نقطة خبرة إلى @${target.split('@')[0]} (${username})`, m, {
    mentions: [target]
  });
};

handler.help = ['اعطي @user 1000'];
handler.tags = ['owner'];
handler.command = ['اعطي'];

export default handler;