import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
   await m.react('☁️');

    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let name = await conn.getName(who);
    let edtr = `@${m.sender.split`@`[0]}`;
    let username = conn.getName(m.sender);
    
    let dev = "•.★*...ღ𝕊𝔸𝕊𝕌𝕂𝔼-𝔹𝕆𝕋ღ彡★"; // ✅ إضافة تعريف للمطور
    let canal = "https://whatsapp.com/channel/0029VaklBGFHFxOwODjsoP13"; // ✅ تعريف القناة أو المصدر

    let faketext = {
        key: {
            fromMe: false,
            participant: '0@s.whatsapp.net',
            remoteJid: 'status@broadcast'
        },
        message: {
            conversation: 'طول مانت قلبك ابيض عشتك هتبقا سودا 🖤'
        }
    };

    // VCARD
    let list = [{
        displayName: "•.★*...ღ𝕊𝔸𝕊𝕌𝕂𝔼-𝔹𝕆𝕋ღ彡★",
        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN: ◄⏤͟͟͞ღҬᾄᾗʝἷʀὄღ...*★.•\nitem1.TEL;waid=994403585483:994403585483\nitem1.X-ABLabel:Número\nitem2.EMAIL;type=INTERNET: masg.mgaass@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:${canal}\nitem3.X-ABLabel:Internet\nitem4.ADR:;; Yemeni;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`,
    }];

    await conn.sendMessage(m.chat, {
        contacts: {
            displayName: `${list.length} Contacto`,
            contacts: list
        },
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                title: '𝑇𝛨𝛯 𝐿𝛩𝛻𝛯𝐿𝑌 𝛩𝑊𝛮𝛯𝑅 𝛩𝐹',
                body: dev, // ✅ إصلاح الخطأ هنا
                thumbnailUrl: 'https://files.catbox.moe/pb8qwe.jpg',
                sourceUrl: canal,
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, {
        quoted: faketext // ✅ جعل faketext هو الرسالة المقتبسة
    });

    let txt = `┏━━━━━━━━ ✦•💫•✦ ━━━━━━━━┓
 ✨👋 هـايـهـاي ⭑•.❥ \`${username}\`  🎀💖  ✧*ده رقـم صـانـعي اللـطـيـفـ تــانـجـرو 🥰🌸* 
 ┗━━━━━━━━ ✦•💫•✦ ━━━━━━━━┛`;

    await conn.sendMessage(m.chat, {
        text: txt,
        footer: '> © ʙy ᴛᴀɴᴊɪʀᴏ-ᴀɪ',
        buttons: [
            {
                buttonId: ".menu",
                buttonText: {
                    displayText: '⊹₊ ⋆ᯓᡣ𐭩 mᥱᥒᥙ ᥴ᥆m⍴ᥣᥱ𝗍᥆'
                },
                type: 1
            }
        ],
        viewOnce: true,
        headerType: 1
    }, {
        quoted: faketext // ✅ جعل faketext هو الرسالة المقتبسة
    });
};

handler.help = ['owner', 'creator'];
handler.tags = ['main'];
handler.command = /^(creator|المطورين|المطور|مطور|مطورك|مطوري|creador)$/i;

export default handler;