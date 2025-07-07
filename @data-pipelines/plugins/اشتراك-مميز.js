import pkg from '@whiskeysockets/Baileys';
const { prepareWAMessageMedia } = pkg;

const handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🚀', key: m.key } });

    const harley = 'https://files.catbox.moe/t2ie1w.jpg';

    let messageContent = {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    header: { title: 'SᗩSᑌKᕮ ᗷOT' },
                    body: {
                        text: `━ ╼╃ ⌬〔﷽〕⌬ ╄╾ ━
> ⌠•.★*...ღ𝕊𝔸𝕊𝕌𝕂𝔼 𝔹𝕆𝕋 ღ彡★⌡
> 〔 الاشتراك البريميام┊ ˼‏ 🚀˹ ↶〕
*⋅ ───━ •﹝👑﹞• ━─── ⋅*
            *SᗩSᑌKᕮ ᗷOT*
*⋅ ───━ •﹝👑﹞• ━─── ⋅*
╗───¤﹝السعر ↶ 💵﹞
> •┊˹🦈˼┊- 5 دولار
> •┊˹🦈˼┊- روبل بوت ارقام
> •┊˹🦈˼┊- 1500 نقطة دعمكم
╝───────────────¤
╗───¤﹝المميزات ↶ 🚀﹞
> •┊˹🦈˼┊- اشتراك سرفر عام
> •┊˹🦈˼┊- شغال 7/24
> •┊˹🦈˼┊- البوت تحت التطوير
╝───────────────¤
╗───¤﹝طرق الدفع ↶ 💰﹞
> •┊˹🦈˼┊- كريمي أكسبرس
> •┊˹🦈˼┊- عبر حوالة من صراف، او اي طريقة دفع
╝───────────────¤
*ملحوظة : الاشتراك البريميام اي اشتراك سنوي ومعاه خصومات كمان 🚀*
*⋅ ───━ •﹝👑﹞• ━─── ⋅*
> 〔تـوقـيـع┊ ˼‏📜˹ 〕↶
⌠•.★*...ღ𝕊𝔸𝕊𝕌𝕂𝔼 𝔹𝕆𝕋 ღ彡★⌡
*⋅ ───━ •﹝👑﹞• ━─── ⋅*`,
                        subtitle: "⌠•.★*...ღ𝕊𝔸𝕊𝕌𝕂𝔼 𝔹𝕆𝕋 ღ彡★⌡"
                    },
                    header: {
                        hasMediaAttachment: true,
                        ...(await prepareWAMessageMedia({ image: { url: harley } }, { upload: conn.waUploadToServer }, { quoted: m }))
                    },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: "cta_url",
                                buttonParamsJson: '{"display_text":"⌈🚀╎𝐁𝐔𝐘 ˹💰˼ 𝐍𝐎𝐖╎🚀⌋","url":"https://api.whatsapp.com/send?phone=+967772350066","merchant_url":"https://api.whatsapp.com/send?phone=+967772350066"}'
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
    };

    conn.relayMessage(m.chat, messageContent, {});
};

handler.help = ['info'];
handler.tags = ['main'];
handler.command = ['مميز', 'ش4', 'اشتراك_مميز', 'بريميام'];

export default handler;