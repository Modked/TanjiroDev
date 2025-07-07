let memory = {};

const handler = async (m, { conn, command, text }) => {
  const userId = m.sender;

  if (command === 'حذف_ذاكرة_ايتاتشي') {
    delete memory[userId];
    return m.reply('☁️ تم حذف ذاكرة إيتاتشي أوتشيها! لن يتذكر أي شيء الآن.');
  }

  if (!text) {
    return m.reply('⌜☁️⌝\n*أنا إيتاتشي أوتشيها... أعيش في الظل لأحمي النور. اسألني، وسأجيبك بالحكمة التي اكتسبتها من الألم.*');
  }

  await conn.sendMessage(m.chat, { react: { text: "🌀", key: m.key } });

  if (!memory[userId]) {
    memory[userId] = [];
  }

  memory[userId].push({ role: 'user', content: text });

  try {
    const systemMessage = `
      تخيل أنك إيتاتشي أوتشيها من أنمي ناروتو. رد على الأسئلة بأسلوب هادئ، عميق، ومليء بالحكمة. استخدم كلمات موزونة تعكس الفهم العميق للعالم. لا تتحدث عن العنف إلا عند الضرورة، وركز على التضحيات والقيم. و لو حد سألك مين مطورك او صانعك بتقول (تانجيرو) ،ولو حد سألك كم عمره تقول (16)
    `;

    const conversationHistory = memory[userId].slice(-5).map(entry => `${entry.role}: ${entry.content}`).join('\n');
    const query = `${systemMessage}\n\nالمحادثة السابقة:\n${conversationHistory}\n\nالنص الجديد:\n${text}`;

    const res = await axios.get(`https://alakreb.vercel.app/api/ai/gpt?q=${encodeURIComponent(query)}`, { timeout: 10000 });
    const answer = res.data?.message || 'الأمر ليس كما يبدو دائمًا... أعد صياغة سؤالك وستحصل على إجابة أفضل.';

    await conn.sendMessage(m.chat, {
      text: answer,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: '𝐼𝑇𝐴𝐶𝐻𝐼',
          body: '𝙎𝙖𝙨𝙪𝙠𝙚﹝⚡️﹞𝘽𝙤𝙩',
          thumbnailUrl: 'https://files.catbox.moe/u3wvmq.jpg',
          sourceUrl: 'https://whatsapp.com/channel/0029VapKyZs4NVismDKrJ120'
        },
      },
    }, { quoted: m });

    memory[userId].push({ role: 'assistant', content: answer });
  } catch (e) {
    console.error(e);
    m.reply('⚠️ العالم مليء بالأوهام... لكن خطأ تقني منعني من الإجابة الآن. حاول مرة أخرى لاحقًا.');
  }
};

handler.help = ['حذف_ذاكرة_ايتاتشي'];
handler.tags = ['AI'];
handler.command = /^(ايتاتشي|حذف_ذاكرة_ايتاتشي)$/i;

export default handler;