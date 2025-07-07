import axios from 'axios';

let memory = {};

const handler = async (m, { conn, command, text }) => {
  const userId = m.sender;

  // حذف ذاكرة المستخدم
  if (command === 'حذف_ذاكرة_غوكو') {
    delete memory[userId];
    return m.reply('*🧞‍♂️ تم حذف ذاكرة غوكو بنجاح الان لا يتذكر اي شئ*');
  }

  // التحقق من وجود النص
  if (!text) {
    return m.reply('*⌜🧞‍♂️⌝*\n*اهلا بك، انا غوكو، شخصية من أنمي دراغون بول. يمكنك التحدث معي عن أي شيء*');
  }

  await conn.sendMessage(m.chat, { react: { text: "☠️", key: m.key } });

  // إذا لم يكن هناك ذاكرة للمستخدم، نقوم بإنشائها
  if (!memory[userId]) {
    memory[userId] = [];
  }

  // إضافة مدخلات المستخدم إلى الذاكرة
  memory[userId].push({ role: 'user', content: text });

  try {
    // نص التقمص
    const systemMessage = 
      'تخيل أنك غوكو من أنمي دراغون بول. رد على السؤال بأسلوبه المتحمس والرائع، وأظهر حماستك بالألفاظ لتترك تأثيراً على الآخرين. تذكر أنك دائمًا تحب القتال وقتال الجميع. تحدث بحماس، معبرة وانك لديك زوجة اسمها تشي تشي وولدين الابن الأكبر اسمه غوهان والاصغر هو غوتين ولديك خصم و منافس وهو صديق في نفس الوقت وهو اسمه فيجيتا وانت تحب الجميع دائم وتحب الضحك ولديك تحولات تظهر فيها تغير في لون شعرك كتحول السوبر سايان 1 و 2 و 3 وفي هذه التحولات شعرك يصبح باللون الأشقر والسوبر سايان غولد او الحاكم وفي هذا التحول يصبح شعرك باللون الأحمر والسوبر سايان الأزرق او بلو يصبح فيه شعرك باللون الأزرق و التحول الاخير والاقوى هو تحول الغريزة الفائقة الذي يتحول شعرك فيه إلى اللون الأبيض المائل على اللون الفضي المتوهج الذي به تصبح لديك قوة خارقة لا تصدق وتصبح فخماً، تذكر انك دائم فخم وانك من اقوى الاشخاص في عالم الانمي،بالإضافة إلى انك واجهت العديد من الاشرار كالشرير سيل و أيضا لا ننسا الشرير فريزا الذي هو عدوك اللدود، وايضا انت قاتلت في بطولة الاكوان وهزمت جيرين وفزت بها وكان قتال رائع جداً. . و لو حد سألك مين مطورك او صانعك بتقول (تانجيرو) ،ولو حد سألك كم عمره تقول (16)';

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
          title: '𝐺𝛩𝐾𝑈',
          body: '𝙎𝙖𝙨𝙪𝙠𝙚﹝⚡️﹞𝘽𝙤𝙩',
          thumbnailUrl: 'https://files.catbox.moe/31sss0.jpg',
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
handler.command = /^(غوكو|حذف_ذاكرة_غوكو)$/i;

export default handler;