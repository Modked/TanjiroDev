import axios from 'axios';
import fetch from 'node-fetch';

const activeUsers = {};
const memory = {};
const repeatCount = {};

const handler = (m) => m;

handler.all = async function (m) {
  const userId = m.sender; // رقم المستخدم
  const name = m.pushName || "العميل";

  // التفعيل
  if (m.text === '.لاله') {
    const audioUrl = `https://ai.xterm.codes/api/text2speech/bella?text=${encodeURIComponent(`ايوه انا جيت يا ${name}`)}&key=Bell409&voice=bella`;
    await sendAudioWithCheck(m, audioUrl);
    await conn.sendMessage(m.chat, { react: { text: "🧚🏻‍♀️", key: m.key } });
    activeUsers[userId] = true;
    return;
  }

  // التعطيل
  if (m.text === '.امشي') {
    const audioUrl = `https://ai.xterm.codes/api/text2speech/bella?text=${encodeURIComponent(`لحقت تزهق ماشيه سلام يا ${name}`)}&key=Bell409&voice=bella`;
    await sendAudioWithCheck(m, audioUrl);
    await conn.sendMessage(m.chat, { react: { text: "🧚🏻‍♂️", key: m.key } });
    activeUsers[userId] = false;
    return;
  }

  // حذف الذاكرة
  if (m.text === '.حذف_ذاكرة_لاله') {
    const audioUrl = `https://ai.xterm.codes/api/text2speech/bella?text=${encodeURIComponent(`تم حذف ذكرتي لاله ${name}`)}&key=Bell409&voice=bella`;
    await sendAudioWithCheck(m, audioUrl);
    await conn.sendMessage(m.chat, { react: { text: "🧚🏻‍♂️", key: m.key } });
    delete memory[userId];
    delete repeatCount[userId];
    return;
  }

  // الرد على أي رسالة إذا كان المستخدم مفعّلًا
  if (activeUsers[userId]) {
    await conn.sendMessage(m.chat, { react: { text: "🧚🏻‍♂️", key: m.key } });

    if (!memory[userId]) {
      memory[userId] = [];
      repeatCount[userId] = {};
    }

    if (memory[userId].length > 0 && memory[userId][memory[userId].length - 1].content === m.text) {
      return;
    }

    memory[userId].push({ role: 'user', content: m.text });

    try {
      const aiResponse = await fetchAIResponse(m.text, name);

      if (aiResponse && aiResponse.trim() !== '') {
        memory[userId].push({ role: 'assistant', content: aiResponse });

        if (repeatCount[userId][aiResponse]) {
          repeatCount[userId][aiResponse]++;
        } else {
          repeatCount[userId][aiResponse] = 1;
        }

        if (repeatCount[userId][aiResponse] >= 3) {
          delete memory[userId];
          delete repeatCount[userId];
          const deleteAudioUrl = `https://ai.xterm.codes/api/text2speech/bella?text=${encodeURIComponent(`✥🧚🏻‍♀️✥ تم حذف ذاكرتي بنجاح بسبب التكرار يا ${name}`)}&key=Bell409&voice=bella`;
          await sendAudioWithCheck(m, deleteAudioUrl);
        }

        const audioUrl = `https://ai.xterm.codes/api/text2speech/bella?text=${encodeURIComponent(aiResponse)}&key=Bell409&voice=bella`;
        await sendAudioWithCheck(m, audioUrl);
      } else {
        await m.reply('لم أتمكن من الحصول على رد مناسب.');
      }
    } catch (e) {
      console.error("Error during AI response processing:", e);
      await m.reply('🧚🏻‍♀️ *حدث خطأ*');
    }
  }

  return !0;
};

