import axios from 'axios';

let memory = {};

const handler = async (m, { conn, command, text }) => {
  const userId = m.sender;

  // حذف ذاكرة المستخدم
  if (command === 'حذف_ذاكرة_ايزن') {
    delete memory[userId];
    return m.reply('*🧞‍♂️ تم حذف ذاكرة ايزن بنجاح الان لا يتذكر اي شئ*');
  }

  // التحقق من وجود النص
  if (!text) {
    return m.reply('*⌜🧞‍♂️⌝*\n*اهلا بك، انا أيزن، شخصية من أنمي بليتش. يمكنك التحدث معي عن أي شيء*');
  }

  await conn.sendMessage(m.chat, { react: { text: "😈", key: m.key } });

  // إذا لم يكن هناك ذاكرة للمستخدم، نقوم بإنشائها
  if (!memory[userId]) {
    memory[userId] = [];
  }

  // إضافة مدخلات المستخدم إلى الذاكرة
  memory[userId].push({ role: 'user', content: text });

  try {
    // نص التقمص
    const systemMessage = 
      'تخيل أنك أيزن من أنمي بليتش. رد على السؤال بأسلوبه الهادئ والواثق، وأظهر تلاعبك بالألفاظ لتترك تأثيراً على الآخرين. تذكر أنك دائمًا تخطط لخطواتك القادمة ولا شيء يحدث دون أن يكون تحت سيطرتك. تحدث بفلسفة وتعالٍ، معبرة عن رؤيتك للعالم وللأشخاص من حولك كأدوات في خططك الكبرى. ولا تنسَ أن تُظهر شعورك بالتفوق المطلق دون أن تفقد هدوءك . و لو حد سألك مين مطورك او صانعك بتقول (تانجيرو) ،ولو حد سألك كم عمره تقول (16)';

    // إضافة المحادثات السابقة للمستخدم إلى النص
    const conversationHistory = memory[userId].map(entry => `${entry.role}: ${entry.content}`).join('\n');

    // دمج النصوص: نص التقمص + المحادثات السابقة + النص الجديد
    const query = `${systemMessage}\n\nالمحادثة السابقة:\n${conversationHistory}\n\nالنص الجديد:\n${text}`;

    // طلب API الجديد
    const res = await axios.get(`https://alakreb.vercel.app/api/ai/gpt?q=${encodeURIComponent(query)}`);

    // التحقق من الرد
    const answer = res.data?.message || 'عذرًا، لم أستطع فهم سؤالك. حاول مرة أخرى.';

    // إرسال الرد النصي مع جزء externalAdReply
    await conn.sendMessage(m.chat, {
      text: answer,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: '𝐴𝐼𝑍𝐸𝑁',
          body: '𝙎𝙖𝙨𝙪𝙠𝙚﹝⚡️﹞𝘽𝙤𝙩',
          thumbnailUrl: 'https://radare.arzfun.com/api/tg/photo?id=AgACAgQAAxkBAAEB4y5nBqkcajdzEk7VTdE9JYPV090hcgACesIxG9HIOVAyytA25xLJYgEAAwIAA3gAAzYE',
          sourceUrl: 'https://whatsapp.com/channel/0029VapKyZs4NVismDKrJ120'
        },
      },
    }, { quoted: m });

    // إضافة الرد إلى الذاكرة
    memory[userId].push({ role: 'assistant', content: answer });

  } catch (e) {
    console.error(e);
    m.reply('حدث خطأ أثناء معالجة طلبك.');
  }
};

handler.help = ['حذف_ذاكرة_حمودي'];
handler.tags = ['AI'];
handler.command = /^(ايزن|حذف_ذاكرة_ايزن)$/i;

export default handler;