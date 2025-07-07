import { createHash } from 'crypto';

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    // السماح فقط للرقم 967772350066 باستخدام هذا الأمر
    if (m.sender !== '967772350066@s.whatsapp.net') return m.reply('⚠️ ليس لديك الإذن لاستخدام هذا الأمر!');

    let deletedUsers = [];
    let users = global.db.data.users;

    for (let user in users) {
      if (users[user].level < 4) {
        delete users[user];
        deletedUsers.push(user);
      }
    }

    if (deletedUsers.length === 0) {
      conn.reply(m.chat, `*🐍 مفيش حد أقل من 4*`, m);
    } else {
      let userList = deletedUsers.map(user => `@${user.split('@')[0]}\n`).join('❐┃');
      conn.reply(m.chat, `*موتو* 🫶✨\n${userList}`, null, { mentions: deletedUsers });
    }
  } catch (e) {
    console.error(e);
    conn.reply(m.chat, `*فيه غلط هنا: ${e.message}*`, m);
  }
};

handler.help = ['owner'];
handler.tags = ['owner'];
handler.command = ['رسترهم']; 
handler.rowner = true;

export default handler;