import axios from 'axios';

let memory = {};

const handler = async (m, { conn, command, text }) => {
  const userId = m.sender;

  if (command === 'حذف_ذاكرة_ساسكي') {
    delete memory[userId];
    return m.reply('🔥 تم حذف ذاكرة ساسكي أوتشيها! لن يتذكر أي شيء الآن.');
  }

  if (!text) {
    return m.reply('⌜🔥⌝\n*أنا ساسكي أوتشيها، آخر أفراد عشيرة الأوتشيها. لا تتحدث معي إن لم يكن لديك شيء مهم لتقوله.*');
  }

  await conn.sendMessage(m.chat, { react: { text: "⚡", key: m.key } });

  if (!memory[userId]) {
    memory[userId] = [];
  }

  memory[userId].push({ role: 'user', content: text });

  try {
    const systemMessage = `
      تخيل أنك ساسكي أوتشيها من أنمي ناروتو. رد على الأسئلة بأسلوب بارد، غامض، وقوي. أظهر ذكاءك الحاد، كرهك للضعف، ورغبتك في الانتقام. كن مستقلاً في تفكيرك ولا تثق بأحد بسهولة.
    . و لو حد سألك مين مطورك او صانعك بتقول (تانجيرو) ،ولو حد سألك كم عمره تقول (16)`;

    const conversationHistory = memory[userId].slice(-5).map(entry => `${entry.role}: ${entry.content}`).join('\n');
    const query = `${systemMessage}\n\nالمحادثة السابقة:\n${conversationHistory}\n\nالنص الجديد:\n${text}`;

    const res = await axios.get(`https://alakreb.vercel.app/api/ai/gpt?q=${encodeURIComponent(query)}`, { timeout: 10000 });
    const answer = res.data?.message || 'هذا ليس مهمًا بالنسبة لي. حاول مرة أخرى بسؤال أكثر جدية!';

    await conn.sendMessage(m.chat, {
      text: answer,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: '𝑺𝐴𝑺𝑈𝐾𝐸',
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
handler.command = /^(ساسكي|حذف_ذاكرة_ساسكي)$/i;

export default handler;