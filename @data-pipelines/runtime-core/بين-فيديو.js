import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw m.reply(`*هذه الميزه تمكنك من تحميل الفيديوهات من بينترست برابط فقط 😆*\n*مثال 💛 :* *.بينترست-فيديو* https://pin.it/7I5UODZJB`);
conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });
	let ouh = await fetch(`https://api.agatz.xyz/api/pinterest?url=${text}`)
  let gyh = await ouh.json()
	await conn.sendFile(m.chat, gyh.data.result, `pinvideobykeni.mp4`, `*تم تحميل الفيديو من بينترست بنجاح بواسطة ساسكي بوت 😆🧧*\n*رابط الفيديو الذي تم تحميله : ${gyh.data.url} 🌹*`, m)
	await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
}
handler.help = ['pinvid']
handler.tags = ['downloader']
handler.command = /^(بينترست-فيديو|pinvideo|بين-فيديو|بين-فديو)$/i
handler.premium = false
handler.register = true
export default handler