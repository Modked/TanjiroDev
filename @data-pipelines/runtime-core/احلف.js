let handler = m => m 
handler.all = async function (m) { 
    let chat = global.db.data.chats[m.chat]

    if (/^احلف$/i.test(m.text)) { 
        let text = `*😝💓يـمـيـن  ولا  شـمـال 😹*`
        await conn.sendMessage(m.chat, {
            text: text,
            contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                    title: '🎉 نورت الدردشة!',
                    body: 'استمتع بوقتك هنا 😊',
                    thumbnailUrl: 'https://qu.ax/jctyL.jpg',
                    sourceUrl: 'https://whatsapp.com/channel/0029VaklBGFHFxOwODjsoP13'
                },
            },
        }, { quoted: m });

        await conn.sendMessage(m.chat, { react: { text: '👀', key: m.key } })
    }
}

export default handler;