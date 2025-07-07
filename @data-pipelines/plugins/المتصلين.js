/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

let handler = async (m, { conn, args }) => {
  let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat
  try {
    const data = conn.chats[id].messages
    const online = Object.values(data).map(item => item.key.participant)
    
    const uniqueOnline = online.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
    
    conn.reply(m.chat, '┌─〔 *🌐 قائمة المتصلين بالانترنيت الآن* 〕\n' + uniqueOnline.map(v => '├ @' + v.replace(/@.+/, '')).join('\n') + '\n└────', m, {
      contextInfo: { mentionedJid: uniqueOnline }
    })
  } catch (e) {
    m.reply('')
  }
}

handler.help = ['المتصلين']
handler.tags = ['group']
handler.command = /^(المتصلين(line)?)/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false
handler.admin = false
handler.botAdmin = false
handler.fail = null

export default handler