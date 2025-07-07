let crime = 500;
let diamante = 10;

const handler = async (m, { conn, usedPrefix, command, groupMetadata, participants }) => {
  global.robar = ["لقد سرقت بنجاح!", "عملية ناجحة!", "أموال جديدة في جيبك!", "سرقة ناجحة!", "أنت الآن أغنى قليلاً!"];
  global.robmal = ["تم القبض عليك!", "لم تنجح المحاولة!", "تمت ملاحقتك من الشرطة!", "فشلت العملية!", "خسرت كل شيء!"];

  const date = global.db.data.users[m.sender].crime + 3600000; // 1 ساعة
  if (new Date() - global.db.data.users[m.sender].crime < 3600000) 
    return m.reply(`⏳ يجب الانتظار ${msToTime(date - new Date())} قبل تنفيذ جريمة أخرى!`);

  let randow;
  if (m.isGroup) 
    randow = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
  else 
    randow = m.chat;

  try {
    let ps = groupMetadata.participants.map(v => v.id);
    let randow = ps[Math.floor(Math.random() * ps.length)];
    let users = global.db.data.users[randow];
    const exp = Math.floor(Math.random() * 9000);
    const diamond = Math.floor(Math.random() * 150);
    const money = Math.floor(Math.random() * 9000);

    let media = Math.floor(Math.random() * 5);
    global.db.data.users[m.sender].crime = new Date() * 1;

    if (media === 0) return m.reply(`💰 ${pickRandom(global.robar)} +${exp} XP`), global.db.data.users[m.sender].exp += exp;
    if (media === 1) return m.reply(`🚓 ${pickRandom(global.robmal)} -${crime} XP`), global.db.data.users[m.sender].exp -= crime;
    if (media === 2) return m.reply(`💰 *${pickRandom(global.robar)}*
+${diamond} 💎
+${money} 💵`), global.db.data.users[m.sender].limit += diamond, global.db.data.users[m.sender].money += money;
    if (media === 3) return m.reply(`🚓 ${pickRandom(global.robmal)}
-${diamond} 💎
-${money} 💵`), global.db.data.users[m.sender].limit -= diamante, global.db.data.users[m.sender].money -= crime;
    if (media === 4) return conn.reply(m.chat, `📢 @${randow.split`@`[0]} تم سرقته وخسر ${exp} XP`, m, { contextInfo: { mentionedJid: [randow] } }), global.db.data.users[m.sender].exp += exp, global.db.data.users[randow].exp -= crime;
  } catch (e) {
    console.log(e);
  }
};

handler.help = ['robar'];
handler.tags = ['xp'];
handler.command = /^(crime|Crime|جريمه)$/i;
handler.register = true;
handler.group = true;
export default handler;

function msToTime(duration) {
  var minutes = Math.floor((duration / (1000 * 60)) % 60);
  var hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  return `${hours} ساعة ${minutes} دقيقة`;
}

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}