import fs from 'fs';
import fetch from 'node-fetch';
import FormData from 'form-data';

let handler = async (message, { text, conn, usedPrefix, command }) => {
    if (!text && (!message.quoted || !message.quoted.text)) {
        throw "سلام";
    }

    try {
        const encodedText = encodeURIComponent(text);
        let imag = ''; 
        let targetMessage = message.quoted ? message.quoted : message;

        if ((targetMessage.msg || targetMessage).mimetype || targetMessage.mediaType || "") {
            let mimeType = (targetMessage.msg || targetMessage).mimetype || targetMessage.mediaType || "";
            if (mimeType.startsWith("video/")) {
                return message.reply("❌ يرجى الرد على صورة، لا فيديو!");
            }
            let q = message.quoted ? message.quoted : message;
            let mime = q.mediaType || '';
            if (/image|sticker|document/.test(mimeType)) {
                let media = await targetMessage.download(true);  
                let data = await uploadFile(media);
                imag = data.files[0].url || '';  
            }
        }

        const apiUrl = `https://zoro-api-zoro-bot-5b28aebf.koyeb.app/api/islam-ai?q=انت+مسلم+وجيب+معلومات+دينيه+موثوقه+من+ايات+وحديث+اسلامي+واجب+علا+الاسئله+دينية&userId=your-name?text=${encodedText}&img=${imag}`;
        
        conn.sendPresenceUpdate("composing", message.chat);
        const response = await fetch(apiUrl);
        const jsonResponse = await response.json();
        const result = jsonResponse.result;

        // تحويل النص إلى صوت
        const audioUrl = `https://ai.xterm.codes/api/text2speech/elevenlabs?text=${encodeURIComponent(result)}&key=Bell409&voice=prabowo`;

        // إرسال الرد الصوتي
        await conn.sendMessage(message.chat, {
            audio: { url: audioUrl },
            mimetype: "audio/mpeg",
            ptt: true
        }, { quoted: message });

    } catch (error) {
        console.error("Error:", error);
        throw "حدث عطل ما";
    }
};

handler.help = ["مسلم"];
handler.tags = ["AI"];
handler.command = ["شيخ"];

export default handler;

async function uploadFile(path) {
    let form = new FormData();
    form.append('files[]', fs.createReadStream(path));
    let res = await (await fetch('https://uguu.se/upload.php', {
        method: 'post',
        headers: {
            ...form.getHeaders()
        },
        body: form
    })).json();
    await fs.promises.unlink(path); 
    return res;
}