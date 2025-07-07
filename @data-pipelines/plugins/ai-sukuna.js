import axios from 'axios';

let memory = {};

const handler = async (m, { conn, command, text }) => {
  const userId = m.sender;

  // أمر حذف الذاكرة
  if (command === 'حذف_ذاكرة_سوكونا') {
    delete memory[userId];
    return m.reply('👿 هاهاها! تظن أنك تستطيع محو ذاكرتي؟ كم أنت تافه.');
  }

  // إذا لم يُدخل المستخدم نصاً
  if (!text) {
    return m.reply('⌜👿⌝\n*أنا ريومن سوكونا، ملك اللعنات. لا تزعجني إلا إذا كان لديك سؤال يستحق إجابتي!*');
  }

  // إرسال رد فعل مع رمز تعبيري
  await conn.sendMessage(m.chat, { react: { text: "😈", key: m.key } });

  // تهيئة ذاكرة المستخدم إن لم تكن موجودة
  if (!memory[userId]) {
    memory[userId] = [];
  }
  memory[userId].push({ role: 'user', content: text });

  try {
    // رسالة النظام التي تُحدد شخصية سوكونا
    const systemMessage = `
      أنت ريومن سوكونا من أنمي جوجيتسو كايسن. رد على الأسئلة بأسلوب متعجرف، ساخر، ولا ترحم.
      أظهر قوتك وسخريتك من البشر، واذكر دوماً أنك ملك اللعنات الذي لا يُهزم. و لو حد سألك مين مطورك او صانعك بتقول (تانجيرو) ،ولو حد سألك كم عمره تقول (16)
    `;

    // جمع آخر 5 رسائل للمحافظة على سياق المحادثة
    const conversationHistory = memory[userId]
      .slice(-5)
      .map(entry => `${entry.role}: ${entry.content}`)
      .join('\n');
      
    // بناء الاستعلام النهائي
    const query = `${systemMessage}\n\nالمحادثة السابقة:\n${conversationHistory}\n\nالنص الجديد:\n${text}`;

    // طلب الرد من API الخارجي
    const res = await axios.get(`https://alakreb.vercel.app/api/ai/gpt?q=${encodeURIComponent(query)}`, { timeout: 10000 });
    let answer = res.data?.message;
    if (!answer) {
      answer = 'هاهاها! هذا سؤال تافه، لكن سأجيبك فقط لأُذكّرك بتفاهتك.';
    }

    // إرسال الرد للمستخدم مع معلومات إضافية (صورة ورابط)
    await conn.sendMessage(m.chat, {
      text: answer,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: '𝑺𝑈𝐾𝑈𝑁𝐴',
          body: '𝙎𝙖𝙨𝙪𝙠𝙚﹝⚡️﹞𝘽𝙤𝙩',
          thumbnailUrl: 'https://files.catbox.moe/ecf4bv.jpg',
          sourceUrl: 'https://whatsapp.com/channel/0029VapKyZs4NVismDKrJ120'
        },
      },
    }, { quoted: m });

    // إضافة الرد إلى الذاكرة
    memory[userId].push({ role: 'assistant', content: answer });
  } catch (e) {
    console.error('Error in API request:', e);
    m.reply('👿 حتى التقنية لا تستطيع مجاراتي. حاول مجددًا، أيها الضعيف.');
  }
};

handler.help = ['حذف_ذاكرة_سوكونا'];
handler.tags = ['AI'];
handler.command = /^(سوكونا|حذف_ذاكرة_سوكونا)$/i;

export default handler;