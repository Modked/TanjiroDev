let handler = async (m, {conn, usedPrefix}) => {
	
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let user = global.db.data.users[who]
if (!(who in global.db.data.users)) throw `✳️ *المستخدم مش موجود في قاعدة البيانات بتاعتي* `
conn.reply(m.chat, `*•───⧼⧼⧼ *الرصيد* ⧽⧽⧽───•*

@${who.split('@')[0]} *عنده*

*• *الماس* _${user.limit} 💎_
*• *خبرة* _${user.exp} ⬆️_
*• *سـاسـكـي كوينز* _${user.money} 🪙_
> *برة البنك* 

*•───⧼⧼⧼ *مـسـتــواك* ⧽⧽⧽───•*

⚡ *مستواك* _${user.level} 💎
> *جوة اللفل* 🏦 
> .لفل
> .بروفايل
•───────────────•

> *ملاحظة :* 
> ممكن تشتري 💎 الماس باستخدام الأوامر
> *• ${usedPrefix}buy <الكمية>*
> *• ${usedPrefix}buyall*`, m, { mentions: [who] })
}
handler.help = ['balance']
handler.tags = ['econ']
handler.command = ['bal', 'الماس', 'diamond', 'balance'] 


export default handler