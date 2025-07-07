import { createCanvas, loadImage } from 'canvas'
import { canLevelUp, xpRange } from '../lib/levelling.js'
import { levelup } from '../lib/canvas.js' 

let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender]
    let level = user.level

    let roles = [
        { level: 1, role: 'نينجا مبتدئ من الأوتشيها 🌱' },
        { level: 2, role: 'عضو في عشيرة الأوتشيها 🔥'},
        { level: 3, role: 'مقاتل الأوتشيها 💥' },
        { level: 4, role: 'شينوبي الأوتشيها المخضرم 🔪' },
        { level: 5, role: 'مساعد ساسكي 🎩' },
        { level: 6, role: 'الوريث القادم للأوتشيها ⚡' },
        { level: 7, role: 'سوسانو الأوتشيها 🦋' },
        { level: 8, role: 'تلميذ ساسكي 🌑' },
        { level: 9, role: 'أوتشيها ساسكي نفسه 🖤' },
        { level: 10, role: 'حاكم الأوتشيها 🔥👑' },
        { level: 11, role: 'سفير الأوتشيها ⚡🔮' },
        { level: 12, role: 'محارب الأوتشيها العظيم ⚔️' },
        { level: 13, role: 'نائب رئيس الأوتشيها 🖤⚡' },
        { level: 14, role: 'المرشد الروحي للأوتشيها 🌒' },
        { level: 15, role: 'شيطان الأوتشيها 💀🔥' },
        { level: 16, role: 'أمير الأوتشيها 👑🖤' },
        { level: 17, role: 'الظل الأوتشيها الساكن 🌑' },
        { level: 18, role: 'اليد اليمنى لساسكي 👋' },
        { level: 19, role: 'سيد الأوتشيها الأول 🔥🖤' },
        { level: 20, role: 'إله الأوتشيها 🔥⚡' },
        { level: 21, role: 'الملك الأوتشيها 👑🔥' },
        { level: 22, role: 'حاكم الشينوبي الخالد 🦋' },
        { level: 23, role: 'القائد الأعلى للأوتشيها 💪' },
        { level: 24, role: 'الشيطان العائد من الجحيم 🔥💀' },
        { level: 25, role: 'حاكم الأوتشيها الأخير 🖤👑' },
        { level: 26, role: 'الأسطورة الحية للأوتشيها 🌟' },
        { level: 27, role: 'المقاتل المجنح للأوتشيها 🦋💥' },
        { level: 28, role: 'المحقق العظيم للأوتشيها 🔎🖤' },
        { level: 29, role: 'الظل القوي للأوتشيها 🌑🔥' },
        { level: 30, role: 'الشبح الأوتشيها القوي 👻💪' },
        { level: 31, role: 'الدم الأحمر للأوتشيها 🔴💥' },
        { level: 32, role: 'حامل سوسانو الجديد 🦋⚡' },
        { level: 33, role: 'صائد الأرواح الأوتشيها 👹🔥' },
        { level: 34, role: 'قاهر الأعداء الأوتشيها 🖤⚔️' },
        { level: 35, role: 'اليد الباطشة للأوتشيها ✋💀' },
        { level: 36, role: 'ملك الظلال الأوتشيها 🌑👑' },
        { level: 37, role: 'حاكم القوة العظمى للأوتشيها 💪🔥' },
        { level: 38, role: 'سيد الأوتشيها الأسطوري ⚡🖤' },
        { level: 39, role: 'زعيم الشينوبي الخالد 🦋👑' },
        { level: 40, role: 'العدو النهائي للأوتشيها 🖤🔥' },
        { level: 41, role: ' الأوتشيها الأسمى 🌌⚡' },
        { level: 42, role: 'حاكم القوة العظمى للأوتشيها 💪🔥' },
        { level: 43, role: 'حاكم عالم الأوتشيها 🔥🌎' },
        { level: 44, role: 'الملوك المظلمين للأوتشيها 🖤👑' },
        { level: 45, role: 'القتال الأخير للأوتشيها 💀🔥' },
        { level: 46, role: 'التنين الأوتشيها الأزرق 🐉⚡' },
        { level: 47, role: 'الأوتشيها العظيم الذي لا يقهر 🔥🖤' },
        { level: 48, role: 'ملك الأوتشيها الساكن 🌑👑' },
        { level: 49, role: 'المقاتل الناري الأوتشيها 🔥💥' },
        { level: 50, role: 'سيد الفوضى الأوتشيها 🌪️🔥' },
        { level: 51, role: 'أوتشيها ساسكي المزعج 🖤🔥' },
        { level: 52, role: 'الوريث العظيم للأوتشيها 🔥⚡' },
        { level: 53, role: 'الظل المظلم للأوتشيها 🌑💀' },
        { level: 54, role: 'زعيم الأوتشيها الأقوى 🖤🔥' },
        { level: 55, role: 'ملك الظلام الأوتشيها 🖤👑' },
        { level: 56, role: 'الشيطان الخالد للأوتشيها 💀🔥' },
        { level: 57, role: 'سوسانو الأوتشيها الذي لا يقهر ⚡🦋' },
        { level: 58, role: 'الأسطورة الحية للأوتشيها 🖤🌌' },
        { level: 59, role: 'شيطان النار الأوتشيها 🔥💀' },
        { level: 60, role: '🔱الأوتشيها الأعظم⚡🖤' }
    ]
    let role = roles.find(r => level <= r.level)?.role || 'الزعيم المطلق للعصابات👑'

    let { min, xp, max } = xpRange(user.level, global.multiplier)
        let currentExp = user.exp - min
        let expNeeded = xp

    let ini_txt = `╮ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ╭ـ\n˼🤴🏼˹┆ الـاسـم┆↵ ⌟${user.name}⌜\n˼🔮˹┆الـمـسـتـوي┆↵ ⌟${user.level}⌜\n˼🎖️˹┆رتـبــتـك┆↵ ⌟${role}⌜\n˼🚀˹┆رصــيـدك┆↵ ⌟${user.exp }⌜\n╯ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ╰ـ\n> ˼📯˹ مــلـاحـــظـــة ⇅ ↶\n╮ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ╭ـ\n>  *—◉ كلما لعبت  وتفاعلت  مع  البوت  يزداد  مستواك⚡. استمر  في  التفاعل  مع  البوت 🎃!* \n> _نـاقـصـك   *${xp - (user.exp - min)}* XP   عـشـان   تـتـرقـى\n_╯ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ╰ـ\n> © ʙy ᴛᴀɴᴊɪʀᴏ-ᴀɪ ²⁰²⁵
`
    let nama = await conn.getName(m.sender)

    try {
        let pp = await conn.profilePictureUrl(m.sender, 'image').catch(() => 'https://i.ibb.co/m53WF9N/avatar-contact.png')
        let backgroundUrl = `https://files.catbox.moe/cakuly.jpg`

        let [bg, avatar] = await Promise.all([
            loadImage(backgroundUrl),
            loadImage(pp)
        ])

        const canvas = createCanvas(900, 420)
        const ctx = canvas.getContext('2d')

        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

        const overlayX = 30, overlayY = 60, overlayWidth = 840, overlayHeight = 300, overlayRadius = 30
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
        ctx.beginPath()
        ctx.moveTo(overlayX + overlayRadius, overlayY)
        ctx.lineTo(overlayX + overlayWidth - overlayRadius, overlayY)
        ctx.quadraticCurveTo(overlayX + overlayWidth, overlayY, overlayX + overlayWidth, overlayY + overlayRadius)
        ctx.lineTo(overlayX + overlayWidth, overlayY + overlayHeight - overlayRadius)
        ctx.quadraticCurveTo(overlayX + overlayWidth, overlayY + overlayHeight, overlayX + overlayWidth - overlayRadius, overlayY + overlayHeight)
        ctx.lineTo(overlayX + overlayRadius, overlayY + overlayHeight)
        ctx.quadraticCurveTo(overlayX, overlayY + overlayHeight, overlayX, overlayY + overlayHeight - overlayRadius)
        ctx.lineTo(overlayX, overlayY + overlayRadius)
        ctx.quadraticCurveTo(overlayX, overlayY, overlayX + overlayRadius, overlayY)
        ctx.closePath()
        ctx.fill()

        const avatarSize = 180
        const avatarX = 80, avatarY = 120
        ctx.save()
        ctx.beginPath()
        ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2, true)
        ctx.closePath()
        ctx.clip()
        ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize)
        ctx.restore()

        ctx.strokeStyle = '#8B0000'
        ctx.lineWidth = 6
        ctx.beginPath()
        ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2 + 3, 0, Math.PI * 2, true)
        ctx.stroke()

        ctx.fillStyle = '#E0E0E0'
        ctx.font = 'bold 24px Arial'
        ctx.textAlign = 'left'

        const textX = avatarX + avatarSize + 35, textY = avatarY + 60

            // حساب الـ EXP اللازم للمستوى التالي
        
        let { min, xp, max } = xpRange(user.level, global.multiplier)
        let currentExp = user.exp - min
        let expNeeded = xp

        ctx.fillText(`${nama}`, textX, textY)
        ctx.fillText(`LVL ${user.level}`, textX, textY + 35)
        ctx.fillText(`EXP: ${user.exp}`, textX, textY + 70)

        const barX = textX, barY = textY + 100, barWidth = 500, barHeight = 28
        const progress = (user.exp - min) / xp

        ctx.fillStyle = '#333'
        ctx.beginPath()
        ctx.roundRect(barX, barY, barWidth, barHeight, 14)
        ctx.fill()

        const gradient = ctx.createLinearGradient(barX, barY, barX + barWidth, barY)
        gradient.addColorStop(0, '#8B0000')
        gradient.addColorStop(1, '#1E90FF')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.roundRect(barX, barY, barWidth * progress, barHeight, 14)
        ctx.fill()

        ctx.strokeStyle = '#D8BFD8'
        ctx.lineWidth = 2
        ctx.stroke()

        ctx.fillStyle = '#FFFFFF'
        ctx.font = 'bold 20px Arial'
        ctx.textAlign = 'center'
        ctx.fillText(`${Math.floor(progress * 100)}%`, barX + barWidth / 2, barY + barHeight / 2 + 5)

        await conn.sendMessage(m.chat, { image: canvas.toBuffer(), caption: ini_txt }, { quoted: m })
    } catch (err) {
        console.error("❌ خطأ أثناء إنشاء الصورة:", err.message, err.stack)
        await m.reply(ini_txt)
    }
}

handler.command = ['مستوي', 'مستوى_أعلى', 'مستوايا', 'لفل', 'رانك', 'مستواه', 'lvl', 'level']

export default handler