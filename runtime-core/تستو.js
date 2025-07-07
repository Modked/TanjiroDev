import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  let name = conn.getName(m.sender);
  let user = global.db.data.users[m.sender];

  let pp;
  try {
    pp = await conn.profilePictureUrl(m.sender, 'image');
  } catch {
    pp = 'https://i.ibb.co/m53WF9N/avatar-contact.png';
  }

  const apiUrl = `https://last-api-jet.vercel.app/?username=${encodeURIComponent(name)}&level=${user.level}&currxp=${user.exp}&needxp=${user.exp_to_next_level}&avatar=${encodeURIComponent(pp)}&background=https://files.catbox.moe/zr8tc2.jpg`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'image/jpeg', // تأكد من أن API يُرجع صورة بصيغة صحيحة
      },
    });

    if (!response.ok) throw new Error('فشل استرجاع الصورة من API.');

    const buffer = await response.buffer();
    const caption = `*⎔ ⋅ ───━ •﹝🧞﹞• ━─── ⋅ ⎔*\n*⌝ معلومات حسابك┋⚙️⌞ ⇊*\n*🕋┊اسمك┊⇇『${name}』*\n*🪄┊المستوى الجديد┊⇇『${user.level}』*\n*📝┊نقاط الخبرة┊⇇『${user.exp}』*\n*😮‍💨┊نقاط المطلوبه للمستوى التالي┊⇇『${user.exp_to_next_level}』*\n*⎔ ⋅ ───━ •﹝🧞﹞• ━─── ⋅ ⎔*\n> MINTO BOT\n`;

    // إرسال الصورة
    await conn.sendMessage(m.chat, { image: buffer, caption }, { quoted: m });

  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, '❌ حدثت مشكلة أثناء تحميل الصورة، حاول مرة أخرى لاحقًا.', m);
  }
};

handler.help = ['obito'];
handler.tags = ['obito'];
handler.command = ['تستو'];
handler.register = true;

export default handler;