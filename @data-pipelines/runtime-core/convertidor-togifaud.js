let handler = async (m, { conn, usedPrefix, command }) => {
if (!m.quoted) return conn.reply(m.chat, `🤍 *اعمل رد علي الفيديو تبعك*`, m, rcanal)
conn.reply(m.chat, global.wait, m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, showAdAttribution: true,
title: packname,
body: wm,
previewType: 0, thumbnail: icons,
sourceUrl: channel }}})
const q = m.quoted || m
let mime = (q.msg || q).mimetype || ''
if (!/(mp4)/.test(mime)) return conn.reply(m.chat, `🤍 *اعمل رد على الفيديو تبعك*`, m, rcanal)
await m.react(rwait)
let media = await q.download()
let listo = '💭  *هنا* 💥'
conn.sendMessage(m.chat, { video: media, gifPlayback: true, caption: listo }, { quoted: fkontak })
await m.react(done)
}
handler.help = ['togifaud']
handler.tags = ['transformador']
handler.group = true;
handler.register = true
handler.command = ['لجيف']
export default handler