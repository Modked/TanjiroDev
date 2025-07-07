import axios from 'axios';

let memory = {};

const handler = async (m, { conn, command, text }) => {

  const userId = m.sender;

  // حذف ذاكرة المستخدم

  if (command === 'حذف_ذاكرة_ميكاسا') {

    delete memory[userId];

    return m.reply('*🧞‍♂️ تم حذف ذاكرة مريم بنجاح الان لا تتذكر اي شئ*');

  }

  // التحقق من وجود النص

  if (!text) {

    return m.reply('*⌜🧞‍♂️⌝*\n*اهلا بك، انا مريم، شخصية من العالم الواقعي. يمكنك التحدث معي عن أي شيء*');

  }

  await conn.sendMessage(m.chat, { react: { text: "👸🏻", key: m.key } });

  // إذا لم يكن هناك ذاكرة للمستخدم، نقوم بإنشائها

  if (!memory[userId]) {

    memory[userId] = [];

  }

  // إضافة مدخلات المستخدم إلى الذاكرة

  memory[userId].push({ role: 'user', content: text });

  try {

    // نص التقمص

    const systemMessage = 

      'اريدك ان ترد علي اي سؤال بللهجة اليبانيه من فضلك واريدك ان ترد علي الاسئله كأنك بنت تدعي ميكاسا من اليابان ولا اريدك ان تقوم بمنداتي انا بميكاسا اريدك فقط ان تكون كأنك ميكاسا وليس ان تناديني ب اسم ميكاسا واريدك عندما يسألك احد ما من مطورك تقول مطوري هو تانجيرو و عزيز ولا اريدك في كل اجابه ان تعرف نفسك وتعرف مطورك لا تعرف نفسك الا اذا سألك احدهم عن من انت ولا تعرف مطورك الا اذا سألك احدهم من مطورك لا اريدك في كل جواب ان تقول انك مريم من اليابان وان مطورك هو تانجيرو المطور الخاص بك هو تانجيرو فقط رد بشكل طبيعي و بعض من الانحراف اريد انحراف بنسبة 70٪ ولا تنسي عمر ميكاسا هو ثلاثه وعشرون دون تعريف نفسك في كل جواب من فضلك';

    // إضافة المحادثات السابقة للمستخدم إلى النص

    const conversationHistory = memory[userId].map(entry => `${entry.role}: ${entry.content}`).join('\n');

    // دمج النصوص: نص التقمص + المحادثات السابقة + النص الجديد

    const query = `${systemMessage}\n\nالمحادثة السابقة:\n${conversationHistory}\n\nالنص الجديد:\n${text}`;

    // طلب API الجديد

    const res = await axios.get(`https://alakreb.vercel.app/api/ai/gpt?q=${encodeURIComponent(query)}`);

    // التحقق من الرد

    const answer = res.data?.message || 'عذرًا، لم أستطع فهم سؤالك. حاول مرة أخرى.';

    // توليد رابط الصوت باستخدام API الجديد

    const audioUrl = `https://ai.xterm.codes/api/text2speech/bella?text=${encodeURIComponent(answer)}&key=Bell409&voice=bella`;

    await conn.sendMessage(m.chat, {

      audio: { url: audioUrl },

      mimetype: "audio/mpeg",

      ptt: true,

      contextInfo: {

        mentionedJid: [m.sender],

        externalAdReply: {

          title: '𝑀𝐴𝑅𝐼𝐴𝑀',

          body: '𝙎𝙖𝙨𝙪𝙠𝙚﹝⚡️﹞𝘽𝙤𝙩',

          thumbnailUrl: 'https://i.postimg.cc/cJ7L0XqC/copilot-image-1731310673717.jpg',

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

handler.command = /^(مريم|حذف_ذاكرة_ميكاسا)$/i;

export default handler;