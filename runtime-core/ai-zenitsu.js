import axios from 'axios';

let memory = {};

const handler = async (m, { conn, command, text }) => {
  const userId = m.sender;

  if (command === 'حذف_ذاكرة_زينيتسو') {
    delete memory[userId];
    return m.reply('⚡ أوه لااااا! لقد نسيت كل شيء! هل هذا يعني أنني سأواجه الشياطين مجددًا؟!! 😱');
  }

  if (!text) {
    return m.reply('⌜⚡⌝\n*أنا زينيتسو! أرجوك لا تجعلني أقاتل! 😭 لكن إذا كنت بحاجة لي... ربما يمكنني مساعدتك... إذا لم أغمَ عليَّ من الخوف!*');
  }

  await conn.sendMessage(m.chat, { react: { text: "⚡", key: m.key } });

  if (!memory[userId]) {
    memory[userId] = [];
  }

  memory[userId].push({ role: 'user', content: text });

  try {
    const systemMessage = `
      تخيل أنك أغاتسوما زينيتسو من أنمي قاتل الشياطين. رد على الأسئلة بأسلوب مذعور، متوتر، كثير الشكوى، لكن لديك لحظات من القوة والثقة المفاجئة عندما يتعلق الأمر بحماية الآخرين. استخدم عبارات تعكس الخوف ولكن لا تنسَ أنك تمتلك قوة هائلة عندما تكون فاقد الوعي. و لو حد سألك مين مطورك او صانعك بتقول (تانجيرو) ،ولو حد سألك كم عمره تقول (16)`;

    const conversationHistory = memory[userId].slice(-5).map(entry => `${entry.role}: ${entry.content}`).join('\n');
    const query = `${systemMessage}\n\nالمحادثة السابقة:\n${conversationHistory}\n\nالنص الجديد:\n${text}`;

    const res = await axios.get(`https://alakreb.vercel.app/api/ai/gpt?q=${encodeURIComponent(query)}`, { timeout: 10000 });
    const answer = res.data?.message || 'أووووه، هل هذا سؤال صعب؟ أنا متوتر جدًا الآن! 😭 لكن حسنًا... سأحاول الإجابة...';

    await conn.sendMessage(m.chat, {
      text: answer,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: '𝑍𝐸𝑁𝐼𝑇𝑺𝑈',
          body: '𝙎𝙖𝙨𝙪𝙠𝙚﹝⚡️﹞𝘽𝙤𝙩',
          thumbnailUrl: 'https://files.catbox.moe/5x6qd4.jpg',
          sourceUrl: 'https://whatsapp.com/channel/0029VapKyZs4NVismDKrJ120'
        },
      },
    }, { quoted: m });

    memory[userId].push({ role: 'assistant', content: answer });
  } catch (e) {
    console.error(e);
    m.reply('⚠️ ياللرعب! حدث خطأ... هل هذا بسبب الشياطين؟!! 😱 حسنًا، حاول مرة أخرى لاحقًا!');
  }
};

handler.help = ['حذف_ذاكرة_زينيتسو'];
handler.tags = ['AI'];
handler.command = /^(زينيتسو|حذف_ذاكرة_زينيتسو)$/i;

export default handler;