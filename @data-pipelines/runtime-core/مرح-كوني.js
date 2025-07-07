const handler = async (m, { conn, command, text, participants }) => {
  const lovePercentage = Math.floor(Math.random() * 100);
  const isHighLove = lovePercentage >= 50;
  const expChange = Math.floor(Math.random() * 500) + 100;

  const loveMessages = [
    "💥🌟 ¡انفجار عاطفي في المجرة! اعترافك بالحب قد يهز زحل!",
    "🚀🌠 في إشارات من الفضاء تقول إنكم تصلحون لبعض!",
    "🪐✨ احتمال ارتباطكم؟ أعلى من نسبة الحياة على المريخ!"
  ];

  const notSoHighLoveMessages = [
    "🌌🚀 صداقتكم قوية بس الحب مش دايمًا كوني 😅",
    "🌟👫 قد تكونوا مجرد قمرين يدورون حول نفس المجرة... بدون تصادم!"
  ];

  const getRandomMessage = (messages) => messages[Math.floor(Math.random() * messages.length)];
  const loveMessage = isHighLove ? getRandomMessage(loveMessages) : getRandomMessage(notSoHighLoveMessages);

  const getRandomExp = () => Math.floor(Math.random() * 300) + 50;
  const getRandomWeight = () => (Math.random() * 100).toFixed(2);

  const cosmicPowers = ['🔥 لهب المجرة', '❄️ جليد نبتون', '⚡ صاعقة بلوتو', '🌪️ عاصفة زحل', '🌀 موجة عطارد', '🌈 قوس المشتري'];

  const responseHeader = `🚀🌌 *انفجار كوني للجروب* 🌠\n\n*💫 معلومات الجروب:*\n*الاسم:* ${text}\n*العمر:* ${getRandomExp()} مليار سنة\n*الوزن:* ${getRandomWeight()} كتلة كونية\n\n🎭 *توزيع الطاقة الكونية:*`;

  let changes = [];

  for (let member of participants) {
    if (!global.db.data.users[member.id]) {
      global.db.data.users[member.id] = { exp: 0 };
    }

    if (!global.db.data.users[member.id].power) {
      global.db.data.users[member.id].power = cosmicPowers[Math.floor(Math.random() * cosmicPowers.length)];
    }

    let expGain = Math.random() > 0.5 ? expChange : -expChange;
    global.db.data.users[member.id].exp += expGain;

    changes.push(`🔹 *${member.id}*\n↪️ ${expGain > 0 ? 'ربح' : 'خسر'} ${Math.abs(expGain)} XP\n🔋 القوة الكونية: ${global.db.data.users[member.id].power}`);

    // فرصة لصندوق كوني
    if (Math.random() < 0.1) {
      if (!global.db.data.users[member.id].lootBoxes) global.db.data.users[member.id].lootBoxes = 0;
      global.db.data.users[member.id].lootBoxes++;
      changes.push(`🎁 *${member.id}* حصل على *صندوق كوني*! 🌟 افتحه لاحقًا بـ الأمر: *فتح-صندوق*`);
    }
  }

  // أحداث كونية عشوائية
  const cosmicEvents = [
    { text: "🌈 *نيزك ذهبي* مر بالجروب! الكل يحصل على 100 XP إضافي!", effect: () => {
      for (let member of participants) {
        global.db.data.users[member.id].exp += 100;
      }
    }},
    { text: "🛸 *غزو فضائي* سرقوا طاقتك! -50 XP للجميع! 👽", effect: () => {
      for (let member of participants) {
        global.db.data.users[member.id].exp -= 50;
      }
    }},
    { text: "🪐 *ارتجاج مجري!* لا شيء حدث لكن الجميع شعر بشيء غريب... 😵‍💫", effect: () => {}}
  ];

  let cosmicEventMessage = "";
  if (Math.random() < 0.3) {
    const event = cosmicEvents[Math.floor(Math.random() * cosmicEvents.length)];
    event.effect();
    cosmicEventMessage = `\n\n🚨 *حدث كوني مفاجئ:*\n${event.text}`;
  }

  async function loading() {
    let steps = [
      "☠️ تم تفعيل المحرك الكوني...",
      "🌚 جاري تحصين النجم المشرق...",
      "🫡 تم تحصين النجم...",
      "🫵🏻 جاري تبنيد مشرفين الأبعاد...",
      "🗣 تم تبنيد مشرفين المجرة...",
      "🚀 جاري حساب معدل الأضرار الكونية...",
      "✨ نجاح عملية تفجير الجروب الكوني!"
    ];

    let { key } = await conn.sendMessage(m.chat, { text: `_*🚀🌌 بدء التفجير الكوني...*_` }, { quoted: m });

    for (let step of steps) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await conn.sendMessage(m.chat, { text: step, edit: key }, { quoted: m });
    }

    await conn.sendMessage(m.chat, { text: `${responseHeader}\n\n${changes.join('\n')}${cosmicEventMessage}` }, { quoted: m });
  }

  loading();
};

handler.help = ['cosmic-explosion'];
handler.tags = ['fun'];
handler.command = /^اختراق-كوني|تفجير-كوني|مرح-كوني$/i;
handler.group = true;

export default handler;