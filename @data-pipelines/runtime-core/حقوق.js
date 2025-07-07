import { addExif } from '../lib/sticker.js'

let handler = async (m, { conn, text }) => {
    if (!m.quoted) throw '👀┇لازم ترد على الاستيكر اللي عايز تضيف عليه اسم الباكدج يامعلم!┇😎'
    let stiker = false
    try {
        let [packname, ...author] = text.split('|')
        author = (author || []).join('|')
        let mime = m.quoted.mimetype || ''
        if (!/webp/.test(mime)) throw '👀┇يا نجم، لازم ترد على استيكر عشان نضيف الاسم!┇😅'
        let img = await m.quoted.download()
        if (!img) throw '📥┇فيه حاجة مش مزبوطة.. حاول تنزل الاستيكر تاني!┇🚨'
        stiker = await addExif(img, packname || '', author || '')
    } catch (e) {
        console.error(e)
        if (Buffer.isBuffer(e)) stiker = e
    } finally {
        if (stiker) {
            conn.sendMessage(m.chat, { 
                sticker: stiker, 
                mimetype: 'image/webp', 
                contextInfo: {
                    externalAdReply: {
                        title: "⚡┆ ♡ 𝑺𝑨𝑺𝑼𝑲𝑬-𝑩𝑶𝑻 ♡┆⚡",
                        body: "𝙎𝙖𝙨𝙪𝙠𝙚﹝⚡️﹞𝘽𝙤𝙩",
                        thumbnailUrl: "https://files.catbox.moe/7863c6.jpg",
                        sourceUrl: "https://whatsapp.com/channel/0029VaklBGFHFxOwODjsoP13",
                        mediaType: 1
                    }
                }
            }, { quoted: m });
        } else {
            throw '😔┇حصلت غلطة! تأكد انك رديت على استيكر وضفت اسم الباكدج ياعم!┇🚨'
        }
    }
}

handler.help = ['wm <packname>|<author>']
handler.tags = ['sticker']
handler.command = /^حقوق$/i

export default handler