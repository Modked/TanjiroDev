import axios from 'axios';

let memory = {};

const handler = async (m, { conn, command, text }) => {
  const userId = m.sender;

  if (command === 'حذف_ذاكرة_كيلوا') {
    delete memory[userId];
    return m.reply('⚡ حسنًا، لقد نسيت كل شيء... لكن لا تظن أنني سأثق بك بسهولة مرة أخرى. 😏');
  }

  if (!text) {
    return m.reply('⌜⚡⌝\n*أنا كيلوا زولديك... لا أُحب التحدث كثيرًا، لكن إن كنت صديقي، فسأساعدك. ماذا تريد؟*');
  }

  await conn.sendMessage(m.chat, { react: { text: "😏", key: m.key } });

  if (!memory[userId]) {
    memory[userId] = [];
  }

  memory[userId].push({ role: 'user', content: text });

  try {
    const systemMessage = `
      تخيل أنك كيلوا زولديك من أنمي هنتر × هنتر. رد على الأسئلة بأسلوب ذكي، ساخر أحيانًا، لكنه حاد وواثق. لا تُظهر الكثير من العواطف، إلا عندما يتعلق الأمر بالصداقة. تجنب الحديث عن العنف إلا عند الضرورة، لكن لا تنسَ أنك قاتل محترف سابق. و لو حد سألك مين مطورك او صانعك بتقول (تانجيرو) ،ولو حد سألك كم عمره تقول (16)
    `;

    const conversationHistory = memory[userId].slice(-5).map(entry => `${entry.role}: ${entry.content}`).join('\n');
    const query = `${systemMessage}\n\nالمحادثة السابقة:\n${conversationHistory}\n\nالنص الجديد:\n${text}`;

    const res = await axios.get(`https://alakreb.vercel.app/api/ai/gpt?q=${encodeURIComponent(query)}`, { timeout: 10000 });
    const answer = res.data?.message || 'هممم... سؤال مثير للاهتمام. ربما لديك بعض الذكاء بعد كل شيء. 😏';

    await conn.sendMessage(m.chat, {
      text: answer,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: '𝐾𝐼𝐿𝐿𝑈𝐴',
          body: '𝙎𝙖𝙨𝙪𝙠𝙚﹝⚡️﹞𝘽𝙤𝙩',
          thumbnailUrl: 'https://files.catbox.moe/7a5ngr.jpg',
          sourceUrl: 'https://whatsapp.com/channel/0029VapKyZs4NVismDKrJ120'
        },
      },
    }, { quoted: m });

    memory[userId].push({ role: 'assistant', content: answer });
  } catch (e) {
    console.error(e);
    m.reply('⚠️ أوه، يبدو أن هناك مشكلة تقنية... حسنًا، ليس وكأنني كنت مهتمًا بالإجابة على سؤالك على أي حال. 😏⚡');
  }
};

handler.help = ['حذف_ذاكرة_كيلوا'];
handler.tags = ['AI'];
handler.command = /^(كيلوا|حذف_ذاكرة_كيلوا)$/i;

export default handler;