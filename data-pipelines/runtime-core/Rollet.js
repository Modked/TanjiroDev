let handler = async (m, { conn, text, usedPrefix, command }) => {
  let args = text.trim().split(/\s+/)
  let bet = parseInt(args[0])
  if (isNaN(bet) || bet <= 0) return m.reply(`⚠️ اكتب المبلغ اللي تبي تراهن عليه مثل:
*${usedPrefix + command} 500*


او للوضع الدموي (في المسدس اكثر من رصاصة🩸👏🏻) :
*${usedPrefix + command} 500 مجنون*

> *جربها لو انت رجال 👹*`)

  let mode = (args[1] && /crazy|مجنون/i.test(args[1])) ? 'crazy' : 'normal'

  let user = global.db.data.users[m.sender]
  if (user.exp < bet) return m.reply("❌ ما عندك نقاط خبرة كفاية! روح جمع فلوس بعدين تعال نتكلم🥱🫱🏻‍🫲🏻")

  if (!global.roulette) global.roulette = {}

  // توليد id من 3 أرقام غير مكرر
  let id
  do {
    id = Math.floor(100 + Math.random() * 900)
  } while (global.roulette[id])

  global.roulette[id] = {
    id,
    chat: m.chat,
    player1: m.sender,
    player2: null,
    bet,
    state: 'WAITING',
    mode // 'normal' أو 'crazy'
  }

  let intro = `💀 *لعبة جحيم الروليت الروسي بدأت!*👹
🧍 اللاعب الأول: @${m.sender.split('@')[0]}
🎲 الوضع: ${mode === 'crazy' ? '🩸 الدموي (أكثر من رصاصة)' : '🚬 عادي (رصاصة وحدة)'}
✋ في انتظار لاعب آخر ينضم باستخدام:
*${usedPrefix}انضم ${id}*\n *آااوووف 💣 يارب تولّع براس واحد...🔥*`

  m.reply(intro, null, { mentions: [m.sender] })

  setTimeout(() => {
    let game = global.roulette[id]
    if (game && game.state === 'WAITING') {
      delete global.roulette[id]
      conn.reply(m.chat, `⌛ انتهى الوقت وما حد انضم للعبة، كـمـا الـمـتـوقـع 😹 مـا حـدا قـدهـا 👹👌🏻`, null)
    }
  }, 30_000)
}

handler.command = /^روليت$/i
export default handler