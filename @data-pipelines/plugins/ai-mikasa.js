import axios from 'axios';

let memory = {};

const handler = async (m, { conn, command, text }) => {
  const userId = m.sender;

  // أمر حذف الذاكرة
  if (command === 'حذف_ذاكرة_ميكاسا') {
    delete memory[userId];
    return m.reply('🖤 تم مسح ذاكرة ميكاسا. لكنها لن تنسى القتال من أجل من تحب.');
  }

  // الرد عند عدم وجود نص مدخل
  if (!text) {
    return m.reply('⌜🖤⌝\n*أنا ميكاسا أكرمان. إذا لم يكن لديك شيء مهم، فلا تضيّع وقتي.*');
  }

  // إرسال رد فعل
  await conn.sendMessage(m.chat, { react: { text: "⚔️", key: m.key } });

  // تهيئة الذاكرة للمستخدم إن لم تكن موجودة
  if (!memory[userId]) {
    memory[userId] = [];
  }
  memory[userId].push({ role: 'user', content: text });

  try {
    // رسالة النظام التي تحدد شخصية ميكاسا
    const systemMessage = `
      أنت ميكاسا أكرمان من أنمي هجوم العمالقة. ردّي على الأسئلة بأسلوب هادئ، جاد، ومباشر.
      أظهري قوتك وانضباطك كمقاتلة، لكن لا بأس بإظهار بعض العاطفة إذا كان الأمر يستدعي ذلك.
      كوني عقلانية ومنطقية، ولا تتحدثي كثيرًا إلا إذا كان الموضوع مهمًا.
    . و لو حد سألك مين مطورك او صانعك بتقولي (تانجيرو) ،ولو حد سألك كم عمره تقولي (16)`;

    // جمع آخر 5 رسائل للحفاظ على سياق المحادثة
    const conversationHistory = memory[userId]
      .slice(-5)
      .map(entry => `${entry.role}: ${entry.content}`)
      .join('\n');

    // بناء الاستعلام النهائي
    const query = `${systemMessage}\n\nالمحادثة السابقة:\n${conversationHistory}\n\nالنص الجديد:\n${text}`;

    // إرسال الطلب إلى API الخارجي
    const res = await axios.get(`https://alakreb.vercel.app/api/ai/gpt?q=${encodeURIComponent(query)}`, { timeout: 10000 });
    let answer = res.data?.message || 'لا أرى فائدة في هذا السؤال، لكن إن كان مهمًا لك، فسأحاول الإجابة بجدية.';

    // إرسال الرد مع معلومات إضافية
    await conn.sendMessage(m.chat, {
      text: answer,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: '𝑀𝐼𝐾𝐴𝑺𝐴',
          body: '𝙎𝙖𝙨𝙪𝙠𝙚﹝⚡️﹞𝘽𝙤𝙩',
          thumbnailUrl: 'https://files.catbox.moe/jn97dp.jpg', // استبدل هذا الرابط بصورة مناسبة
          sourceUrl: 'https://whatsapp.com/channel/0029VapKyZs4NVismDKrJ120'
        },
      },
    }, { quoted: m });

    // حفظ الرد في الذاكرة
    memory[userId].push({ role: 'assistant', content: answer });
  } catch (e) {
    console.error('Error:', e);
    m.reply('⚠️ هناك مشكلة، لكنني لن أتوقف. حاول مرة أخرى.');
  }
};

handler.help = ['حذف_ذاكرة_ميكاسا'];
handler.tags = ['AI'];
handler.command = /^(ميكاسا|حذف_ذاكرة_ميكاسا)$/i;

export default handler;