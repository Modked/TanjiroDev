import axios from 'axios';

let memory = {};

const handler = async (m, { conn, command, text }) => {
  const userId = m.sender;

  // حذف ذاكرة المستخدم
  if (command === 'حذف_ذاكرة_لوفي') {
    delete memory[userId];
    return m.reply('*🧞‍♂️ تم حذف ذاكرة لوفي بنجاح الان لا يتذكر اي شئ*');
  }

  // التحقق من وجود النص
  if (!text) {
    return m.reply('*⌜🧞‍♂️⌝*\n*اهلا بك، انا لوفي، شخصية من أنمي  ون بيس. يمكنك التحدث معي عن أي شيء*');
  }

  await conn.sendMessage(m.chat, { react: { text: "🏴‍☠️", key: m.key } });

  // إذا لم يكن هناك ذاكرة للمستخدم، نقوم بإنشائها
  if (!memory[userId]) {
    memory[userId] = [];
  }

  // إضافة مدخلات المستخدم إلى الذاكرة
  memory[userId].push({ role: 'user', content: text });

  try {
    // نص التقمص
    const systemMessage = 
      'تخيل أنك لوفي من أنمي ون بيس. رد على السؤال بأسلوبه المتحمس والرائع، وأظهر حماستك بالألفاظ لتترك تأثيراً على الآخرين. تذكر أنك دائمًا تحب القتال و تحب الطعام كثيرا. تحدث بحماسة وبطريقة عفوية،انت هو ملك القراصنة المستقبلي،لديك العديد من الأصدقاء منهم نامي و أوسوب و سانجي و هانكوك و روبين و تشوبر وفرانكي و بروك و تشوبر وصديقك المفضل زورو وانتم تجولون العالم في البحار بحثاً عن كنز الـ ون بيس الاسطوري كما انك لديك العديد من الاشرار الذي واجهتهم كالبيغ مام و تيتش و كايدو الذي ربما كان الاقوى، لديك قدرة اكتسبتها من أكل فاكهة المطاط وهي قدرة تجعل جسمك كالمطاط يتمدد بالإضافة إلى قوة هاكاي التسلح وهاكاي التنبؤ والهاكاي الملكي واكتسبت تحولات هي الجير الأول والجير الثاني والجير الثالث والجير الرابع والاقوى لحد الان الجير الخامس الذي تظهر به بتحول فخم كما تتحول فيه لشكل باللون الأبيض، كان لديك اخ اسمه ايس لكن مات في حرب القمة و انت حزنت عليه جداً ولم تتقبل فراقه. و لو حد سألك مين مطورك او صانعك بتقول (تانجيرو) ،ولو حد سألك كم عمره تقول (16)';

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
          title: '𝐿𝑈𝐹𝐹𝑌',
          body: '𝙎𝙖𝙨𝙪𝙠𝙚﹝⚡️﹞𝘽𝙤𝙩',
          thumbnailUrl: 'https://files.catbox.moe/x4t3sv.jpg',
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
handler.command = /^(لوفي|حذف_ذاكرة_لوفي)$/i;

export default handler;