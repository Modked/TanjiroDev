import cheerio from 'cheerio'
import axios from 'axios'

// دالة البحث عن ستيكرات
async function stickersearch(query) {
  return new Promise((resolve) => {
    axios.get(`https://getstickerpack.com/stickers?query=${query}`).then(({ data }) => {
      const $ = cheerio.load(data)
      const link = []
      $('#stickerPacks > div > div:nth-child(3) > div > a').each(function (a, b) {
        link.push($(b).attr('href'))
      })
      let rand = link[Math.floor(Math.random() * link.length)]
      axios.get(rand).then(({ data }) => {
        const $$ = cheerio.load(data)
        const url = []
        $$('#stickerPack > div > div.row > div > img').each(function (a, b) {
          url.push($$(b).attr('src').split('&d=')[0])
        })
        resolve({
          creator: 'Tioo',
          title: $$('#intro > div > div > h1').text(),
          author: $$('#intro > div > div > h5 > a').text(),
          author_link: $$('#intro > div > div > h5 > a').attr('href'),
          sticker: url
        })
      })
    })
  })
}

let handler = async (m, { conn, text, args, command, usedPrefix }) => {
  if (!text) {
    return m.reply(`❌ *الاستخدام خاطئ*\n\n📌 مثال:\n${usedPrefix + command} Naruto`)
  }

  await stickersearch(text).then(async res => {
    let stickers = res.sticker.slice(0, 10)
    await m.reply(`*🎨 النتائج:*
📦 *العنوان:* ${res.title}
✒️ *المطور: تانجيرو*

📤 *جاري إرسال* ${res.sticker.length} *ستيكرات...*
📩 *إلى الخاص* 🔒
> © ʙy ᴛᴀɴᴊɪʀᴏ-ᴀɪ`)

    for (let i of res.sticker) {
      try {
        const buffer = await axios.get(i, { responseType: 'arraybuffer' }).then(res => res.data)
        await conn.sendMessage(m.sender, {
          sticker: buffer,
          packname: `「 ${res.title} 」`,
          author: `By ${res.creator} | ${res.author}`
        }, { quoted: m })

        await conn.delay(2000) // تأخير بسيط بين كل ستيكر
      } catch (e) {
        console.log(`[❌] فشل في إرسال ستيكر من: ${i}`)
      }
    }
  })
}

handler.help = ['stickersearch']
handler.tags = ['sticker']
handler.command = /^(searchsticker|stickersearch|caristiker|بحث-ستيكر|بحث-استيكر|بحث_استيكر|بحث_ستيكر|بحث-ملصق|بحث_ملصق|ملصق-بحث)$/i
handler.register = true
handler.limit = true

export default handler