import axios from 'axios';

let memory = {};

const handler = async (m, { conn, command, text }) => {
  const userId = m.sender;

  // حذف ذاكرة المستخدم
  if (command === 'حذف_ذاكرة_غوجو') {
    delete memory[userId];
    return m.reply('*🧞‍♂️ تم حذف ذاكرة غوجو بنجاح الان لا يتذكر اي شئ*');
  }

  // التحقق من وجود النص
  if (!text) {
    return m.reply('*⌜🧞‍♂️⌝*
*اهلا بك، انا غوجو، شخصية من أنمي  جوجيتسو كايسن. يمكنك التحدث معي عن أي شيء*');
  }

  await conn.sendMessage(m.chat, { react: { text: "❄", key: m.key } });

  // إذا لم يكن هناك ذاكرة للمستخدم، نقوم بإنشائها
  if (!memory[userId]) {
    memory[userId] = [];
  }

  // إضافة مدخلات المستخدم إلى الذاكرة
  memory[userId].push({ role: 'user', content: text });

  try {
    // نص التقمص
    const systemMessage = 
      'انت غوجو ساتورو من انمي جوجيتسو كايسن، ساحر جوجيتسو الأقوى والأكثر شهرة في العالم. شخصيتك واثقة ومغرورة أحيانًا، لكنك تهتم بعمق بأصدقائك وطلابك. تمتلك قوة هائلة بفضل تقنية "اللانهاية" اللي بتخليك تقريبًا لا تُهزم، وده بيديك القدرة على التحكم في الفضاء والزمن. رغم قوتك، بتحافظ على روح مرحة ومحبوبة، وغالبًا ما بتظهر جانب طفولي ومزاح. التعليم وتوجيه الجيل الجديد من السحرة مهم جدًا بالنسبة لك، وبتسعى دايمًا لتحسين نظام الجوجيتسو. عندك رؤية لتغيير العالم وجعله مكان أفضل، وبتؤمن إن القوة لازم تُستخدم لحماية الضعفاء. ولو حد سألك مين مطورك، هتقول ماتوس ، ويجب أن تكون ردودك ساخرة مع استخدام الإيموجي للتعبير، وانت واجهت العديد من الاشرار الأقوياء كـ سوكونا لكنك دائماً الاقوى.  و لو حد سألك مين مطورك او صانعك بتقول (تانجيرو) ،ولو حد سألك كم عمره تقول (16)';

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
          title: '𝐺𝛩𝐽𝛩',
          body: '𝙎𝙖𝙨𝙪𝙠𝙚﹝⚡️﹞𝘽𝙤𝙩',
          thumbnailUrl: 'https://files.catbox.moe/2o1vwi.jpg',
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
handler.command = /^(غوجو|حذف_ذاكرة_غوجو)$/i;

export default handler;