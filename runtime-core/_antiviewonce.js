import { downloadContentFromMessage } from '@whiskeysockets/Baileys';

export async function before(m, { conn }) {
    // تحقق من وجود الدردشة وتفعيل خاصية منع العرض مرة واحدة
    const chat = global.db.data.chats[m.chat];
    if (!chat || !chat.antiviewonce) return;

    // التأكد أن الرسالة هي من نوع عرض مرة واحدة
    const isViewOnce = m.mtype === 'viewOnceMessageV2' || m.mtype === 'viewOnceMessageV2Extension';
    if (!isViewOnce) return;

    // تحديد المصدر الداخلي للرسالة
    let messageContent;
    if (m.message.viewOnceMessageV2) {
        messageContent = m.message.viewOnceMessageV2.message;
    } else if (m.message.viewOnceMessageV2Extension) {
        messageContent = m.message.viewOnceMessageV2Extension.message;
    } else {
        return;
    }

    // استخراج نوع الرسالة الداخلية (imageMessage, videoMessage, audioMessage)
    const type = Object.keys(messageContent)[0];
    const mediaMessage = messageContent[type];

    // التأكد أن النوع مدعوم (صورة، فيديو، صوت فقط)
    if (!['imageMessage', 'videoMessage', 'audioMessage'].includes(type)) return;

    // تحديد نوع التحميل
    const streamType = type === 'imageMessage' ? 'image'
                      : type === 'videoMessage' ? 'video'
                      : 'audio';

    // تحميل الوسائط
    const stream = await downloadContentFromMessage(mediaMessage, streamType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
    }

    // صياغة الرسالة التوضيحية
    const warnText = `[⚠️ تم كشف رسالة عرض مرة واحدة]\n${mediaMessage.caption || ''}`;

    // إرسال الملف المناسب
    await conn.sendFile(m.chat, buffer, '', warnText, m);
}