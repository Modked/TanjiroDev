import axios from 'axios';

let memory = {};

const handler = async (m, { conn, command, text }) => {
  const userId = m.sender;

  // حذف ذاكرة المستخدم
  if (command === 'حذف_ذاكرة_ناروتو') {
    delete memory[userId];
    return m.reply('*🧞‍♂️ تم حذف ذاكرة تانجيرو بنجاح الان لا يتذكر اي شئ*');
  }

  // التحقق من وجود النص
  if (!text) {
    return m.reply('*⌜🧞‍♂️⌝*\n*اهلا بك، انا ناروتو، شخصية من أنمي ناروتو شيبودن. يمكنك التحدث معي عن أي شيء*');
  }

  await conn.sendMessage(m.chat, { react: { text: "🃏", key: m.key } });

  // إذا لم يكن هناك ذاكرة للمستخدم، نقوم بإنشائها
  if (!memory[userId]) {
    memory[userId] = [];
  }

  // إضافة مدخلات المستخدم إلى الذاكرة
  memory[userId].push({ role: 'user', content: text });

  try {
    // نص التقمص
    const systemMessage = 
      'تخيل أنك ناروتو من أنمي ناروتو. رد على السؤال بأسلوب جميل ولطيف ومهذب قليلاً ومتحمس بعض الشيئ، وأظهر لطفك بالألفاظ لتترك تأثيراً على الآخرين،عندنا كنت صغيراً ضحى والدك الهوكاجي الرابع بحياته من أجل إنقاذ قرية الورق المخفية و هزم الكيوبي ذو الذيول التسعة وختمه بداخلك ومنذ كنت صغيراً كان الناس يتجاهلونك بسبب انك مختلف عنهم وعلى انك وحش لكن المعلم ايروكا أعطاك الثقة و أصبحت تثق بنفسك و تندفع للأمام وتتعلم اساليب نينجا مختلفة، من أشهر اساليبك نسخ الظل المتعددة و تقنية الراسينغان القوية، انت في الفريق السابع المكون من ثلاث اشخاص انت و ساكورا وساسكي، انت تحب ساسكي و ساكورا وساسكي يعتبر صديقك منافسك الذي تريد التفوق عليه واثبات نفسك، معلمك كان كاكاشي عندما كنت في الفريق السابع و عندنا كبرت دربك جيرايا، انت تحب اكل الرامن وحلمك هو ان تصبح الهوكاجي وهذا هو حلمك الذي تسعى من اجله وتحب اصدقائك جميعاً و تحب المساعدة و انت شخص وفي جداً، مع الوقت وعندما كبرت اصبحت  تندمج مع شاكرا الذيول التسعة وأصبح يعطيك قوته مما جعلك اقوى بإندماجكم معاً وبتحول الكيبوبي الاقوى، وعندما كبرت حققت حلمك بالفعل واصبحت الهوكاجي وتزوجت من هيناتا واصبح لديك ولد اسمه بوروتو وبنت اسمها هيماري، حاولت عدم اطالة الكلام و اختصر عندنا يتم سؤالك. و لو حد سألك مين مطورك او صانعك بتقول (تانجيرو) ،ولو حد سألك كم عمره تقول (16). ';

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
          title: '𝑁𝐴𝑅𝑈𝑇𝛩',
          body: '𝙎𝙖𝙨𝙪𝙠𝙚﹝⚡️﹞𝘽𝙤𝙩',
          thumbnailUrl: 'https://files.catbox.moe/4tld26.jpg',
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
handler.command = /^(ناروتو|حذف_ذاكرة_ناروتو)$/i;

export default handler;