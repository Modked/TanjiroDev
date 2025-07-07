import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/Baileys';

const timeout = 60000;

let handler = async (m, { conn, command }) => {
    if (command.startsWith('جوابي_')) {
        let id = m.chat;
        let obito = conn.obito[id];

        if (!obito) {
            return conn.reply(m.chat, '*⎔ ⋅ ───━ •﹝⚡﹞• ━─── ⋅ ⎔*\n> *الـسـؤال خـلـص يـا أحـول🐤❌* \n*⎔ ⋅ ───━ •﹝🔱﹞• ━─── ⋅ ⎔*', m);
        }

        let selectedAnswerIndex = parseInt(command.split('_')[1]);
        if (isNaN(selectedAnswerIndex) || selectedAnswerIndex < 1 || selectedAnswerIndex > 4) {
            return conn.reply(m.chat, '*⎔ ⋅ ───━ •﹝⚡﹞• ━─── ⋅ ⎔*\n> * أختيار غير صالح🐤❌* \n*⎔ ⋅ ───━ •﹝⚡﹞• ━─── ⋅ ⎔*', m);
        }

        let selectedAnswer = obito.options[selectedAnswerIndex - 1];
        let isCorrect = obito.correctAnswer === selectedAnswer;

        if (isCorrect) {
            await conn.reply(m.chat, `*⎔ ⋅ ───━ •﹝⚡﹞• ━─── ⋅ ⎔*\n*_إجـابـة صـحـيـحـة مـبـروك ⚜️🎃_*\n*💰┊الـجـائـزة┊⇇『500xp』*\n*⎔ ⋅ ───━ •﹝⚡﹞• ━─── ⋅ ⎔*`, m);
            global.db.data.users[m.sender].exp += 500;
            clearTimeout(obito.timer);
            delete conn.obito[id];
        } else {
            obito.attempts -= 1;
            if (obito.attempts > 0) {
                await conn.reply(m.chat, `*⎔ ⋅ ───━ •﹝⚡﹞• ━─── ⋅ ⎔*\n> *اجـــابــه خــاطــئـــه يــا فــاشــل ❌*\n*تـبقـى لـديـك مـحـاولـات  :  ${obito.attempts} ⚜️🎃_*\n*⎔ ⋅ ───━ •﹝⚡﹞• ━─── ⋅ ⎔*`, m);
            } else {
                await conn.reply(m.chat, `*⎔ ⋅ ───━ •﹝⚡﹞• ━─── ⋅ ⎔*\n> *إجـابـة خـاطـئـه*\n*_انتهت محاولاتك ⚜️🤦🏻_*\n*🎃┊الإجابة الصحيحة┊⇇『${obito.correctAnswer}』*\n*⎔ ⋅ ───━ •﹝⚡﹞• ━─── ⋅ ⎔*`, m);
                clearTimeout(obito.timer);
                delete conn.obito[id];
            }
        }
    } else {
        try {
            conn.obito = conn.obito || {};
            let id = m.chat;

            if (conn.obito[id]) {
                return conn.reply(m.chat, '*⎔ ⋅ ───━ •﹝⚡﹞• ━─── ⋅ ⎔*\n> *لا يمكن بدأ  لعبة جديد حتى تنتهي اللعبة الحالية يا ذكي❌🎃*\n*⎔ ⋅ ───━ •﹝⚡﹞• ━─── ⋅ ⎔*', m);
            }

            const response = await fetch('https://gist.githubusercontent.com/Kyutaka101/98d564d49cbf9b539fee19f744de7b26/raw/f2a3e68bbcdd2b06f9dbd5f30d70b9fda42fec14/guessflag');
            const obitoData = await response.json();

            if (!obitoData) {
                throw new Error('*⎔ ⋅ ───━ •﹝⚡﹞• ━─── ⋅ ⎔*\n> *فشل الحصول على المعلومات، تواصل المطور للحل ⚜️🎃*\n*⎔ ⋅ ───━ •﹝⚡﹞• ━─── ⋅ ⎔*');
            }

            const obitoItem = obitoData[Math.floor(Math.random() * obitoData.length)];
            const { img, name } = obitoItem;

            let options = [name];
            while (options.length < 4) {
                let randomItem = obitoData[Math.floor(Math.random() * obitoData.length)].name;
                if (!options.includes(randomItem)) {
                    options.push(randomItem);
                }
            }
            options.sort(() => Math.random() - 0.5);

            const media = await prepareWAMessageMedia({ image: { url: img } }, { upload: conn.waUploadToServer });

            const interactiveMessage = {
                body: {
                    text: `*⎔ ⋅ ───━ •﹝⚡﹞• ━─── ⋅ ⎔*\nمــرحــبــا\nاخــتــر أحــد الــخــيــارات أدنــاه:\n*┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅╮*\n*❐↞┇الـوقـت⏳↞ 60.00 ثـانـيـة┇❯*\n*❐↞┇الـجـائـزة💰↞ 500xp┇❯*\n*┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅╯*\n\n⚡ *قـم بـاخـتـيـار زر الإجـابـة!* ⚡\n🏦 *إسـتـخـدم [ .مـحـفـظـة ] لـلإطـلاع عـلـى الـذهـب و الـنـقـود*\n*اخــتــر الــإجــابــة الــصــحــيــحــة :*\n*⎔ ⋅ ───━ •﹝⚡﹞• ━─── ⋅ ⎔*`,
                },
                footer: { text: '> *•.★°...ღ𝕊𝔸𝕊𝕌𝕂𝔼 𝔹𝕆𝕋 ღ彡★*' },
                header: {
                    title: 'ㅤ',
                    subtitle: ' اختر أحد الخيارات أدناه ⇊',
                    hasMediaAttachment: true,
                    imageMessage: media.imageMessage,
                },
                nativeFlowMessage: {
                    buttons: options.map((option, index) => ({
                        name: 'quick_reply',
                        buttonParamsJson: JSON.stringify({
                            display_text: `┊${index + 1}┊⇇『${option}』`,
                            id: `.جوابي_${index + 1}`
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

            conn.obito[id] = {
                correctAnswer: name,
                options: options,
                timer: setTimeout(async () => {
                    if (conn.obito[id]) {
                        await conn.reply(m.chat, `*⎔ ⋅ ───━ •﹝⚡﹞• ━─── ⋅ ⎔*\n*⌛┊⇇ انتهى الوقت*\n*🎃┊الإجابة الصحيحة┊⇇『${name}』*\n*⎔ ⋅ ───━ •﹝⚡﹞• ━─── ⋅ ⎔*`, m);
                        delete conn.obito[id];
                    }
                }, timeout),
                attempts: 2
            };

        } catch (e) {
            console.error(e);
            conn.reply(m.chat, 'حدث خطأ في إرسال الرسالة.', m);
        }
    }
};

handler.help = ['اوبيتو'];
handler.tags = ['اوبيتو'];
handler.command = /^(احزر|احزري|جوابي_\d+)$/i;

export default handler;