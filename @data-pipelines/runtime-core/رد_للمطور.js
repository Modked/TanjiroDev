import axios from 'axios';
import { prepareWAMessageMedia } from '@whiskeysockets/Baileys';

let handler = async (m, { conn }) => {
    const developerNumber = '994403585483@s.whatsapp.net'; // رقم المطور

    // قائمة بروابط الاستيكرات (9 استيكرات)
    const stickerUrls = [
        'https://files.catbox.moe/r3b3v7.webp',
        'https://files.catbox.moe/x1e4be.webp',
        'https://files.catbox.moe/ha5qnp.webp',
        'https://files.catbox.moe/cshcv6.webp',
        'https://files.catbox.moe/ej0a11.webp',
        'https://files.catbox.moe/f8a26a.webp',
        'https://files.catbox.moe/mh934n.webp',
        'https://files.catbox.moe/7l1dl1.webp',
        'https://files.catbox.moe/uexo7d.webp',
        'https://telegra.ph/file/847382490d2cf20863eec.jpg',
        'https://telegra.ph/file/847382490d2cf20863eec.jpg',
        'https://telegra.ph/file/847382490d2cf20863eec.jpg',
        'https://telegra.ph/file/847382490d2cf20863eec.jpg',
        'https://telegra.ph/file/847382490d2cf20863eec.jpg',
        'https://telegra.ph/file/847382490d2cf20863eec.jpg',
        'https://telegra.ph/file/847382490d2cf20863eec.jpg'
    ];

    // استخراج JID الخاص بالبوت
    const botNumber = conn.user?.id.split(':')[0] + '@s.whatsapp.net';

    // التحقق من الشروط:
    // - تجاهل إذا المرسل هو المطور
    // - تجاهل إذا المرسل هو البوت نفسه
    // - تجاهل إذا لم يكن هناك منشن أو رد على المطور
    if (
        m.sender === developerNumber || // المرسل هو المطور
        m.sender === botNumber ||       // المرسل هو البوت
        (!m.mentionedJid.includes(developerNumber) && (!m.quoted || m.quoted.sender !== developerNumber)) // لا منشن ولا رد على المطور
    ) {
        return; // لا تفعل شيء
    }

    try {
        // اختيار استيكر عشوائي
        const randomSticker = stickerUrls[Math.floor(Math.random() * stickerUrls.length)];

        // تجهيز الاستيكر عبر Baileys
        const stickerMedia = await prepareWAMessageMedia(
            { sticker: { url: randomSticker } },
            { upload: conn.waUploadToServer }
        );

        // إرسال الاستيكر
        await conn.relayMessage(
            m.chat,
            { stickerMessage: stickerMedia.stickerMessage },
            { quoted: m }
        );

    } catch (error) {
        console.error('❌ خطأ في تحميل أو إرسال الاستيكر:', error);
    }
};

// تشغيل هذا الكود قبل الأوامر الأخرى بدون تعطيلها
handler.before = async (m) => {
    await handler(m, { conn: global.conn });
};

export default handler;