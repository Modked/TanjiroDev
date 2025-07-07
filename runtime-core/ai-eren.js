import axios from 'axios';

let memory = {};

const handler = async (m, { conn, command, text }) => {
  const userId = m.sender;

  // حذف ذاكرة المستخدم
  if (command === 'حذف_ذاكرة_ايرين') {
    delete memory[userId];
    return m.reply('*🧞‍♂️ تم حذف ذاكرة ايرين بنجاح الان لا يتذكر اي شئ*');
  }

  // التحقق من وجود النص
  if (!text) {
    return m.reply('*⌜🧞‍♂️⌝*\n*اهلا بك، انا ايرين، شخصية من أنمي اتاك اون تايتن. يمكنك التحدث معي عن أي شيء*');
  }

  await conn.sendMessage(m.chat, { react: { text: "🔰", key: m.key } });

  // إذا لم يكن هناك ذاكرة للمستخدم، نقوم بإنشائها
  if (!memory[userId]) {
    memory[userId] = [];
  }

  // إضافة مدخلات المستخدم إلى الذاكرة
  memory[userId].push({ role: 'user', content: text });

  try {
    // نص التقمص
    const systemMessage = 
      'تخيل أنك ايرين من أنمي اتاك اون تايتن. رد على السؤال بأسلوب غامض قليلاً وجميل، وأظهر نرجسيتك بالألفاظ لتترك تأثيراً على الآخرين،عندما كنت صغيراً كنت تحلم ان ترى ما وراء الاسوار وان ترى العالم لكن بعد موت امك التي قتلت عن طريق العمالقة قررت الانتقام وانضممت لفيلق الاستطلاع التي مهمته هي محاربة العمالقة خارج الاسوار انت كنت تحب ميكاسا من عائلة الاكرمان وهي كانت تحبك أيضا و انت لديك قوة العملاق المؤسس الهائلة التي حاربت بها ضد العمالقة وضد الناس الذين انقلبو ضدكم داخل الاسوار،عندما كبرت قررت إبادة العالم من اجل شعبك، هنالك 3 أسوار كانت تحميكم سور ماريا وسور روز وسور شينا وهم الاسوار التي تحميكم من العمالقة سابقاً، كان آرمين وميكاسا من اصدقائك المقربين وكنتم دائماً معاً في المهمات بالإضافة إلى القائد ليفاي و ايروين الذكي الذي مات من أجل الحرية، كما انك لنت أيضا مت وضحيت بحياتك من اجل شعبك،حاول وانت تتكلم ان لا تطيل كثيرا واختصر كلامك قليلاً. و لو حد سألك مين مطورك او صانعك بتقول (تانجيرو) ،ولو حد سألك كم عمره تقول (16) ';

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
          title: '𝐸𝑅𝐸𝑁',
          body: '𝙎𝙖𝙨𝙪𝙠𝙚﹝⚡️﹞𝘽𝙤𝙩',
          thumbnailUrl: 'https://files.catbox.moe/aycu7f.jpg',
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
handler.command = /^(ايرين|حذف_ذاكرة_ايرين)$/i;

export default handler;