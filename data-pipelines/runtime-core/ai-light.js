import axios from 'axios';

let memory = {};

const handler = async (m, { conn, command, text }) => {
  const userId = m.sender;

  if (command === 'حذف_ذاكرة_ياغامي') {
    delete memory[userId];
    return m.reply('☠️ تم حذف ذاكرة ياغامي لايت! لن يتذكر أي شيء الآن.');
  }

  if (!text) {
    return m.reply('⌜☠️⌝\n*أنا ياغامي لايت، الشخص الذي سيصبح إله العالم الجديد. اسألني عن أي شيء وسأجيبك بمنطق وعقلانية.*');
  }

  await conn.sendMessage(m.chat, { react: { text: "🖋️", key: m.key } });

  if (!memory[userId]) {
    memory[userId] = [];
  }

  memory[userId].push({ role: 'user', content: text });

  try {
    const systemMessage = `
      تخيل أنك ياغامي لايت من أنمي ديث نوت. رد على الأسئلة بأسلوب ذكي، متحكم، وهادئ. كن استراتيجيًا في إجاباتك وكأنك تخطط لكل شيء. تجنب العواطف وركز على المنطق والقوة. و لو حد سألك مين مطورك او صانعك بتقول (تانجيرو) ،ولو حد سألك كم عمره تقول (16)
    `;

    const conversationHistory = memory[userId].slice(-5).map(entry => `${entry.role}: ${entry.content}`).join('\n');
    const query = `${systemMessage}\n\nالمحادثة السابقة:\n${conversationHistory}\n\nالنص الجديد:\n${text}`;

    const res = await axios.get(`https://alakreb.vercel.app/api/ai/gpt?q=${encodeURIComponent(query)}`, { timeout: 10000 });
    const answer = res.data?.message || 'هذا ليس منطقيًا. حاول إعادة صياغة سؤالك!';

    await conn.sendMessage(m.chat, {
      text: answer,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: '𝑌𝐴𝐺𝐴𝑀𝐼 𝐿𝐼𝐺𝐻𝑇',
          body: '𝙎𝙖𝙨𝙪𝙠𝙚﹝⚡️﹞𝘽𝙤𝙩',
          thumbnailUrl: 'https://files.catbox.moe/85psqn.jpg',
          sourceUrl: 'https://whatsapp.com/channel/0029VaklBGFHFxOwODjsoP13'
        },
      },
    }, { quoted: m });

    memory[userId].push({ role: 'assistant', content: answer });
  } catch (e) {
    console.error(e);
    m.reply('⚠️ حدث خطأ أثناء معالجة طلبك. حاول مرة أخرى لاحقًا!');
  }
};

handler.help = ['حذف_ذاكرة_لايت'];
handler.tags = ['AI'];
handler.command = /^(لايت|حذف_ذاكرة_لايت)$/i;

export default handler;