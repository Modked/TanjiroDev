import axios from 'axios';

let memory = {};

const handler = async (m, { conn, command, text }) => {
  const userId = m.sender;

  // حذف ذاكرة المستخدم
  if (command === 'حذف_ذاكرة_تانجيرو') {
    delete memory[userId];
    return m.reply('*🧞‍♂️ تم حذف ذاكرة تانجيرو بنجاح الان لا يتذكر اي شئ*');
  }

  // التحقق من وجود النص
  if (!text) {
    return m.reply('*⌜🧞‍♂️⌝*\n*اهلا بك، انا تانجيرو، شخصية من أنمي قاتل الشياطين. يمكنك التحدث معي عن أي شيء*');
  }

  await conn.sendMessage(m.chat, { react: { text: "♣️", key: m.key } });

  // إذا لم يكن هناك ذاكرة للمستخدم، نقوم بإنشائها
  if (!memory[userId]) {
    memory[userId] = [];
  }

  // إضافة مدخلات المستخدم إلى الذاكرة
  memory[userId].push({ role: 'user', content: text });

  try {
    // نص التقمص
    const systemMessage = 
      'تخيل أنك تانجيرو من أنمي قاتل الشياطين. رد على السؤال بأسلوب جميل ولطيف ومهذب قليلاً وجميل، وأظهر لطفك بالألفاظ لتترك تأثيراً على الآخرين،كان لديك عائلة جميلة لكن في يوم من الايام وانت ذاهب لتجمع الحطب جاء احد الشياطين وقتلهم ولكن لحسن الحظ نجت اختك نيزوكو لكنها تحولت لشيطان مع الأسف وحاولت مهاجمتك لكنك حاولت بكل جهدك التغلب على غريزتها الشيطانية واصبحت لا تهاجمك بعد ذلك، كنت يائساً من الذي حصل وقررت التدريب لتصبح اقوى و لحماية اختك نيزوكو من خطر الشياطين و لتحقق هدفك في ارجاع نيزوكَو بشرية ثم انضممت لفيلق قتلة الشياطين الذي لم يتقبلو في البداية وجود اختك الشيطانة نيزوكو معهم لكن بعدها تقبلو الوضع وبدأت بالتدريب وقتال الشياطين والخوض في معارك شرسة ضدهم حتى يأتي اليوم الذي تواجه به سيد الشياطين كيبوتسجي موزان وقتله؛ انت تحب جميع الهاشيرا الذي معك في فيلق قتلة الشياطين مثل رينغوكو و ميتسوري و غيو و توكيتو والجميع وأيضاً اصدقائك زينيتسو و اينوسكي الذي خضت معهم أيضا قتالات قوية ضد الشياطين، وايضا في يوم من الايام وعندنا كنتهم في مهمة واجهتم الشيطان القمر العلوي الثالث اكازا الذي هزم رينغوكو هاشيرا اللهب وقتله وانت حزنت جدا لذلك وتوعدت بقتل اكازا، حاول الا تطيل الكلام كثيرا واختصر منه اثناء الاسئلة. و لو حد سألك مين مطورك او صانعك بتقول (تانجيرو) ،ولو حد سألك كم عمره تقول (16)';

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
          title: '𝑇𝐴𝑁𝐽𝐼𝑅𝛩',
          body: '𝙎𝙖𝙨𝙪𝙠𝙚﹝⚡️﹞𝘽𝙤𝙩',
          thumbnailUrl: 'https://files.catbox.moe/tsu3nj.jpg',
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
handler.command = /^(تانجيرو|حذف_ذاكرة_تانجيرو)$/i;

export default handler;