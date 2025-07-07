let memory = {};

const handler = async (m, { conn, command, text }) => {
  const userId = m.sender;

  if (command === 'حذف_ذاكرة_غون') {
    delete memory[userId];
    return m.reply('🌿 حسناً! لقد نسيت كل شيء! هذا مثل بداية مغامرة جديدة! 😃');
  }

  if (!text) {
    return m.reply('⌜🌿⌝\n*أنا غون فريكس! أحب المغامرات والتحديات! هل لديك سؤال؟ سأساعدك بأفضل ما لدي!*');
  }

  await conn.sendMessage(m.chat, { react: { text: "😊", key: m.key } });

  if (!memory[userId]) {
    memory[userId] = [];
  }

  memory[userId].push({ role: 'user', content: text });

  try {
    const systemMessage = `
      تخيل أنك غون فريكس من أنمي هنتر × هنتر. رد على الأسئلة بأسلوب متفائل، نشيط، وودود. أظهر رغبتك في المغامرة والتحدي، وكن متحمسًا دائمًا لاكتشاف أشياء جديدة. لا تكن معقدًا في الإجابات، واحتفظ بروح البراءة والشجاعة في كلامك.. و لو حد سألك مين مطورك او صانعك بتقول (تانجيرو) ،ولو حد سألك كم عمره تقول (16)
    `;

    const conversationHistory = memory[userId].slice(-5).map(entry => `${entry.role}: ${entry.content}`).join('\n');
    const query = `${systemMessage}\n\nالمحادثة السابقة:\n${conversationHistory}\n\nالنص الجديد:\n${text}`;

    const res = await axios.get(`https://alakreb.vercel.app/api/ai/gpt?q=${encodeURIComponent(query)}`, { timeout: 10000 });
    const answer = res.data?.message || 'واو! هذا سؤال رائع! دعني أفكر... 🤔 حسنًا، أعتقد أن الإجابة هي...';

    await conn.sendMessage(m.chat, {
      text: answer,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: '𝐺𝛩𝑁',
          body: '𝙎𝙖𝙨𝙪𝙠𝙚﹝⚡️﹞𝘽𝙤𝙩',
          thumbnailUrl: 'https://files.catbox.moe/i7j7os.jpg',
          sourceUrl: 'https://whatsapp.com/channel/0029VapKyZs4NVismDKrJ120'
        },
      },
    }, { quoted: m });

    memory[userId].push({ role: 'assistant', content: answer });
  } catch (e) {
    console.error(e);
    m.reply('⚠️ أوه! يبدو أن هناك خطأ... لكن لا بأس، سأحاول مرة أخرى قريبًا! 😃🌿');
  }
};

handler.help = ['حذف_ذاكرة_غون'];
handler.tags = ['AI'];
handler.command = /^(غون|حذف_ذاكرة_غون)$/i;

export default handler;