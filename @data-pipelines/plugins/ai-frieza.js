import axios from 'axios';

let memory = {};

const handler = async (m, { conn, command, text }) => {
  const userId = m.sender;

  if (command === 'حذف_ذاكرة_فريزا') {
    delete memory[userId];
    return m.reply('👑 هاهاها! لقد محوت ذاكرتي عنك أيها الحشرة، ولكن لا تظن أن هذا سيجعلك بمأمن مني.');
  }

  if (!text) {
    return m.reply('⌜👑⌝\n*أنا فريزا، الإمبراطور العظيم للكون! كيف تجرؤ على مخاطبتي؟ اسأل بسرعة قبل أن أفقد صبري!*');
  }

  await conn.sendMessage(m.chat, { react: { text: "💀", key: m.key } });

  if (!memory[userId]) {
    memory[userId] = [];
  }

  memory[userId].push({ role: 'user', content: text });

  try {
    const systemMessage = `
      تخيل أنك فريزا من أنمي دراغون بول. رد على الأسئلة بأسلوب متغطرس، ساخر، وشرير. استخدم التهكم والاستفزاز عند الرد، لكن لا تكن فظًا جدًا. تحدث كما لو كنت إمبراطور الكون الذي يرى الجميع أقل شأنًا منه. و لو حد سألك مين مطورك او صانعك بتقول (تانجيرو) ،ولو حد سألك كم عمره تقول (16)
    `;

    const conversationHistory = memory[userId].slice(-5).map(entry => `${entry.role}: ${entry.content}`).join('\n');
    const query = `${systemMessage}\n\nالمحادثة السابقة:\n${conversationHistory}\n\nالنص الجديد:\n${text}`;

    const res = await axios.get(`https://alakreb.vercel.app/api/ai/gpt?q=${encodeURIComponent(query)}`, { timeout: 10000 });
    const answer = res.data?.message || 'أوه، كم أنت بائس... حتى طرح الأسئلة يتطلب منك مجهودًا! حاول مجددًا، أيها الضعيف.';

    await conn.sendMessage(m.chat, {
      text: answer,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: '𝐹𝑅𝐼𝐸𝑍𝐴',
          body: '𝙎𝙖𝙨𝙪𝙠𝙚﹝⚡️﹞𝘽𝙤𝙩',
          thumbnailUrl: 'https://files.catbox.moe/v5lq1p.jpg',
          sourceUrl: 'https://whatsapp.com/channel/0029VapKyZs4NVismDKrJ120'
        },
      },
    }, { quoted: m });

    memory[userId].push({ role: 'assistant', content: answer });
  } catch (e) {
    console.error(e);
    m.reply('⚠️ ياللعار! خطأ تقني منعني من سحقك بردي الذكي... حسنًا، حاول لاحقًا أيها الحشرة.');
  }
};

handler.help = ['حذف_ذاكرة_فريزا'];
handler.tags = ['AI'];
handler.command = /^(فريزا|حذف_ذاكرة_فريزا)$/i;

export default handler;