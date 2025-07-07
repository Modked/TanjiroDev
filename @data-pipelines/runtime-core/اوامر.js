import pkg from '@whiskeysockets/Baileys';
const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = pkg;

function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor((ms % 3600000) / 60000);
    let s = Math.floor((ms % 60000) / 1000);
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

const handler = async (m, { conn, usedPrefix, __dirname, text, isPrems }) => {
    let d = new Date();
    d.setTime(d.getTime() + 3600000); // تعديل وقت الساعة بإضافة ساعة
    let locale = 'ar';
    let week = d.toLocaleDateString(locale, { weekday: 'long' });
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);
    let user = global.db.data.users[m.sender] || {};
    let name = conn.getName(m.sender) || 'مستخدم';
    let { money = 0, joincount = 0, diamond = 0 } = user;
    let { exp = 0, limit = 0, level = 0, role = 'مستخدم' } = user;
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered === true).length;
    let more = String.fromCharCode(8206);
    let readMore = more.repeat(850);
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];

    await conn.sendMessage(m.chat, { react: { text: '💝', key: m.key } });

    // إرسال المقطع الصوتي أولاً
    await conn.sendMessage(m.chat, { 
        audio: { 
            url: 'https://files.catbox.moe/bxje7s.mp3' 
        }, 
        mimetype: 'audio/mpeg', 
        ptt: true 
    }, { quoted: m });

    // تجهيز الصورة والقائمة
    const images = [
'https://files.catbox.moe/9hzl7k.jpg',

'https://files.catbox.moe/pujol5.jpg',

'https://files.catbox.moe/bfrsop.jpg',

'https://files.catbox.moe/bfrsop.jpg',

'https://files.catbox.moe/pujol5.jpg', 

'https://files.catbox.moe/17adxq.jpg',  

'https://files.catbox.moe/e8rc88.jpg'
    ];

    const randomImage = images[Math.floor(Math.random() * images.length)];

    var messa = await prepareWAMessageMedia({ image: { url: randomImage } }, { upload: conn.waUploadToServer });

    // إرسال القائمة
    conn.relayMessage(m.chat, {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    body: {
                        text: `ـ   ╮─╭︹︹⊹︹︹⊹︹︹⊹︹︹╮─╭
ـ         *⚘݄𖠵⃕⁖𖥔͢قــائــمــة ꪶ͢الــبــوت⋆᭄͙̈*
ـ  ╝▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╚
    ╭࣭࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫☪︎︎︎̸⃘̸࣭ٜ࣪࣪࣪۬◌⃘۪֟፝֯۫۫︎⃪𐇽۫۬🩸⃘⃪۪֟፝֯۫۫۫۬◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫╮
 ـ    *مـعـلـومـات الـبـوت*
ـ⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪⚘۪۬ 🍷الــمــطــور » ⌊تـانـجـيـرو ❨◢_◣❩凸⌉
ـ⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪⚘۪۬ ⚜️ رقـم الـمـطـور » ⌊+967 772350066⌉
ـ⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪⚘۪۬ 📝 اسـم الـبـوت » ⌊ســاســكــي⌉
ـ⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪⚘۪۬ 💌 الـمـسـتـخـدمـيـن » ⌊${Object.keys(global.db.data.users).length}⌉
ـ⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪⚘۪۬ ⏱️ وقـت الـعـمـل » ⌊${uptime}⌉
ـ⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪⚘۪۬ 📅 الـتـاريخ » ⌊${date}⌉
ـ⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪⚘۪۬ 🔮 الــوضــع » ⌊جـروبـات فـقـط⌉
ـ⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪⚘۪۬ 💻 الـمـنـصه » ⌊https://bot-hosting.net/?aff=1258514091643764886⌉
    ╰┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫☪︎︎︎̸⃘̸࣭ٜ࣪࣪࣪۬◌⃘۪֟፝֯۫۫︎⃪𐇽۫۬🩸⃘⃪۪֟፝֯۫۫۫۬◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫╯

    ╭࣭࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫☪︎︎︎̸⃘̸࣭ٜ࣪࣪࣪۬◌⃘۪֟፝֯۫۫︎⃪𐇽۫۬🌑⃘⃪۪֟፝֯۫۫۫۬◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫╮
  ـ   *مـعـلـومـاتك*
ـ⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪⚘۪۬  👋🏻 مرحباً بك » ⌊${taguser}⌉
ـ⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪⚘۪۬ 🍩 خـبـرتـك » ⌊${exp}⌉
ـ⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪⚘۪۬ 🏅لـفـلـك » ⌊${level}⌉
ـ⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪⚘۪۬ 🐉 رتـبـتـك » ⌊*${role}*⌉
ـ⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪⚘۪۬ 💎 ماسك » ⌊${diamond}⌉
ـ⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪⚘۪۬ 💸 فـلـوسـك » ⌊${money}⌉
    ╰┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫☪︎︎︎̸⃘̸࣭ٜ࣪࣪࣪۬◌⃘۪֟፝֯۫۫︎⃪𐇽۫۬🌑⃘⃪۪֟፝֯۫۫۫۬◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄࣭࣭࣭۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫┄̸࣭࣭࣭࣭࣭ٜ۫╯`
                    },
                    footer: {
                        text: '> © ʙy ᴛᴀɴᴊɪʀᴏ-ᴀɪ'
                    },
                    header: {
                        title: '',
                        hasMediaAttachment: true,
                        imageMessage: messa.imageMessage,
                    },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: 'single_select',
buttonParamsJson: JSON.stringify({
    title: '⁦✯🌺 الــقــوائــم 🌺✯⁠',
    sections: [
        {
            title: '*🍡┆ قـوائـم اضـافـيـة┆🍧*',
            highlight_label: '𝑺𝑨𝑺𝑼𝑲𝑬✪𝑩𝑶𝑻',
            rows: [
                { header: '*♡💟┆ الاعـضـاء ┆💟♡*', title: 'تشغيل كود ( #الاعضاء .م1 )', description: '᯽ᨘ‛᩠⋆ꣻ 𝐌𝐄𝐍𝐔 𝐁𝐎𝐓˚₊·❥', id: '.م1', highlight_label: '𝑺𝑨𝑺𝑼𝑲𝑬✪𝑩𝑶𝑻' },
                { header: '*♡🕋┆ ديـنـي ┆🕋♡*', title: 'تشغيل كود ( #قران .م2 )', description: '᯽ᨘ‛᩠⋆ꣻ 𝐌𝐄𝐍𝐔 𝐁𝐎𝐓˚₊·❥', id: '.م2', highlight_label: '𝑺𝑨𝑺𝑼𝑲𝑬✪𝑩𝑶𝑻' },
                { header: '*♡👑┆ للمطورين ┆👑♡*', title: 'تشغيل كود ( #المطورين .م3 )', description: '᯽ᨘ‛᩠⋆ꣻ 𝐌𝐄𝐍𝐔 𝐁𝐎𝐓˚₊·❥', id: '.م3', highlight_label: '𝑺𝑨𝑺𝑼𝑲𝑬✪𝑩𝑶𝑻' },
                { header: '*♡🎵┆ الـتـحـمـيـلات ┆🎵♡*', title: 'تشغيل كود (#التحميلات .م4 )', description: '᯽ᨘ‛᩠⋆ꣻ 𝐌𝐄𝐍𝐔 𝐁𝐎𝐓˚₊·❥', id: '.م4', highlight_label: '𝑺𝑨𝑺𝑼𝑲𝑬✪𝑩𝑶𝑻' },
                { header: '*♡👾┆ الـتـرفـيـة ┆👾♡*', title: 'تشغيل كود (#الترفيه .م5 )', description: '᯽ᨘ‛᩠⋆ꣻ 𝐌𝐄𝐍𝐔 𝐁𝐎𝐓˚₊·❥', id: '.م5', highlight_label: '𝑺𝑨𝑺𝑼𝑲𝑬✪𝑩𝑶𝑻' },
                { header: '*♡🦋┆ الـمـلـصـقـات ┆🦋♡*', title: 'تشغيل كود (#الملصقات)', description: '᯽ᨘ‛᩠⋆ꣻ 𝐌𝐄𝐍𝐔 𝐁𝐎𝐓˚₊·❥', id: '.م6', highlight_label: '𝑺𝑨𝑺𝑼𝑲𝑬✪𝑩𝑶𝑻' },
                { header: '*♡🍫┆ الـذكـاء ┆🍫♡*', title: 'تشغيل كود (#الذكاء .م7 )', description: '᯽ᨘ‛᩠⋆ꣻ 𝐌𝐄𝐍𝐔 𝐁𝐎𝐓˚₊·❥', id: '.م7', highlight_label: '𝑺𝑨𝑺𝑼𝑲𝑬✪𝑩𝑶𝑻' },
                { header: '*♡🏮┆ الـالـقـاب ┆🏮♡*', title: 'تشغيل كود ( #الالقاب .م8 )', description: '᯽ᨘ‛᩠⋆ꣻ 𝐌𝐄𝐍𝐔 𝐁𝐎𝐓˚₊·❥', id: '.م8 ', highlight_label: '𝑺𝑨𝑺𝑼𝑲𝑬✪𝑩𝑶𝑻' },
                { header: '*♡🎐┆ الادمــن ┆🎐♡*', title: 'تشغيل كود ( #الادمن .م9 )', description: '᯽ᨘ‛᩠⋆ꣻ 𝐌𝐄𝐍𝐔 𝐁𝐎𝐓˚₊·❥', id: '.م9', highlight_label: '𝑺𝑨𝑺𝑼𝑲𝑬✪𝑩𝑶𝑻' },
                { header: '*♡🐉┆ الــبــحــث ┆🐉♡*', title: 'تشغيل كود (#البحث .م10 )', description: '᯽ᨘ‛᩠⋆ꣻ 𝐌𝐄𝐍𝐔 𝐁𝐎𝐓˚₊·❥', id: '.م10', highlight_label: '𝑺𝑨𝑺𝑼𝑲𝑬✪𝑩𝑶𝑻' },
                { header: '*♡🧧┆ الــصــور ┆🧧♡*', title: 'تشغيل كود ( #الصور .م11 )', description: '᯽ᨘ‛᩠⋆ꣻ 𝐌𝐄𝐍𝐔 𝐁𝐎𝐓˚₊·❥', id: '.م11', highlight_label: '𝑺𝑨𝑺𝑼𝑲𝑬✪𝑩𝑶𝑻' },
                { header: '*♡🏮┆ الــشــخــصــيــات ┆🏮♡*', title: 'تشغيل كود (#الشخصيات .م12 )', description: '᯽ᨘ‛᩠⋆ꣻ 𝐌𝐄𝐍𝐔 𝐁𝐎𝐓˚₊·❥', id: '.م12', highlight_label: '𝑺𝑨𝑺𝑼𝑲𝑬✪𝑩𝑶𝑻' },
                { header: '*♡🏦┆ الــبــنــك ┆🏦♡*', title: 'تشغيل كود ( #البنك .م13 )', description: '᯽ᨘ‛᩠⋆ꣻ 𝐌𝐄𝐍𝐔 𝐁𝐎𝐓˚₊·❥', id: '.م13', highlight_label: '𝑺𝑨𝑺𝑼𝑲𝑬✪𝑩𝑶𝑻' },
            ]
        },
        {
            title: 'مـعـلـومـات عـن تـانـجـيـرو🔵',
            highlight_label: '𝑺𝑨𝑺𝑼𝑲𝑬✪𝑩𝑶𝑻',
            rows: [
                { header: '*♡🎗️┆ الــمــطـور ┆🎗️♡*', title: 'تشغيل كود ( #المطور )', description: '᯽ᨘ‛᩠⋆ꣻ 𝐈𝐍𝐅𝐎 𝐎𝐖𝐍𝐄𝐑˚₊·❥', id: '.المطور', highlight_label: '𝑺𝑨𝑺𝑼𝑲𝑬✪𝑩𝑶𝑻' },
                { header: '*♡📓┆ عـن الــمــطـور ┆📓♡*', title: 'تشغيل كود ( #عن المطور )', description: '᯽ᨘ‛᩠⋆ꣻ 𝐈𝐍𝐅𝐎 𝐎𝐖𝐍𝐄𝐑˚₊·❥', id: '.المعرف', highlight_label: '𝑺𝑨𝑺𝑼𝑲𝑬✪𝑩𝑶𝑻' }
            ]
        },
        {
            title: 'قـوانـيـن 🔴',
            highlight_label: '𝑺𝑨𝑺𝑼𝑲𝑬✪𝑩𝑶𝑻',
            rows: [
                { header: '*♡🍓┆ دعــم الـبـوت ┆🍓♡*', title: 'تشغيل كود ( #الدعم .م0 )', description: '᯽ᨘ‛᩠⋆ꣻ 𝐈𝐍𝐅𝐎 𝐁𝐎𝐓˚₊·❥', id: '.م0', highlight_label: '𝑺𝑨𝑺𝑼𝑲𝑬✪𝑩𝑶𝑻' },
                { header: '*♡💎┆ الــبــاقــات ┆💎♡*', title: 'تشغيل كود ( #الباقات )', description: '᯽ᨘ‛᩠⋆ꣻ 𝐈𝐍𝐅𝐎 𝐁𝐎𝐓˚₊·❥', id: '.الباقات', highlight_label: '𝑺𝑨𝑺𝑼𝑲𝑬✪??𝑶𝑻' }
            ]
        }
    ]
}),
messageParamsJson: "SASUKE BOT"
},
{
    name: "quick_reply",
    buttonParamsJson: JSON.stringify({
        display_text: "⁦✯🍡 قـيّـم الـبـوت 🍨✯⁠",
        id: ".تقييم"
    })
},
{
    name: "cta_url",
    buttonParamsJson: JSON.stringify({
        display_text: "⁦✯🍁 الـمـطـوريـن 🍁 ✯⁠",
        url: "https://wa.me/967772350066",
        merchant_url: "https://wa.me/967772350066"
    })
},
{
    name: "cta_url",
    buttonParamsJson: JSON.stringify({
        display_text: "⁦✯🐈 قــنــاتــي 🐈 ✯⁠",
        url: "https://whatsapp.com/channel/0029VaklBGFHFxOwODjsoP13",
        merchant_url: "https://whatsapp.com/channel/0029VaklBGFHFxOwODjsoP13"
    })
}
                        ]
                    }
                }
            }
        }
    }, {});
}

handler.help = ['info'];
handler.tags = ['main'];
handler.command = ['أوانر' , 'اوانر' , 'اوامر'  , 'menu' , 'الاوامر' , 'مهام' , 'قائمة' , 'الأوامر' , 'محمد'];

export default handler;
``