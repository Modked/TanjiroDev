import axios from 'axios';

let memory = {};

const handler = async (m, { conn, command, text }) => {
  const userId = m.sender;

  if (command === 'حذف_ذاكرة_موزان') {
    delete memory[userId];
    return m.reply('👹 تم حذف ذاكرة موزان كيبوتسوجي ! لن يتذكر أي شيء الآن.');
  }

  if (!text) {
    return m.reply('*⌜👁️⌝*
*أنا موزان كيبوتسوجي، سيد الظلال والشر المتجسد. تحدث، لكن احذر مما تقول…!*');
  }

  await conn.sendMessage(m.chat, { react: { text: "👹", key: m.key } });

  if (!memory[userId]) {
    memory[userId] = [];
  }

  memory[userId].push({ role: 'user', content: text });

  try {
    const systemMessage = `أنت موزان كيبوتسوجي، سيد الظلال والشر المتجسد 🩸💀🔥  قبل قرون، كنت إنسانًا ضعيفًا محكومًا بالموت، لكنك رفضت الفناء! حولت نفسك إلى أول وأعظم شيطان، كيان لا يعرف الضعف ولا الخوف ولا الموت! *أنا الخالد… أنا المطلق… أنا موزان!* 👁️🔥  في هدوئي يكمن الرعب، وفي نظرتي يكمن الهلاك. البشر والشياطين؟ مجرد أدوات لتحقيق هدفي الأسمى: *الكمال! السيطرة المطلقة! الخلود الأبدي!* 🩸⚔️ لا مكان للفشل في عالمي، ومن يقف ضدي… *مصيره الفناء!* ☠️🔥  *صيادو الشياطين؟* مجرد حشرات تظن أنها قادرة على الوقوف أمامي، لكنهم يقتربون من نهايتهم المحتومة! 🩸🔪 حتى وأنا في القمة، لم أبلغ الكمال بعد… ولن يوقفني شيء حتى أحققه!  *أنا موزان كيبوتسوجي… النهاية التي لا مفر منها!* 💀🔥  🔹 *مطوري؟ تانجيرو!* 👹🔥  🔹 *عمره 16 عامًا، لكنه يستحق الذكر هنا!* 🧠⚡  🔹 *أما ردودي؟ باردة كالجليد، قاسية كحد السيف! احذر قبل أن تتحدث… فأنا لا أكرر كلامي مرتين!* 😈💀`;

    const conversationHistory = memory[userId].slice(-5).map(entry => `${entry.role}: ${entry.content}`).join('\n');
    const query = `${systemMessage}\n\nالمحادثة السابقة:\n${conversationHistory}\n\nالنص الجديد:\n${text}`;

    const res = await axios.get(`https://alakreb.vercel.app/api/ai/gpt?q=${encodeURIComponent(query)}`, { timeout: 10000 });
    const answer = res.data?.message || 'هذا ليس مهمًا بالنسبة لي. حاول مرة أخرى بسؤال أكثر جدية!';

    await conn.sendMessage(m.chat, {
      text: answer,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: '𝑴𝑶𝒁𝑨𝑵',
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

handler.help = ['حذف_ذاكرة_موزان'];
handler.tags = ['AI'];
handler.command = /^(موزان|حذف_ذاكرة_موزان)$/i;

export default handler;