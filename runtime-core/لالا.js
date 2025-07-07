let handler = async (m, { conn, args }) => {
    let input = args[0]

    let who

    // ✅ إذا كتب رقم يدوي
    if (input && /^\d{8,15}$/.test(input)) {
        who = input + '@s.whatsapp.net'
    } else {
        // ✅ fallback: الرد، منشن، أو نفسه
        who = m.mentionedJid?.[0]
            || m.quoted?.sender
            || m.sender
    }

    let name
    try {
        name = await conn.getName(who)
    } catch {
        name = 'غير معروف'
    }

    let number = who.split('@')[0]

    conn.reply(m.chat, `👤 *معلومات المستخدم:*
╭─────────────◆
│ 👤 *الاسم:* ${name}
│ 📱 *الرقم:* wa.me/${number}
│ 🆔 *الآي دي:* \`\`\`${who}\`\`\`
╰─────────────◆`, m, {
        mentions: [who]
    })
}

handler.help = ['ايدي [رقم]']
handler.tags = ['info']
handler.command = ['لالا']

export default handler