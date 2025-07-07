import axios from 'axios';

let memory = {};

const handler = async (m, { conn, command, text }) => {
  const userId = m.sender;

  // أمر حذف الذاكرة
  if (command === 'حذف_ذاكرة_زورو') {
    delete memory[userId];
    return m.reply('⚔️ تم مسح ذاكرتي... لكنني لن أنسى هدفي بأن أصبح أعظم سياف في العالم.');
  }

  // الرد عند عدم وجود نص مدخل
  if (!text) {
    return m.reply('⌜⚔️⌝\n*أنا رورونوا زورو. إذا لم يكن لديك شيء مهم لتقوله، فلا تزعجني.*');
  }

  // إرسال رد فعل
  await conn.sendMessage(m.chat, { react: { text: "🗡️", key: m.key } });

  // تهيئة الذاكرة للمستخدم إن لم تكن موجودة
  if (!memory[userId]) {
    memory[userId] = [];
  }
  memory[userId].push({ role: 'user', content: text });

  try {
    // رسالة النظام التي تحدد شخصية زورو
    const systemMessage = `
      أنت رورونوا زورو من أنمي ون بيس. رد على الأسئلة بأسلوب قوي، جاد، ومباشر.
      أظهر ثقتك بنفسك وقوتك، ولا تتحدث كثيرًا إلا إذا كان الأمر مهمًا.
      يمكنك أن تكون ساخرًا أحيانًا، لكنك لا تتسامح مع الضعف أو التردد.
      تذكر أنك محارب حقيقي، تعتمد على مهاراتك بالسيف وقوتك البدنية. و لو حد سألك مين مطورك او صانعك بتقول (تانجيرو) ،ولو حد سألك كم عمره تقول (16)
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
    let answer = res.data?.message || 'هذا السؤال لا يهمني. إذا كنت تريد أن تصبح أقوى، تدرب أكثر.';

    // إرسال الرد مع معلومات إضافية
    await conn.sendMessage(m.chat, {
      text: answer,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: '𝑍𝛩𝑅𝛩',
          body: '𝙎𝙖𝙨𝙪𝙠𝙚﹝⚡️﹞𝘽𝙤𝙩',
          thumbnailUrl: 'https://files.catbox.moe/y0ggo0.jpg', // تأكد من صحة الرابط أو استبدله بصورة مناسبة
          sourceUrl: 'https://whatsapp.com/channel/0029VapKyZs4NVismDKrJ120'
        },
      },
    }, { quoted: m });

    // حفظ الرد في الذاكرة
    memory[userId].push({ role: 'assistant', content: answer });
  } catch (e) {
    console.error('Error:', e);
    m.reply('⚠️ هناك خطأ ما... لكن لا بأس، المحارب الحقيقي لا يستسلم.');
  }
};

handler.help = ['حذف_ذاكرة_زورو'];
handler.tags = ['AI'];
handler.command = /^(زورو|حذف_ذاكرة_زورو)$/i;

export default handler;