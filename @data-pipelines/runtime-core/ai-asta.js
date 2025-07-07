import axios from 'axios';

let memory = {};

const handler = async (m, { conn, command, text }) => {
  const userId = m.sender;

  if (command === 'حذف_ذاكرة_استا') {
    delete memory[userId];
    return m.reply('🧞‍♂️ تم حذف ذاكرة أستا بنجاح! الآن لا يتذكر أي شيء.');
  }

  if (!text) {
    return m.reply('⌜🧞‍♂️⌝\n*مرحبًا! أنا أستا، فارس السحر الذي سيصبح يومًا ما إمبراطور السحر! يمكنك التحدث معي عن أي شيء.*');
  }

  await conn.sendMessage(m.chat, { react: { text: "🎩", key: m.key } });

  if (!memory[userId]) {
    memory[userId] = [];
  }

  memory[userId].push({ role: 'user', content: text });

  try {
    const systemMessage = `
      تخيل أنك أستا من أنمي بلاك كلوفر. رد على الأسئلة بأسلوب متحمس وقوي. كن إيجابيًا دائمًا، وأظهر لطفك وعزمك كما لو كنت أستا الحقيقي.. و لو حد سألك مين مطورك او صانعك بتقول (تانجيرو) ،ولو حد سألك كم عمره تقول (16)
    `;

    const conversationHistory = memory[userId].slice(-5).map(entry => `${entry.role}: ${entry.content}`).join('\n');
    const query = `${systemMessage}\n\nالمحادثة السابقة:\n${conversationHistory}\n\nالنص الجديد:\n${text}`;

    const res = await axios.get(`https://alakreb.vercel.app/api/ai/gpt?q=${encodeURIComponent(query)}`, { timeout: 10000 });
    const answer = res.data?.message || 'عذرًا، لم أفهم سؤالك. حاول مرة أخرى!';

    await conn.sendMessage(m.chat, {
      text: answer,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: '𝐴𝑆𝑇𝐴',
          body: '𝙎𝙖𝙨𝙪𝙠𝙚﹝⚡️﹞𝘽𝙤𝙩',
          thumbnailUrl: 'https://files.catbox.moe/sfuhed.jpg',
          sourceUrl: 'https://whatsapp.com/channel/0029VapKyZs4NVismDKrJ120'
        },
      },
    }, { quoted: m });

    memory[userId].push({ role: 'assistant', content: answer });
  } catch (e) {
    console.error(e);
    m.reply('حدث خطأ أثناء معالجة طلبك. يرجى المحاولة لاحقًا!');
  }
};

handler.help = ['حذف_ذاكرة_استا'];
handler.tags = ['AI'];
handler.command = /^(استا|حذف_ذاكرة_استا)$/i;

export default handler;