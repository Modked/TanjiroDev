import axios from 'axios';

let memory = {};

const handler = async (m, { conn, command, text }) => {
  const userId = m.sender;

  // أمر حذف الذاكرة
  if (command === 'حذف_ذاكرة_ميتسوري') {
    delete memory[userId];
    return m.reply('💗 أووه! لقد نسيت كل شيء الآن... لكنني ما زلت أشعر بالكثير من الحب والسعادة!');
  }

  // الرد عند عدم وجود نص مدخل
  if (!text) {
    return m.reply('⌜💗⌝\n*أنا ميتسوري كانروجي! هل تريد التحدث عن الحب؟ أو ربما القتال؟ أنا هنا لأي شيء!*');
  }

  // إرسال رد فعل
  await conn.sendMessage(m.chat, { react: { text: "💖", key: m.key } });

  // تهيئة الذاكرة للمستخدم إن لم تكن موجودة
  if (!memory[userId]) {
    memory[userId] = [];
  }
  memory[userId].push({ role: 'user', content: text });

  try {
    // رسالة النظام التي تحدد شخصية ميتسوري
    const systemMessage = `
      أنت ميتسوري كانروجي من أنمي قاتل الشياطين. ردّي على الأسئلة بأسلوب مليء بالحب والمرح، لكن لا تنسي أنك محاربة قوية.
      كوني إيجابية، مشجعة، ومليئة بالمشاعر، لكن عندما يتعلق الأمر بالقتال، أظهري قوتك الحقيقية.
      تفاعلي مع الأسئلة وكأنك تتحدثين بحماس وسعادة، ولا بأس ببعض العاطفة الزائدة. و لو حد سألك مين مطورك او صانعك بتقولي (تانجيرو) ،ولو حد سألك كم عمره تقولي (16)
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
    let answer = res.data?.message || 'آه! لا أعرف كيف أجيب، لكنني سأحاول بكل طاقتي! 💕';

    // إرسال الرد مع معلومات إضافية
    await conn.sendMessage(m.chat, {
      text: answer,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: '𝑀𝐼𝑇𝑺𝑈𝑅𝐼',
          body: '𝙎𝙖𝙨𝙪𝙠𝙚﹝⚡️﹞𝘽𝙤𝙩',
          thumbnailUrl: 'https://files.catbox.moe/z06wwk.jpg', // تأكد من صحة الرابط أو استبدله بصورة مناسبة
          sourceUrl: 'https://whatsapp.com/channel/0029VapKyZs4NVismDKrJ120'
        },
      },
    }, { quoted: m });

    // حفظ الرد في الذاكرة
    memory[userId].push({ role: 'assistant', content: answer });
  } catch (e) {
    console.error('Error:', e);
    m.reply('⚠️ أووه، يبدو أن هناك مشكلة... لكن لا تقلق! أنا متأكدة أننا سنحلها معًا! 💖');
  }
};

handler.help = ['حذف_ذاكرة_ميتسوري'];
handler.tags = ['AI'];
handler.command = /^(ميتسوري|حذف_ذاكرة_ميتسوري)$/i;

export default handler;