let handler = async (m, { conn, text, command }) => {
    const allowedNumber = '967772350066'; // الرقم المسموح له فقط
    
    if (m.sender.replace(/[^0-9]/g, '') !== allowedNumber) {
        return await conn.reply(m.chat, '❌ ليس لديك الإذن لاستخدام هذا الأمر.');
    }
    
    let id = text ? text : m.chat;  
    await conn.reply(id, '*لقد قضيت معكم وقتاً رائعاً الى اللقاء ⁦^⁠_⁠^⁩*'); 
    await conn.groupLeave(id);
};

handler.command = /^(اخرج|اطلع|غادر|خروج)$/i;
handler.group = true;
handler.rowner = true;

export default handler;