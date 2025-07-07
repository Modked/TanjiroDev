import axios from 'axios';
const { proto, generateWAMessageFromContent, prepareWAMessageMedia, generateWAMessageContent, getDevice } = (await import("@whiskeysockets/Baileys")).default;

let handler = async (message, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(message.chat, '*\`『 🧚🏼‍♂️اكتب اسم الفيديو الي انت عايزه مع الأمر 』\`*', message);

    async function createVideoMessage(url) {
        const { videoMessage } = await generateWAMessageContent({ video: { url } }, { upload: conn.waUploadToServer });
        return videoMessage;
    }

    async function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    try {
        let results = [];
        let { data: response } = await axios.get('https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=' + text);
        let searchResults = response.data;
        shuffleArray(searchResults);

        let selectedResults = searchResults.splice(0, 4); // استرجاع 4 مقاطع فقط
        for (let result of selectedResults) {
            results.push({
                body: proto.Message.InteractiveMessage.Body.fromObject({ text: null }),
                footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: null }),
                header: proto.Message.InteractiveMessage.Header.fromObject({
                    title: null, // إزالة العنوان
                    hasMediaAttachment: true,
                    videoMessage: await createVideoMessage(result.nowm)
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: [] })
            });
        }

        const responseMessage = generateWAMessageFromContent(message.chat, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                        body: proto.Message.InteractiveMessage.Body.create({ text: '🧚🏼‍♂️نتيجة البحث ' + text }),
                        footer: proto.Message.InteractiveMessage.Footer.create({ text: ' `𝑺𝒂𝒔𝒖𝒌𝒆-𝑩𝒐𝒕`' }),
                        header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
                        carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: [...results] })
                    })
                }
            }
        }, { quoted: message });

        await conn.relayMessage(message.chat, responseMessage.message, { messageId: responseMessage.key.id });
    } catch (error) {
        await conn.reply(message.chat, error.toString(), message);
    }
}

handler.help = ['tiktoksearch <txt>'];
handler.tags = ['بحث'];
handler.command = ['استوري', 'ستوري', 'بحث-تيك', 'بحث_تيك', 'تيكتوك', 'tiktoksearch', 'tiktok'];

export default handler;