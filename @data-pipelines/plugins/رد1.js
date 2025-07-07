let handler = m => m 
handler.all = async function (m) { 
    let chat = global.db.data.chats[m.chat]

    if (/^احا$/i.test(m.text)) { 
        let text = `*احتين علي احتك 🐦🥹*`
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

        await conn.sendMessage(m.chat, { react: { text: '🐧', key: m.key } })
    }

    if (/^اخرس|اسكت$/i.test(m.text)) { 
        let text = `*اخــرس انــت 🗿💔*`
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

        await conn.sendMessage(m.chat, { react: { text: '🗿', key: m.key } })
    }

    if (/^انا جيت$/i.test(m.text)) { 
        let text = `*مــنــور وربــنــا 😂❤️*`
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

    if (/^حرامي|سارق$/i.test(m.text)) { 
        let text = `*اتهامك بالسرقة جهلك بالحقيقة 😂*`
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

        await conn.sendMessage(m.chat, { react: { text: '☠️', key: m.key } })
    }

    if (/^ملل|مللل|ملللل$/i.test(m.text)) { 
        let text = `*مـلــلــل جــدد 😃💔*`
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

        await conn.sendMessage(m.chat, { react: { text: '💔', key: m.key } })
    }

    if (/^السلام عليكم |السلام عليكم ورحمة الله|سلام عليكم|السلام عليكم ورحمة الله وبركاته$/i.test(m.text)) { 
        let text = `*وعليكم السلام ورحمة الله وبركاته ♥*`
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

    if (/^🤖$/i.test(m.text)) { 
        let text = `*هل انت بوت ياصحبي؟ 🗿*`
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


    if (/^اه$/i.test(m.text)) { 
        let text = `*الــشــارع الــي وراه 😂💔*`
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

        await conn.sendMessage(m.chat, { react: { text: '😹', key: m.key } })
    }

    if (/^نعم$/i.test(m.text)) { 
        let text = `*حد ناداك؟ 🐦*`
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

    if (/^كيفك|شخبارك|علوك|عامل ايه|اخبارك|اي الدنيا$/i.test(m.text)) { 
        let text = `*الحمد لله زي الفل وانت أخبارك 🥀؟*`
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

    if (/^تتجوزيني|تتجوزيني؟|تتزوجني|زوجني|تزوجيني$/i.test(m.text)) { 
        let text = `*بــس يــعــم بــتــكــســف 😭💔*`
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

        await conn.sendMessage(m.chat, { react: { text: '🥺', key: m.key } })
    }

    if (/^عبيط|يا عبيط|عبط|غباء|غبي$/i.test(m.text)) { 
        let text = `*تــنــمــر لــفــل ماكــس 😂*`
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

    if (/^كسمك$/i.test(m.text)) { 
        let text = `*عــيــب يــاض 🗿😭*`
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

        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    }

    if (/^يابوت|يا بوت$/i.test(m.text)) { 
        let text = `*هممممم وش في انت كمان 🗿*`
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

    if (/^بوت خرا|بوت زفت|خرا عليك$/i.test(m.text)) { 
        let text = `*دزهــا يــاض 😂🗿*`
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

    if (/^بحبك|احبك|حبيبي|حبيبتي$/i.test(m.text)) { 
        let text = `* انت/ي حبي 😂❤️*`
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

    if (/^بوت زق$/i.test(m.text)) { 
        let text = `*انــقــلــع بــس 😂💔*`
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

        await conn.sendMessage(m.chat, { react: { text: '🤢', key: m.key } })
    }

    if (/^همممم|امممم|هممم|اممم$/i.test(m.text)) { 
        let text = `*اعــوز بـي الله مــنــك 😂💔*`
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

    if (/^امزح|بهزر|مزح|هزار$/i.test(m.text)) { 
        let text = `*هــزر بــراحــتــك يــابــن قــلـبـي 😂❤️*`
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

    if (/^في ايه|ايش في|ايش صاير|شو صار|ايش صار|شو صار|حد يخبرني|حد يتكلم$/i.test(m.text)) { 
        let text = `*وربــنــا مــا اعــرف 🗿*`
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

    if (/^تست$/i.test(m.text)) { 
        let text = `*شــغــال يــا روحــي ⚡❤️*`
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

    if (/^صباح الخير|صباح النور$/i.test(m.text)) { 
        let text = `*صــبــاح الــفــل 😘❤️*`
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


    if (/^منور|منوره$/i.test(m.text)) { 
        let text = `*ايــه الــنــور ده كــلــه 😘*`
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