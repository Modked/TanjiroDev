function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor(ms % 3600000 / 60000);
    let s = Math.floor(ms % 60000 / 1000);
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

import pkg from '@whiskeysockets/Baileys';
const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = pkg;

const handler = async (m, {conn, usedPrefix, usedPrefix: _p, __dirname, text, isPrems}) => {
    let d = new Date(new Date + 3600000);
    let locale = 'ar';
    let week = d.toLocaleDateString(locale, { weekday: 'long' });
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);
    let user = global.db.data.users[m.sender];
    let name = conn.getName(m.sender)
    let { money, joincount } = global.db.data.users[m.sender];
    let { exp, limit, level, role } = global.db.data.users[m.sender];
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length;
    let more = String.fromCharCode(8206);
    let readMore = more.repeat(850);
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];
  await conn.sendMessage(m.chat, { react: { text: '⚡', key: m.key } })
  const harley = 'https://files.catbox.moe/pujol5.jpg'
  const mentionId = m.key.participant || m.key.remoteJid;
 
conn.relayMessage(m.chat, { viewOnceMessage: { message: { interactiveMessage: { header: { title: `harley`}, body: { text: `
*مــرحــبــا بــك/ي* @${mentionId.split('@')[0]}
╗──────¤
> ⌈🦈╎سورس ساسكي╎🦈⌋
> •اختار احدي الباقات في الاسفل
> •اسعار الباقات تختلف
> •يمكنك اختيار الباقة المناسبة لك
> •يوجد احيانا خصومات
╝───────────────¤
*🚨:الرجاء الضغط علي زر الباقات*

> *© 2025 •.★*...ღ𝕊𝔸𝕊𝕌𝕂𝔼 𝔹𝕆𝕋 ღ彡★`,subtitle: "EL TARBOO ",},header: { hasMediaAttachment: true,...(await prepareWAMessageMedia({ image : { url: harley } }, { upload: conn.waUploadToServer }, {quoted: m}))},nativeFlowMessage: { buttons: [


                            {
                                name: 'single_select',
                                buttonParamsJson: JSON.stringify({
                                    title: '♪الــبــاقــات♪',
                                    sections: [
                                        {
                                            title: 'مـرحـبــا بــك فـي سورس سـاسـكـي بـ🪐ـوت',
                                            highlight_label: 'ســــورس سـاسـكـي 🦈',
                                            rows: [
                                                {
                                                    header: '𝐒𝐔𝐁𝐒𝐂𝐑𝐈𝐏𝐓𝐈𝐎𝐍 𝐈𝐒 𝐅𝐑𝐄𝐄',
                                                    title: 'الـبـاقـات المـجـانـيـة',
                                                    description: 'Free subscription',
                                                    id: '.مجاني'
                                                },
                                                {
                                                    header: '𝐖𝐄𝐄𝐊𝐋𝐘 𝐒𝐔𝐁𝐒𝐂𝐑𝐈𝐏𝐓𝐈𝐎𝐍',
                                                    title: 'الـبـاقـات الاســبــوعــيــة',
                                                    description: 'Weekly subscription',
                                                    id: '.ش2'
                                                },
                                                {
                                                    header: '𝐌𝐎𝐍𝐓𝐇𝐋𝐘 𝐒𝐔𝐁𝐒𝐂𝐑𝐈𝐏𝐓𝐈𝐎𝐍',
                                                    title: 'الـبـاقـات الـشـهـريـة',
                                                    description: 'Monthly subscription',
                                                    id: '.ش3'
                                                },
                                                {
                                                    header: '𝐏𝐑𝐄𝐌𝐈𝐔𝐌 𝐒𝐔𝐁𝐒𝐂𝐑𝐈𝐏𝐓𝐈𝐎𝐍',
                                                    title: 'بـاقـات البريميم',
                                                    description: 'Premium subscription',
                                                    id: '.ش4'
                                               }
                                            ]
                                        }
                                    ]
                                }),
                  messageParamsJson: ''
                },
                {
              name: "cta_url",
               buttonParamsJson: '{"display_text":"「❄ ╎الـمــطـور╎❄ 」","url":"https://api.whatsapp.com/send?phone=+967772350066","merchant_url":"https://api.whatsapp.com/send?phone=+967772350066"}'
                     },
                     {
               name: "cta_url",
               buttonParamsJson: '{"display_text":"⌈📲╎قـنـاة الـمـطـور╎📲⌋","url":"https://whatsapp.com/channel/0029VaklBGFHFxOwODjsoP13","merchant_url":"https://whatsapp.com/channel/0029VaklBGFHFxOwODjsoP13"}'
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
handler.command = ['بريميم', 'الباقات', 'الاشتراك','اشتراكات']

export default handler;