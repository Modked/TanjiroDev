let handler = async (m, { conn }) => {
    try {
        // السماح فقط للرقم 967772350066 باستخدام هذا الأمر
        if (m.sender !== '994403585483@s.whatsapp.net') {
            return m.reply('⚠️ هذا الأمر متاح فقط لمطوري تانجيرو! 😏');
        }

        let bot = conn.user.jid // معرف البوت
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''

        if (!/image/.test(mime)) {
            return m.reply('🚫 أرسل و رد على الصورة لتعيينها كبروفايل.')
        }

        let img = await q.download()
        if (!img) return m.reply('❌ فشل تحميل الصورة، حاول مجددًا.')

        await conn.updateProfilePicture(bot, img)
        m.reply('🪄🫰🏻 *حطيتها يا حبي تانجيرو*')
    } catch (err) {
        console.error(err)
        m.reply('⚠️ حدث خطأ أثناء تحديث صورة البوت.')
    }
}

handler.help = ['setppbot']
handler.tags = ['owner']
handler.command = /^(حطها_بروفايل3)$/i
handler.owner = true

export default handler