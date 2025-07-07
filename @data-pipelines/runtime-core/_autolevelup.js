import { createCanvas, loadImage } from 'canvas'
import { canLevelUp, xpRange } from '../lib/levelling.js'

export async function before(m) {
    let user = global.db.data.users[m.sender]
    if (!user.autolevelup) return

    let before = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++

    if (before !== user.level) {
        let ini_txt = `⚡━━❖【⚔️الأوتشيها الأسطوري⚔️】❖━━⚡\n\n🔥 القـوة تتـدفـق فـي عـروقـك، أيهـا الأوتشيهـا! 🔥\n\n⚡ المـسـتـوى: 【 ${before} ➝ ${user.level} 】\n\n☠️ الـعـظـمـة تـنـتـظـرك، لا تـتـراجـع! ⚔️🔥\n\⚡━━❖【🖤وسـاسـكـي الـعـم🖤】❖━━⚡\n\n> *🎭✨ أسطـورة تُـولـد فـي كـل مـعـركـة! ✨🎭*`.trim()
        let nama = await conn.getName(m.sender)

        try {
            let pp
            try {
                pp = await this.profilePictureUrl(m.sender, 'image')
            } catch {
                pp = 'https://i.ibb.co/m53WF9N/avatar-contact.png'
            }

            let backgroundUrl = `https://files.catbox.moe/mfiqm9.jpg`

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

            ctx.strokeStyle = '#8A2BE2'
            ctx.lineWidth = 6
            ctx.beginPath()
            ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2 + 3, 0, Math.PI * 2, true)
            ctx.stroke()

            ctx.fillStyle = '#E0E0E0'
            ctx.font = 'bold 24px Arial'
            ctx.textAlign = 'left'

            const textX = avatarX + avatarSize + 35, textY = avatarY + 60

            // حساب الـ EXP اللازم للمستوى التالي
            let { min, xp } = xpRange(user.level, global.multiplier)
            let currentExp = user.exp - min
            let expNeeded = xp

            // عرض EXP بالشكل: الحالي / المطلوب
            ctx.fillText(`Name: ${nama}`, textX, textY)
            ctx.fillText(`Level: ${user.level}`, textX, textY + 35)
            ctx.fillText(`EXP: ${currentExp}/${expNeeded}`, textX, textY + 70)

            // حساب التقدم داخل شريط الـ EXP
            const progress = currentExp / expNeeded

            const barX = textX, barY = textY + 100, barWidth = 500, barHeight = 28

            ctx.fillStyle = '#333'
            ctx.beginPath()
            ctx.roundRect(barX, barY, barWidth, barHeight, 14)
            ctx.fill()

            const gradient = ctx.createLinearGradient(barX, barY, barX + barWidth, barY)
            gradient.addColorStop(0, '#8A2BE2')
            gradient.addColorStop(1, '#1E90FF')

            ctx.fillStyle = gradient
            ctx.beginPath()
            ctx.roundRect(barX, barY, barWidth * progress, barHeight, 14)
            ctx.fill()

            ctx.strokeStyle = '#D8BFD8'
            ctx.lineWidth = 2
            ctx.stroke()

            // نسبة التقدم داخل شريط التقدم
            ctx.fillStyle = '#FFFFFF'
            ctx.font = 'bold 20px Arial'
            ctx.textAlign = 'center'
            ctx.fillText(`${Math.floor(progress * 100)}%`, barX + barWidth / 2, barY + barHeight / 2 + 5)

            await this.sendMessage(m.chat, { image: canvas.toBuffer(), caption: ini_txt }, { quoted: m })
        } catch (err) {
            console.error("❌ خطأ أثناء إنشاء الصورة:", err.message, err.stack)
            await m.reply(ini_txt)
        }
    }
}

export const disabled = false