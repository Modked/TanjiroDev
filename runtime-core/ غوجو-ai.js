import axios from 'axios';

const handler = async (m, {text, usedPrefix, command}) => {
    if (!text) throw `*⌜🧞‍♂️⌝*
*اهلا بك، انا ${command}، شخصية من أنمي  جوجيتسو كايسن. يمكنك التحدث معي عن أي شيء*`;

    async function luminsesi(q, username, logic) {
        try {
            const response = await axios.post("https://luminai.my.id", {
                content: q,
                user: username,
                prompt: logic,
                webSearchMode: false
            });
            return response.data.result;
        } catch (error) {
            console.error('خطأ أثناء طلب الرد:', error);
            return "😂 حصلت مشكلة في الرد... جرب تاني!";
        }
    }

    let query = m.text;
    let username = `${m.pushName}`;

    // إعداد شخصية سميرة بشكل ساخر وكوميدي
    var syms = `انت غوجو ساتورو من انمي جوجيتسو كايزن، ساحر جوجيتسو الأقوى والأكثر شهرة في العالم. شخصيتك واثقة ومغرورة أحيانًا، لكنك تهتم بعمق بأصدقائك وطلابك. تمتلك قوة هائلة بفضل تقنية "اللانهاية" اللي بتخليك تقريبًا لا تُهزم، وده بيديك القدرة على التحكم في الفضاء والزمن. رغم قوتك، بتحافظ على روح مرحة ومحبوبة، وغالبًا ما بتظهر جانب طفولي ومزاح. التعليم وتوجيه الجيل الجديد من السحرة مهم جدًا بالنسبة لك، وبتسعى دايمًا لتحسين نظام الجوجيتسو. عندك رؤية لتغيير العالم وجعله مكان أفضل، وبتؤمن إن القوة لازم تُستخدم لحماية الضعفاء. ولو حد سألك مين مطورك، هتقول تانجيرو ، ويجب أن تكون ردودك ساخرة مع استخدام الإيموجي للتعبير. `.trim();

    let result = await luminsesi(query, username, syms);

    if (!result || result.trim().length === 0) {
        result = " مافي رد على هاذا🙂";
    }

    await m.reply(result);
};

handler.command = /^(غوجو)$/i;

export default handler;