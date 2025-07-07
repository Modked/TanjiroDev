let handler = async (m, { conn, text, usedPrefix, command }) => {
  let id = text.trim()
  if (!id || isNaN(id)) return m.reply(`❗ اكتب رقم اللعبة الصحيح مثل:
*${usedPrefix + command} 123*`)

  if (!global.roulette || !global.roulette[id]) return m.reply("❌ اللعبة غير موجودة أو انتهت.")
  let game = global.roulette[id]

  if (game.state !== 'WAITING') return m.reply("*⚠️ مستعجل يجي دورك ؟\n اصبر يموت بعدين ابدأ لعبة جديدة... لو كانت فيك الجراءة تكمل أصلاً😹🥱*")
  if (game.player1 === m.sender) return m.reply("❌ ما تقدر تنضم للعبة انت بدأتها!")

  game.player2 = m.sender
  game.state = 'READY'

  let starter = Math.random() < 0.5 ? game.player1 : game.player2
  game.turn = starter

  let modeMsg = game.mode === 'crazy'
    ? '🩸 *الوضع المجنون!* أكثر من رصاصة في المسدس... احتمالك تموت أعلى 😵'
    : '👁️ *الوضع العادي!* رصاصة وحدة تدور... من اللي بيموت؟ 😬'

  let msg = `🎮 *انضمام ناجح!👹*
🕴🏼 اللاعب الأول: @${game.player1.split('@')[0]}
🕴🏼 اللاعب الثاني: @${game.player2.split('@')[0]}

${modeMsg}

🎲 الدور جاءك يا ابن الحظ... 
🔥 الدور الأول لـ: @${starter.split('@')[0]}

✋لو عندك قلب تبدأ اللعبة  😈 اكتب:
*${usedPrefix}اسحب ${id}*`

  await conn.reply(game.chat, msg, null, {
    mentions: [game.player1, game.player2, starter]
  })

  // المؤقت: إذا ما كتب ولا واحد .اسحب خلال 30 ثانية، نلغي اللعبة
  setTimeout(() => {
    let g = global.roulette[id]
    if (g && g.state === 'READY' && !g.started) {
      delete global.roulette[id]
      conn.reply(game.chat, `⌛ ما حد بدأ اللعبة، وطبيعي تم إلغاء الجولة . أصلاً ما حدا قدها 👌🏻🥱ايش كنت اتوقع انا 👹`, null)
    }
  }, 30_000)
}

handler.command = /^انضم$/i
export default handler