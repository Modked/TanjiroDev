import fetch from 'node-fetch';
import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/Baileys';

const timeout = 60000;

let handler = async (m, { conn, command }) => {
    if (command.startsWith('answer_')) {
        let id = m.chat;
        let shanks = conn.shanks[id];

        if (!shanks) {
            return conn.reply(m.chat, '> *الـسـؤال خـلـص يـا أحـول🐤*❌ .', m);
        }

        let selectedAnswerIndex = parseInt(command.split('_')[1]);
        if (isNaN(selectedAnswerIndex) || selectedAnswerIndex < 1 || selectedAnswerIndex > 4) {
            return conn.reply(m.chat, '❌ اختيار غير صالح.', m);
        }

        let selectedAnswer = shanks.options[selectedAnswerIndex - 1];
        let isCorrect = shanks.correctAnswer === selectedAnswer;

        if (isCorrect) {
            await conn.reply(m.chat, `✅ إجابة صحيحة! ربحت 1000 XP!`, m);
            global.db.data.users[m.sender].exp += 1000;
            clearTimeout(shanks.timer);
            delete conn.shanks[id];
        } else {
            shanks.attempts -= 1;
            if (shanks.attempts > 0) {
                await conn.reply(m.chat, `*❌ إجابة خاطئة! تبقى لديك ${shanks.attempts} محاولات.*`, m);
            } else {
                await conn.reply(m.chat, `❌ انتهت المحاولات. الإجابة الصحيحة هي: ${shanks.correctAnswer}`, m);
                clearTimeout(shanks.timer);
                delete conn.shanks[id];
            }
        }
    } else {
        try {
            conn.shanks = conn.shanks || {};
            let id = m.chat;

            if (conn.shanks[id]) {
                return conn.reply(m.chat, '⌛ لا يمكنك بدء اختبار جديد حتى تنتهي من الاختبار الحالي.', m);
            }

            const response = await fetch('https://raw.githubusercontent.com/Khaledst1/-/main/Bot-AlSoltan1.json');
            const shanksData = await response.json();

            if (!shanksData || shanksData.length === 0) {
                throw new Error('فشل في الحصول على بيانات الاختبار.');
            }

            const shanksItem = shanksData[Math.floor(Math.random() * shanksData.length)];
            const { img, name } = shanksItem;

            let options = [name];
            while (options.length < 4) {
                let randomItem = shanksData[Math.floor(Math.random() * shanksData.length)].name;
                if (!options.includes(randomItem)) {
                    options.push(randomItem);
                }
            }
            options.sort(() => Math.random() - 0.5);

            const media = await prepareWAMessageMedia({ image: { url: img } }, { upload: conn.waUploadToServer });

            const interactiveMessage = {
                body: {
                    text: `مــرحــبــا\nاخــتــر أحــد الــخــيــارات أدنــاه:\n*❐ الوقت⏳: 60 ثانية*\n*❐ الجائزة💰: 1000 XP*\n\n⚡ *قـم بـاخـتـيـار زر الإجـابـة!* ⚡\n🏦 *استخدم [ .محفظة ] للاطلاع على الذهب والنقود*`,
                },
                footer: { text: 'اختر الإجابة الصحيحة:' },
                header: {
                    title: 'مرحبا',
                    subtitle: 'اختر أحد الخيارات أدناه:',
                    hasMediaAttachment: true,
                    imageMessage: media.imageMessage,
                },
                nativeFlowMessage: {
                    buttons: options.map((option, index) => ({
                        name: 'quick_reply',
                        buttonParamsJson: JSON.stringify({
                            display_text: `❲『${index + 1}┇${option}┇』❳`,
                            id: `.answer_${index + 1}`
                        })
                    })),
                },
            };

            let msg = generateWAMessageFromContent(m.chat, {
                viewOnceMessage: {
                    message: { interactiveMessage },
                },
            }, { userJid: conn.user.jid, quoted: m });

            conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

            conn.shanks[id] = {
                correctAnswer: name,
                options: options,
                timer: setTimeout(async () => {
                    if (conn.shanks[id]) {
                        await conn.reply(m.chat, `⌛ انتهى الوقت! الإجابة الصحيحة كانت: ${shanks.correctAnswer}`, m);
                        delete conn.shanks[id];
                    }
                }, timeout),
                attempts: 2
            };

        } catch (e) {
            console.error(e);
            conn.reply(m.chat, '❌ حدث خطأ أثناء إرسال الاختبار.', m);
        }
    }
};

handler.help = ['شخصية'];
handler.tags = ['game'];
handler.command = /^(كوره|answer_\d+)$/i;

export default handler;