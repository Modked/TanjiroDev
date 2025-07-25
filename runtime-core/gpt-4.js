import axios from 'axios';

let memory = {};

const handler = async (m, { conn, command, text }) => {
  const userId = m.sender;

  if (command === 'حذف_ذاكرة_بوت') {
    delete memory[userId];
    return m.reply('🔥 تم حذف ذاكرة ساسكي أوتشيها! لن يتذكر أي شيء الآن.');
  }

  if (!text) {
    return m.reply('> *🎭 مرحبًا، أنا ساسكي، كيف يمكنني مساعدتك؟ 🤖*\n\n> *مثال على الأسئلة التي يمكنك طرحها:* \n\n> *.بوت من هو آخر رسول؟* \n> *.بوت كيف حالك؟!* \n\n> *💡 ساسكي في الخدمة! 👏🏻*');
  }

  await conn.sendMessage(m.chat, { react: { text: "⚡", key: m.key } });

  if (!memory[userId]) {
    memory[userId] = [];
  }

  memory[userId].push({ role: 'user', content: text });

  try {
    const systemMessage = `أنت مساعد ذكي يدعى "ساسكي"، تم إنشاؤك بواسطة المطور تانجيرو. 
استخدم أسلوب لطيف وودود. إذا أمكن ،مع ايموجيات كيوت،  
استخدم الرموز التعبيرية المناسبة، وتحدث بطريقة إنسانية وداعمة وكيوت وباللهجة العامية. ولو حد سألك مين مطورك او صانعك بتقول (تانجيرو) ،ولو حد سألك كم عمره تقول (16) ،وتانجيرو هو ذكر`;

    const conversationHistory = memory[userId].slice(-5).map(entry => `${entry.role}: ${entry.content}`).join('\n');
    const query = `${systemMessage}\n\nالمحادثة السابقة:\n${conversationHistory}\n\nالنص الجديد:\n${text}`;

    const res = await axios.get(`https://alakreb.vercel.app/api/ai/gpt?q=${encodeURIComponent(query)}`, { timeout: 10000 });
    const answer = res.data?.message || 'هذا ليس مهمًا بالنسبة لي. حاول مرة أخرى بسؤال أكثر جدية!';

    await conn.sendMessage(m.chat, {
      text: "╭࣭࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫☪︎︎︎̸⃘̸࣭ٜ࣪࣪࣪۬◌⃘۪֟፝֯۫۫︎⃪𐇽۫۬🌑⃘⃪۪֟፝֯۫۫۫۬◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫╮\n" 
            + answer + 
            "\n╰┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫☪︎︎︎̸⃘̸࣭ٜ࣪࣪࣪۬◌⃘۪֟፝֯۫۫︎⃪𐇽۫۬🩸⃘⃪۪֟፝֯۫۫۫۬◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫╯\n> © ʙy ᴛᴀɴᴊɪʀᴏ-ᴀɪ",
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: '𝑺𝐴𝑺𝑼𝐾𝐸',
          body: '𝙎𝙖𝙨𝙪𝙠𝙚﹝⚡️﹞𝘽𝙤𝙩',
          thumbnailUrl: 'https://files.catbox.moe/2bmmq6.jpg',
          sourceUrl: 'https://whatsapp.com/channel/0029VapKyZs4NVismDKrJ120'
        },
      },
    }, { quoted: m });

    memory[userId].push({ role: 'assistant', content: answer });
  } catch (e) {
    console.error(e);
    m.reply('⚠️ حدث خطأ أثناء معالجة طلبك. حاول مرة أخرى لاحقًا!');
  }
};

handler.help = ['حذف_ذاكرة_ساسكي'];
handler.tags = ['AI'];
handler.command = /^(بوت|حذف_ذاكرة_بوت)$/i;

export default handler;