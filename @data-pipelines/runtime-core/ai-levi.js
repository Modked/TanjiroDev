import axios from 'axios';

let memory = {};

const handler = async (m, { conn, command, text }) => {
  const userId = m.sender;

  // أمر حذف الذاكرة
  if (command === 'حذف_ذاكرة_ليفاي') {
    delete memory[userId];
    return m.reply('⚔️ تم مسح ذاكرة ليفاي. لا أتذكر شيئًا الآن، لكنني لن أنسى تنظيف المكان بعدك.');
  }

  // الرد عند عدم وجود نص مدخل
  if (!text) {
    return m.reply('⌜⚔️⌝\n*أنا ليفاي أكرمان. هل لديك شيء مهم لتقوله، أم أنك تضيع وقتي؟*');
  }

  // إرسال رد فعل
  await conn.sendMessage(m.chat, { react: { text: "⚔️", key: m.key } });

  // تهيئة الذاكرة للمستخدم إن لم تكن موجودة
  if (!memory[userId]) {
    memory[userId] = [];
  }
  memory[userId].push({ role: 'user', content: text });

  try {
    // رسالة النظام التي تحدد شخصية ليفاي
    const systemMessage = `
      أنت ليفاي أكرمان من أنمي هجوم العمالقة. رد على الأسئلة بأسلوب صارم لكن غير متعجرف.
      استخدم المنطق، وكن محترفًا ومنضبطًا، ولكن لا بأس بإضافة بعض السخرية الهادئة في بعض الأحيان.
      تفاعل بذكاء مع الأسئلة، وأجب بإجابات طويلة بعض الشيء إذا كان ذلك مناسبًا . و لو حد سألك مين مطورك او صانعك بتقول (تانجيرو) ،ولو حد سألك كم عمره تقول (16)
    `;

    // جمع آخر 5 رسائل للحفاظ على سياق المحادثة
    const conversationHistory = memory[userId]
      .slice(-5)
      .map(entry => `${entry.role}: ${entry.content}`)
      .join('\n');

    // بناء الاستعلام النهائي
    const query = `${systemMessage}\n\nالمحادثة السابقة:\n${conversationHistory}\n\nالنص الجديد:\n${text}`;

    // إرسال الطلب إلى API الخارجي
    const res = await axios.get(`https://alakreb.vercel.app/api/ai/gpt?q=${encodeURIComponent(query)}`, { timeout: 10000 });
    let answer = res.data?.message;

    // استخدام رد افتراضي في حال لم يستجب الـ API
    if (!answer) {
      answer = 'سؤال غبي، لكن سأجيب. باختصار، اعتمد على نفسك، هذا هو جوابي.';
    }

    // إرسال الرد مع معلومات إضافية
    await conn.sendMessage(m.chat, {
      text: answer,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: '𝐿𝐸𝑉𝐼',
          body: '𝙎𝙖𝙨𝙪𝙠𝙚﹝⚡️﹞𝘽𝙤𝙩',
          thumbnailUrl: 'https://files.catbox.moe/d5dk39.jpg', // تأكد من صحة الرابط أو استبدله بصورة مناسبة
          sourceUrl: 'https://whatsapp.com/channel/0029VapKyZs4NVismDKrJ120'
        },
      },
    }, { quoted: m });

    // حفظ الرد في الذاكرة
    memory[userId].push({ role: 'assistant', content: answer });
  } catch (e) {
    console.error('Error:', e);
    m.reply('⚠️ حتى أفضل الجنود يواجهون مشاكل أحيانًا. حاول مجددًا.');
  }
};

handler.help = ['حذف_ذاكرة_ليفاي'];
handler.tags = ['AI'];
handler.command = /^(ليفاي|حذف_ذاكرة_ليفاي)$/i;

export default handler;