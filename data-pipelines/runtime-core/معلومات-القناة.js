import axios from 'axios';

const handler = async (m, { conn, text }) => {
    if (!text) return m.reply('يرجى تقديم رابط قناة او مجموعه واتس لي جلب ايدي الخاص بها');

    const isGroupLink = text.includes("https://chat.whatsapp.com/");
    const isChannelLink = text.includes("https://whatsapp.com/channel/");

    if (isGroupLink) {
        const link = text;
        const lin = link.split('com/')[1];
        try {
            const gr = await conn.groupGetInviteInfo(lin);
            await m.reply(gr.id);
        } catch (error) {
            console.error('Error fetching group info:', error);
            m.reply('فشل في جلب معلومات المجموعة. تحقق من الرابط وحاول مجددًا');
        }
    } else if (isChannelLink) {
        const result = text.split('https://whatsapp.com/channel/')[1];
        try {
            const res = await conn.newsletterMetadata("invite", result);
            await m.reply(res.id);
        } catch (error) {
            console.error('Error fetching channel info:', error);
            m.reply('فشل في جلب معلومات القناة. تحقق من الرابط وحاول مجددًا وإنشاء الله يعمل');
        }
    } else {
        m.reply('المرجو تقديم رابط مجموعه او قناة صحيح من فضلك يا اخي');
    }
};

handler.command = /^(ايدي-قناة|ايدي-قناه|معلومات-قناه|معلومات-قناة|معلومات-القناه|معلومات-القناة|معلومات_القناه|معلومات_القناة)$/i;

export default handler;