let handler = m => m 
handler.all = async function (m) { 
    let chat = global.db.data.chats[m.chat]

    if (/^يب$/i.test(m.text)) { 
        let text = `*يعم استرجل وقول نعم 🐦❤*`
        await conn.sendMessage(m.chat, {
            text: text,
            contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                    title: '🤖 بوت الدردشة',
                    body: 'اضغط هنا للمزيد!',
                    thumbnailUrl: 'https://qu.ax/jctyL.jpg',
                    sourceUrl: 'https://whatsapp.com/channel/0029VaklBGFHFxOwODjsoP13'
                },
            },
        }, { quoted: m });

        await conn.sendMessage(m.chat, { react: { text: '⚡', key: m.key } })
    }

    if (/^بنورك|دا نورك|نورك الاصل|نور نورك$/i.test(m.text)) { 
        let text = `*يعم بنوري انا 🫠🐦*`
        await conn.sendMessage(m.chat, {
            text: text,
            contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                    title: '🤖 بوت الدردشة',
                    body: 'اضغط هنا للمزيد!',
                    thumbnailUrl: 'https://qu.ax/jctyL.jpg',
                    sourceUrl: 'https://whatsapp.com/channel/0029VaklBGFHFxOwODjsoP13'
                },
            },
        }, { quoted: m });

        await conn.sendMessage(m.chat, { react: { text: '🐤', key: m.key } })
    }

    if (/^بتعمل ايه دلوقتي|بتعمل اي$/i.test(m.text)) { 
        let text = `*بكلمك🌚♥*`
        await conn.sendMessage(m.chat, {
            text: text,
            contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                    title: '🤖 بوت الدردشة',
                    body: 'اضغط هنا للمزيد!',
                    thumbnailUrl: 'https://qu.ax/jctyL.jpg',
                    sourceUrl: 'https://whatsapp.com/channel/0029VaklBGFHFxOwODjsoP13'
                },
            },
        }, { quoted: m });

        await conn.sendMessage(m.chat, { react: { text: '⚡', key: m.key } })
    }

    if (/^🙂$/i.test(m.text)) { 
        let text = `بص بعيد🙂`
        await conn.sendMessage(m.chat, {
            text: text,
            contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                    title: '🤖 بوت الدردشة',
                    body: 'اضغط هنا للمزيد!',
                    thumbnailUrl: 'https://qu.ax/jctyL.jpg',
                    sourceUrl: 'https://whatsapp.com/channel/0029VaklBGFHFxOwODjsoP13'
                },
            },
        }, { quoted: m });

        await conn.sendMessage(m.chat, { react: { text: '🙃', key: m.key } })
    }

    if (/^تصبح علي خير|تصبحوا علي خير$/i.test(m.text)) { 
        let text = `وانت من اهل الخير حبيبي✨💜`
        await conn.sendMessage(m.chat, {
            text: text,
            contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                    title: '🤖 بوت الدردشة',
                    body: 'اضغط هنا للمزيد!',
                    thumbnailUrl: 'https://qu.ax/jctyL.jpg',
                    sourceUrl: 'https://whatsapp.com/channel/0029VaklBGFHFxOwODjsoP13'
                },
            },
        }, { quoted: m });

        await conn.sendMessage(m.chat, { react: { text: '✨', key: m.key } })
    }

    if (/^باي$/i.test(m.text)) { 
        let text = `باي`
        await conn.sendMessage(m.chat, {
            text: text,
            contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                    title: '🤖 بوت الدردشة',
                    body: 'اضغط هنا للمزيد!',
                    thumbnailUrl: 'https://qu.ax/jctyL.jpg',
                    sourceUrl: 'https://whatsapp.com/channel/0029VaklBGFHFxOwODjsoP13'
                },
            },
        }, { quoted: m });

        await conn.sendMessage(m.chat, { react: { text: '❤️', key: m.key } })
    }

    if (/^هلوو$/i.test(m.text)) { 
        let text = `هلوووو😹`
        await conn.sendMessage(m.chat, {
            text: text,
            contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                    title: '🤖 بوت الدردشة',
                    body: 'اضغط هنا للمزيد!',
                    thumbnailUrl: 'https://qu.ax/jctyL.jpg',
                    sourceUrl: 'https://whatsapp.com/channel/0029VaklBGFHFxOwODjsoP13'
                },
            },
        }, { quoted: m });

        await conn.sendMessage(m.chat, { react: { text: '⚡', key: m.key } })
    }

    if (/^ايه$/i.test(m.text)) { 
        let text = `*مفيش يا حبي 😝💔*`
        await conn.sendMessage(m.chat, {
            text: text,
            contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                    title: '🤖 بوت الدردشة',
                    body: 'اضغط هنا للمزيد!',
                    thumbnailUrl: 'https://qu.ax/jctyL.jpg',
                    sourceUrl: 'https://whatsapp.com/channel/0029VaklBGFHFxOwODjsoP13'
                },
            },
        }, { quoted: m });

        await conn.sendMessage(m.chat, { react: { text: '🐤', key: m.key } })
    }

    if (/^هلا$/i.test(m.text)) { 
        let text = `*هلا بيك يعمري 😩❤‍🔥*`
        await conn.sendMessage(m.chat, {
            text: text,
            contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                    title: '🤖 بوت الدردشة',
                    body: 'اضغط هنا للمزيد!',
                    thumbnailUrl: 'https://qu.ax/jctyL.jpg',
                    sourceUrl: 'https://whatsapp.com/channel/0029VaklBGFHFxOwODjsoP13'
                },
            },
        }, { quoted: m });

        await conn.sendMessage(m.chat, { react: { text: '🥀', key: m.key } })
    }

    if (/^اوكك|اوككك|اوكي|اوكيي|اوكييي$/i.test(m.text)) { 
        let text = `*اوك 🌚🦦*`
        await conn.sendMessage(m.chat, {
            text: text,
            contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                    title: '🤖 بوت الدردشة',
                    body: 'اضغط هنا للمزيد!',
                    thumbnailUrl: 'https://qu.ax/jctyL.jpg',
                    sourceUrl: 'https://whatsapp.com/channel/0029VaklBGFHFxOwODjsoP13'
                },
            },
        }, { quoted: m });

        await conn.sendMessage(m.chat, { react: { text: '👀', key: m.key } })
    }

    if (/^بوت عرص$/i.test(m.text)) { 
        let text = `*مفيش عرص غيرك هنا يخول متشتمش البوت🫵🏻*`
        await conn.sendMessage(m.chat, {
            text: text,
            contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                    title: '🤖 بوت الدردشة',
                    body: 'اضغط هنا للمزيد!',
                    thumbnailUrl: 'https://qu.ax/jctyL.jpg',
                    sourceUrl: 'https://whatsapp.com/channel/0029VaklBGFHFxOwODjsoP13'
                },
            },
        }, { quoted: m });

        await conn.sendMessage(m.chat, { react: { text: '🤡', key: m.key } })
    }

    if (/^بخير|بخير الحمد لله$/i.test(m.text)) { 
        let text = `*دايما يارب 💎🩵*`
        await conn.sendMessage(m.chat, {
            text: text,
            contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                    title: '🤖 بوت الدردشة',
                    body: 'اضغط هنا للمزيد!',
                    thumbnailUrl: 'https://qu.ax/jctyL.jpg',
                    sourceUrl: 'https://whatsapp.com/channel/0029VaklBGFHFxOwODjsoP13'
                },
            },
        }, { quoted: m });

        await conn.sendMessage(m.chat, { react: { text: '💫', key: m.key } })
    }

    if (/^يجوزي|جوزي|جوزيي$/i.test(m.text)) { 
        let text = `*قلب جوزك🦦🫶🏻*`
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

        await conn.sendMessage(m.chat, { react: { text: '🤧', key: m.key } })
    }

    if (/^بعشقك|بعشقكك|بعشقككك$/i.test(m.text)) { 
        let text = `*بـمـوت فـيـك😍🫵🏻*`
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

    if (/^قلبي|يقلبي|يقلبيي$/i.test(m.text)) { 
        let text = `*قلب قلبك🌚✨*`
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

        await conn.sendMessage(m.chat, { react: { text: '😆', key: m.key } })
    }



    if (/^بوت علق|البوت علق$/i.test(m.text)) { 
        let text = `تـهـيـألـك 😹⚡`
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

        await conn.sendMessage(m.chat, { react: { text: '🗿', key: m.key } })
    }

    if (/^بموتفيك|بموت فيك|بموت فيكك|بموت فيككك$/i.test(m.text)) { 
        let text = `*بـدمـنـكككك💋*`
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

    if (/^عيب|عيبب|عيببب|عيبببب$/i.test(m.text)) { 
        let text = `*مـفـيـش عـيـب بـيـنـا🙃*`
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

        await conn.sendMessage(m.chat, { react: { text: '🤧', key: m.key } })
    }

    if (/^🌚|😉|🥹$/i.test(m.text)) { 
        let text = `😘`
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

        await conn.sendMessage(m.chat, { react: { text: '😆', key: m.key } })
    }

    if (/^تحبني$/i.test(m.text)) { 
        let text = `*🌚♥اكيد*`
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

        await conn.sendMessage(m.chat, { react: { text: '❤️', key: m.key } })
    }

    if (/^بتحبني|بتحبني؟|بتحبنيي$/i.test(m.text)) { 
        let text = `*بـعـشقـككك💋✨*`
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

    if (/^بقولك اي$/i.test(m.text)) { 
        let text = `*خـدتـك عـلـيـة 👀⚡*`
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

    if (/^انت عسل|انت عسلل|انت عسللل$/i.test(m.text)) { 
        let text = `*وانتي قمر🦦🫶🏻*`
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

        await conn.sendMessage(m.chat, { react: { text: '😆', key: m.key } })
    }


    if (/^بوت بتكرهني؟|بوت بتكرهني$/i.test(m.text)) { 
        let text = `*ماعاش من يكرهكك حبي 🙁*`
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

        await conn.sendMessage(m.chat, { react: { text: '🥺', key: m.key } })
    }
}

export default handler;