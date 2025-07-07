import fs from 'fs'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
const { levelling } = '../lib/levelling.js'
import PhoneNumber from 'awesome-phonenumber'
import { promises } from 'fs'
import { join } from 'path'
let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text, isPrems }) => {
try {
let vn = 'https://qu.ax/RUDfN.mp4' 
let pp = imagen4 
let img = await(await fetch('https://telegra.ph/.')).buffer()
let d = new Date(new Date + 3600000)
let locale = 'fr'
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
let _uptime = process.uptime() * 1000
let uptime = clockString(_uptime)
let user = global.db.data.users[m.sender]
let { money, joincount } = global.db.data.users[m.sender]
let { exp, limit, level, role } = global.db.data.users[m.sender]
let { min, xp, max } = xpRange(level, global.multiplier)
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length 
let more = String.fromCharCode(8206)
let readMore = more.repeat(850)   
let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]
let str = `*┣┅ ⋄━──═◞⬪♦️⬪◟═──━⋄  ┅┣*
*↶┇Sasuke Bot↞♦️*
*❮🎩↜Bienvenue┇ ${taguser} ❯*
*❮🎩↜Nom┇Sasuke Sama ❯*
*❮🎩↜Version┇1.0.0 ❯*
*❮🎩↜Site┇Heroku⚔️ ❯*
*❮🎩↜Développeurs┇Tapez .dev pour voir tous les développeurs ❯*
*❮🎩↜Chaîne du bot┇https://whatsapp.com/channel/0029VaklBGFHFxOwODjsoP13 ❯* 

*┣┅ ⋄━──═◞⬪♦️⬪◟═──━⋄  ┅┣*

*┃╻Avant chaque commande, mettez ↜ ❮ . ❯╹*
*┃╻❮ ˼Informations du bot ˼.support˹ ❯╹*
*┃╻❮ ˼Liste 📜 des commandes˹ ❯ ↯╹*

*┣┅ ⋄━──═◞⬪♦️⬪◟═──━⋄  ┅┣*

*『.m1┇↵ Section des🔮membres』*
*『.m2┇↵ Section🕋religieuse』*
*『.m3┇↵ Section🎭des développeurs』*
*『.m4┇ Section⚡Téléchargements』*
*『.m5┇↵ Section🛵jeux』*
*『.m6┇↵ Section🌀transferts』*
*『.m7┇↵ Section🗿intelligence』*
*『.m8┇↵ Section📣support』*
*『.m10┇↵ Section👷modération』*
*『.m11┇↵ Section🔍recherche』*

*┣┅ ⋄━──═◞⬪♦️⬪◟═──━⋄  ┅┣*

*┃╻⚠️╹↜ ٭ `Remarque` ٭ ↯*

*┃╻⓵Il est strictement interdit d'insulter le bot╹*
*┃╻⓶Utilisation équilibrée du bot requise╹*
*┃╻⓷ [.dev] pour ajouter le bot !╹*

*┣┅ ⋄━──═◞⬪♦️⬪◟═──━⋄  ┅┣*
> _*٭.  ❞  𝑺𝒂𝒔𝒖𝒌𝒆  ❝ .٭*_`.trim()

   let buttonMessage = {
        'image': pp,
        'caption': str.trim(),
        'mentions': [m.sender],
        'footer': '' + wm,
        'headerType': 4,
        'contextInfo': {
            'mentionedJid': [m.sender],
            'externalAdReply': {
                'showAdAttribution': true,
                'mediaType': 'VIDEO',
                'mediaUrl': null,
                'title': 'Sasuke Bot',
                'body': null,
                'thumbnail': img,
                'sourceUrl': 'https://whatsapp.com/channel/0029VaklBGFHFxOwODjsoP13'
            }
        }
    };
    conn.sendMessage(m.chat, buttonMessage, {
        quoted: m
    })

} catch {
    conn.reply(m.chat, '[❗Erreur❗]', m)
}
}
handler.command = /^(تستا)$/i;
handler.exp = 20
handler.fail = null
export default handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}