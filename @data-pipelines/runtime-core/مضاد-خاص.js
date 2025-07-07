export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
    if (m.isBaileys && m.fromMe) return !0;
    if (m.isGroup) return !1;
    if (!m.message) return !0;
    if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA') || m.text.includes('serbot') || m.text.includes('jadibot')) return !0;

    const chat = global.db.data.chats[m.chat];
    const bot = global.db.data.settings[this.user.jid] || {};

    // استخدام متغير لتتبع عدد التحذيرات
    if (!chat.warnCount) chat.warnCount = 0;

    if (bot.antiPrivate && !isOwner && !isROwner) {
        chat.warnCount += 1;

        if (chat.warnCount === 1) {
            await m.reply(`*[⚠️ تحذير] @${m.sender.split`@`[0]}، البوت شغال\nجروبات بس ممنوع من البرايفت كلام معا البوت خاص هتبلك بسكدا 🥂\n> *لو عزت حاجه تعاله وكلم المطور متواضع🧚🏻‍♂️*\n> *\`رقم : المطوࢪ\`*\nhttps://wa.me/+201115618853
`, false, { mentions: [m.sender] });
        } else if (chat.warnCount === 2) {
            await m.reply(`*[⚠️ تحذير ثاني] @${m.sender.split`@`[0]}، البوت شغال\nجروبات بس ممنوع من البرايفت كلام معا البوت خاص هتبلك بسكدا 🥂\n> *لو عزت حاجه تعاله وكلم المطور متواضع🧚🏻‍♂️*\n> *\`رقم : المطوࢪ\`*\nhttps://wa.me/+201115618853`, false, { mentions: [m.sender] });
        } else if (chat.warnCount === 3) {
            await m.reply(`*[⚠️ تحذير أخير] @${m.sender.split`@`[0]}، دي آخر فرصة. التحدث في الخاص يؤدي لعمل بلوك في الخاص .*\n\n*ادخل جروب الدعم لو محتاج أي مساعدة: 『 https://chat.whatsapp.com/ClNQxTnKyFx6eZnJcvqsPY 』*`, false, { mentions: [m.sender] });
        } else if (chat.warnCount >= 4) {
            await m.reply(`*[❗] مرحبًا @${m.sender.split`@`[0]}، تم حظرك لأنك خالفت التعليمات وتحدثت في الخاص.*\n\n*اذا كنت تريد تجربة البوت ادخل جروب الدعم 『 https://chat.whatsapp.com/ClNQxTnKyFx6eZnJcvqsPY 』*\n\n*لو حابب تتواصل مع مطور البوت ده رقمه 『‏‪『https://wa.me/201115618853*`, false, { mentions: [m.sender] });
            await this.updateBlockStatus(m.chat, 'block');
        }
    }

    return !1;
                          }