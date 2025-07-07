let handler = async (m, { conn, args, groupMetadata }) => {
    let who;
    if (m.isGroup) 
        who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
    else 
        who = m.chat;

    if (!who) 
        throw '> *\`『 منشن ع الي عايز تشيلو انذار 』\`*';
    
    if (!(who in global.db.data.users)) 
        throw '> *\`『 مش موجود في قاعدة البيانات 』\`*';
    
    let warn = global.db.data.users[who].warn || 0;
    
    if (warn > 0) {
        global.db.data.users[who].warn -= 1;
        m.reply(`> *\`『 تم تخفيض انذار 』\`*
         
*\`『 الانذارات 』\`* -1
*\`『 الاجمالي 』\`* ${warn - 1}`);
    } else if (warn == 0) {
        m.reply('> *\`『 المستخدم معندهوش انذارات 』\`*');
    }
};

handler.help = ['delwarn *@user*'];
handler.tags = ['group'];
handler.command = ['الغاء_انذار', 'الغاء_تحذير', 'الغاء-تحذير', 'الغاء-انذار'];
handler.group = true;
handler.admin = true;

export default handler;