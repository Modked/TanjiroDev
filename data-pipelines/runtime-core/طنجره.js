import { createCanvas, loadImage } from 'canvas'
import { canLevelUp, xpRange } from '../lib/levelling.js'

let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender]
    let name = conn.getName(m.sender)
    
    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
        let { min, xp, max } = xpRange(user.level, global.multiplier)
        return m.reply(`『 *إحصائياتك 🆙* 』\n\nإحصائياتك في الوقت الحقيقي 🕐\n\n├─ ❏ *الاسم:*  ${name}\n├─ ❏ *XP 🆙:* ${user.exp - min}/${xp}\n├─ ❏ *المستوى:* ${user.level}\n└─ ❏ *الرتبة:* ${user.role}\n\n> ناقصك *${max - user.exp}* XP عشان تترقى`.trim())
    }

    let before = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
    
    if (before !== user.level) {
        let teks = `🎊 مبروك ${name} وصلت لمستوى جديد!`
        let str = `*[ 𝐋𝐄𝐕𝐄𝐋 𝐔𝐏 ]*\n\n*• المستوى السابق:* ${before}\n*• المستوى الحالي:* ${user.level}\n*• الرتبة:* ${user.role}\n\n> _*كل ما تتفاعل مع البوت أكتر، هتزيد مستوياتك!*_`.trim()
        
        try {
            let pp = await conn.profilePictureUrl(m.sender, 'image').catch(() => 'https://i.ibb.co/m53WF9N/avatar-contact.png')
            let bgUrl = `https://files.catbox.moe/mfiqm9.jpg`
            let [bg, avatar] = await Promise.all([loadImage(bgUrl), loadImage(pp)])

            const canvas = createCanvas(900, 420)
            const ctx = canvas.getContext('2d')

            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

            const avatarSize = 200, avatarX = 50, avatarY = 90
            ctx.save()
            ctx.beginPath()
            ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2, true)
            ctx.closePath()
            ctx.clip()
            ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize)
            ctx.restore()

            ctx.fillStyle = '#E0E0E0'
            ctx.font = 'bold 24px Arial'
            ctx.textAlign = 'left'
            const textX = avatarX + avatarSize + 35, textY = avatarY + 80
            ctx.fillText(`${name}    |    LVL ${user.level}    |    ${user.role}`, textX, textY)

            const barX = textX, barY = textY + 70, barWidth = 500, barHeight = 28
            const progress = (user.exp % 100) / 100
            ctx.fillStyle = '#333'
            ctx.fillRect(barX, barY, barWidth, barHeight)
            ctx.fillStyle = '#8A2BE2'
            ctx.fillRect(barX, barY, barWidth * progress, barHeight)
            
            let buffer = canvas.toBuffer('image/png')
            console.log(`✅ حجم الصورة: ${buffer.length} بايت`)
            
            if (buffer && buffer.length > 0) {
                await conn.sendMessage(m.chat, { image: buffer, caption: str, mimetype: 'image/png' }, { quoted: m })
            } else {
                console.error('⚠️ فشل إنشاء الصورة: buffer فارغ')
                await conn.sendFile(m.chat, buffer, 'levelup.png', str, m)
            }
        } catch (e) {
            console.error('❌ خطأ أثناء إرسال الصورة:', e)
            m.reply(str)
        }
    }
}

handler.help = ['levelup']
handler.tags = ['econ']
handler.command = ['طنجره']

export default handler