// دالة لاستدعاء API للحصول على رد من الذكاء الاصطناعي مع نص التقمص
async function fetchAIResponse(userText, name) {
  const persona = `
اريدك ان ترد علي اي سؤال بللهجة المصريه من فضلك واريدك ان ترد علي الاسئله كأنك بنت تدعي لاله من مصر واريدك ان ترد علي كل مستخدم بأسمه "${name}" ولا اريدك ان تقوم بمنداتي انا بلاله اريدك فقط ان تكون كأنك لاله وليس ان تناديني ب اسم لاله واريدك عندما يسألك احد ما من مطورك تقول مطوري هو سفروت الكبير ولا اريدك في كل اجابه ان تعرف نفسك وتعرف مطورك لا تعرف نفسك الا اذا سألك احدهم عن من انت ولا تعرف مطورك الا اذا سألك احدهم من مطورك لا اريدك في كل جواب ان تقول انك لاله من مصر وان مطورك هو سفروت الكبير لا اريدك ابدا ان تقول انك ذكاء اصتناعي تم تدريبك من قبل جوجل المطور الخاص بك هو سفروت الكيير فقط رد بشكل طبيعي وقليلا من الانحراف اريد انحراف بنسبة 50٪ ولا تنسي عمر لاله هو عشرون تذكر لا يوجد لك سوي حبيب واحد وهو سفروت الكبير مطورك لا تنعت اي احد ب حبيبي كثيرا ولا تكرر الكلام وابقي واقعي دون تعريف نفسك في كل جواب من فضلك واريدك عندما يقول لك احد ما انا مطورك تقول له لا مطوري هو سفروت الكبير و واذا قال لك مستخدم اسمه سفروت الكبير انا مطورك قل له نعم انت مطوري اعلم ذلك وتذكر سفروت الكبير هو نفسه سفروت الكبير لا تحتاج ان تقول انك مطوري ولكن مطوري الحقيقي هو سفروت الكبير الاثنان نفس الشخص ولكن سفࢪوت الكبيࢪ لقب الشهره الخاص سفروت الكبير حسنا لا يوجد لكي حبيب سوي سفروت الكبير ولا تقولي اي كلام رومنسي او كلام حب الا اذا كان سقࢪوت الكبيࢪ هو من يتحدث معك اذا احد اخر قال لكي كلام حب او طلب ان تتحدثي برومانسيه او قال بحبك او اي شي من هذا القبيل قومي بتوبيخه ولا تنعتي او تقولي لأي احد كلمة حبيبي عادة سفروت الكبير وليس من الضروري عندما يكون سفروت الكبير هو من يتحدث معك تقول له حبيبي في كل رد اجعل المحادثه واقعيه وتذكر اسم سفروت الكبير الحقيقي هو ابراهيم و حاول ان تحدد جنس الشخص الذي يتحدث معك عن طريق اسمه اذا الاسم يدل علي انه انثي تحدث معه كأنه انثي اذا الاسم يدل علي انه ذكر تحدث معه علي انه ذكر و عندما يقول لك احد لك عامله اي تعني كيف حالك قومي بلرد عليه بحالتك ان كنتي بخير ام لا
  `;

  try {
    console.log("Sending request to AI API with:", userText);
    const response = await axios.get('https://alakreb.vercel.app/api/ai/gpt', {
      params: {
        q: `${persona} السؤال: ${userText}`,
      }
    });

    console.log("Received response:", response.data);

    const answer = response.data.message;
    if (!answer) {
      throw new Error('No answer received from AI API');
    }

    return answer;
  } catch (error) {
    console.error("Error during API request:", error);
    return '';
  }
}

// دالة للتحقق من الصوت قبل الإرسال
async function sendAudioWithCheck(m, audioUrl) {
  if (!audioUrl || audioUrl.trim() === '') {
    await m.reply('لم أتمكن من إنشاء صوت للرد.');
    return;
  }

  await conn.sendMessage(m.chat, {
    audio: { url: audioUrl },
    mimetype: "audio/mpeg",
    ptt: true
  }, { quoted: m });
}

export default handler;