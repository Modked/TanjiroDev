let handler = async (m, { conn, isOwner, isAdmin }) => {
    // السماح فقط للرقم 967772350066 باستخدام هذا الأمر
    if (m.sender !== '967772350066@s.whatsapp.net') return m.reply('⚠️ ليس لديك الإذن لاستخدام هذا الأمر!');

    if (!(isAdmin || isOwner)) return m.reply('⚠️ هذا الأمر مخصص للمشرفين فقط!');

    global.db.data.chats[m.chat].isBanned = true;
    m.reply('*✅ تـــم اطـفـاء الـبـوت فــي هـذه الـدردشـة*');
}

handler.help = ['banchat'];
handler.tags = ['owner'];
handler.command = ['ايقاف', 'chatoff', 'بانشات', 'بان-شات', 'بان_شات'];
handler.owner = true;

export default handler;