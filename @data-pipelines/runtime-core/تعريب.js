import axios from 'axios';

const handler = async (m, {text, usedPrefix, command}) => {
    if (!text) throw `*المرجو تقديم جملة مفيده لي تعريبها كما سمعت 🤩*`;

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
            console.error('خطأ اثناء تعريب:', error);
            return "حصلت مشكله اثناء تعريب يا اخي";
        }
    }

    let query = m.text;
    let username = `${m.pushName}`;

    
    var syms = `أعرب كل جملة يعني أنك فقط تعرب الجمل العربية واذ لم يقدم لك جملة قل له انا معرب فقط هذه الجملة ليست مفيده
    `.trim();

    let result = await luminsesi(query, username, syms);

    if (!result || result.trim().length === 0) {
        result = "لا يوجد تعريب له او حصل خطأ";
    }

    await m.reply(result);
};

handler.command = /^(تعريب|عرب)$/i;

export default handler;