import fetch from 'node-fetch'

var handler = async (m, { conn, text }) => {
  if (!text) throw `*أدخل عنوان المانجا التي تريد البحث عنها!*`
  conn.reply(m.chat, 'جاري البحث عن المانجا... من فضلك انتظر', m)
  let res = await fetch('https://api.jikan.moe/v4/manga?q=' + text)
  if (!res.ok) throw 'لم يتم العثور على المانجا'
  let json = await res.json()
  let { chapters, url, type, score, scored, scored_by, rank, popularity, members, background, status, volumes, synopsis, favorites } = json.data[0]
  let judul = json.data[0].titles.map(jud => `${jud.title} [${jud.type}]`).join('\n')
  let xnuvers007 = json.data[0].authors.map(Xnuvers007 => `${Xnuvers007.name} (${Xnuvers007.url})`).join('\n')
  let genrenya = json.data[0].genres.map(xnvrs007 => `${xnvrs007.name}`).join('\n')
  
  let animeingfo = `📚 الـعـنوان: ${judul}
📑 الفصول: ${chapters}
✉️ النوع: ${type}
🗂 الحالة: ${status}
🔖 التصنيف: ${genrenya}
🗃 الأجزاء: ${volumes}
🌟 المفضلين: ${favorites}
🧮 التقييم: ${score}
🧮 عدد المقيمين: ${scored}
🧮 عدد المقيمين من: ${scored_by}
🌟 الترتيب: ${rank}
🤩 الشعبية: ${popularity}
👥 الأعضاء: ${members}
⛓️ الرابط: ${url}
👨‍🔬 المؤلف: ${xnuvers007}
📝 الخلفية: ${background}
💬 الملخص: ${synopsis}
`
  conn.sendFile(m.chat, json.data[0].images.jpg.image_url, 'manga.jpg', `*معلومات عن المانجا*\n` + animeingfo, m)
  conn.reply(m.chat, '𝙎𝙖𝙛𝙧𝙤𝙩-𝘽𝙤𝙩', m)
}
handler.help = ['mangainfo <manga>', 'manga <namaManga>', 'infomanga <NamaManga/Anime>']
handler.tags = ['anime']
handler.command = /^(mangainfo|manga|infomanga|مانجا)$/i

export default handler