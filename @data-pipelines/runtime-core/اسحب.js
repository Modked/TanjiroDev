let handler = async (m, { conn, text, command }) => {
  let id = text.trim()
  if (!id || isNaN(id)) return m.reply(`❗ اكتب رقم اللعبة الصحيح مثل:\n*${command} 123*`)

  let game = global.roulette?.[id]
  if (!game) return m.reply("❌ اللعبة غير موجودة أو انتهت.")
  if (game.state !== 'READY') return m.reply("⚠️ اللعبة لم تبدأ بعد أو انتهت.")
  if (![game.player1, game.player2].includes(m.sender)) return m.reply("❌ أنت لست جزءاً من هذه اللعبة.")
  if (m.sender !== game.turn) return m.reply("⏱️ مو دورك الحين! لا تستعجل جايك الموت بكل حال")

  game.started = true

  const currentPlayer = m.sender
  const opponent = game.player1 === m.sender ? game.player2 : game.player1
  const currentTag = '@' + currentPlayer.split('@')[0]

  let counterText = `👹 ${currentTag} يقوم بتوجيه المسدس إلى رأسه...\n *🩸يلا ضغطة... ومخّك صار شوربة* \n\n⚰️ تدور عجلة المسدس...:\n`
  let message = await conn.sendMessage(game.chat, {
    text: counterText + '1/6 🔄',
    mentions: [currentPlayer]
  })

  for (let i = 2; i <= 6; i++) {
    await new Promise(r => setTimeout(r, 500))
    await conn.sendMessage(game.chat, {
      edit: message.key,
      text: counterText + `${i}/6 ${i === 6 ? '💥' : '🔄'}`
    })
  }

  await new Promise(r => setTimeout(r, 1000))

  let bulletChamber = Math.floor(Math.random() * 6) + 1
  let isDead

  if (game.mode === 'crazy') {
    isDead = bulletChamber >= 5 // 5 أو 6 = رصاص
  } else {
    isDead = bulletChamber === 6 // فقط خانة 6 فيها رصاصة
  }

  if (isDead) {
    // خصمك يفوز
    global.db.data.users[opponent].exp += game.bet
    global.db.data.users[currentPlayer].exp -= game.bet

    conn.sendMessage(game.chat, {
      text: game.mode === 'crazy'
        ? `💥 *طااااخ! راحت فيك يا المعفن* 💀\n *🩸اوووف دمّه فرش عالحايط*...\n @${currentPlayer.split('@')[0]}
⚰️ مات بطريقة بشعة زيه!\n\n🚬 الي لسى عايش 😮‍💨: *@${opponent.split('@')[0]}* وربح من الخاسر *${game.bet} XP*!`
        : `💥 *طااااخ! راحت فيك يا المعفن* 💀\n *🩸اوووف دمّه فرش عالحايط*...\n @${currentPlayer.split('@')[0]}
⚰️ مات بطريقة بشعة زيه!\n\n🚬 الي لسى عايش 😮‍💨: *@${opponent.split('@')[0]}* وربح من الخاسر *${game.bet} XP*!`,
      mentions: [currentPlayer, opponent]
    })

    delete global.roulette[id]
  } else {
    // النجاة والتبديل
    conn.sendMessage(game.chat, {
      text: game.mode === 'crazy'
        ? `
*😮‍💨 طلعت فاضية... يا حظك!*\n🔁 *الحين دور خصمك يسحب... 😈* لـ: @${opponent.split('@')[0]}`
        : ` *😨 فاااضية! تعيش وتاكل غيرها يا وحش*  @${currentPlayer.split('@')[0]}.\n🔁 *☠️ دورك يلا يا جبان اسحب و خليني أضحك👹* : @${opponent.split('@')[0]}`,
      mentions: [currentPlayer, opponent]
    })

    game.turn = opponent
  }
}

handler.command = /^اسحب$/i
export default handler