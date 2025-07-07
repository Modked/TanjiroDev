let handler = m => m 
handler.all = async function (m) { 
    let chat = global.db.data.chats[m.chat]
    if (/^خرا|كول خرا$/i.test(m.text)) { 
        let text = `*كله انت*`
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

        await conn.sendMessage(m.chat, { react: { text: '🤡', key: m.key } })
    }

    if (/^اسكت|انطم|اسكت انت$/i.test(m.text)) { 
        let text = `*مـش هـسـكـت😝*`
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

        await conn.sendMessage(m.chat, { react: { text: '😹', key: m.key } })
    }

    if (/^رمضان كريم$/i.test(m.text)) { 
        let text = `*حـبـيـبـي تـسـلـم🫶🏻*`
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

        await conn.sendMessage(m.chat, { react: { text: '🤭', key: m.key } })
    }

    if (/^خخخخخخ|اخخخخ|هخخخخ$/i.test(m.text)) { 
        let text = `*خوخ ومنجا وسوق العبور كلو🧏🏻‍♂️🦦*`
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

        await conn.sendMessage(m.chat, { react: { text: '😹', key: m.key } })
    }

    if (/^كداب|شرير|كذاب|شريره$/i.test(m.text)) { 
        let text = `*مظلوم اككيد😩❤‍🔥*`
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

        await conn.sendMessage(m.chat, { react: { text: '⚡', key: m.key } })
    }

    if (/^مرتبط$/i.test(m.text)) { 
        let text = `*هتشقطينى يبت 😂😁*`
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

        await conn.sendMessage(m.chat, { react: { text: '😁', key: m.key } })
    }

    if (/^بوت بتحبني؟|بوت بتحبنى$/i.test(m.text)) { 
        let text = `*اموت فيك 🌚💔*`
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

        await conn.sendMessage(m.chat, { react: { text: '❤️‍🩹', key: m.key } })
    }
}

export default handler;