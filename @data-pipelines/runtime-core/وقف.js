let allowedNumber = '967772350066@s.whatsapp.net'; // الرقم المسموح له فقط بإيقاف البوت

let handler = async (m, { conn }) => {
  try {
    if (m.sender !== allowedNumber) {
      return await conn.reply(m.chat, `🚫 *هذا الأمر مخصص فقط للرقم المصرح به.*`, m);
    }

    if (global.conn.user.jid === conn.user.jid) {
      return await conn.reply(m.chat, `⚠️ *البوت الرئيسي لا يمكن إيقافه بهذا الأمر.*`, m);
    }

    await conn.reply(m.chat, `🛑 *جارٍ إيقاف البوت الفرعي...*`, m);

    // إرسال إشعار للإدارة قبل الإغلاق
    let ownerJid = '967772350066@s.whatsapp.net'; // رقم الإدارة
    await conn.sendMessage(ownerJid, { text: `🚨 *تم إيقاف البوت الفرعي بواسطة* @${m.sender.split('@')[0]}` }, { mentions: [m.sender] });

    console.log(`🛑 البوت الفرعي تم إيقافه بواسطة ${m.sender}`);
    
    // إغلاق الاتصال بأمان
    setTimeout(() => {
      conn.ws.close();
    }, 3000); // تأخير 3 ثوانٍ قبل الإيقاف لإرسال الإشعارات

  } catch (error) {
    console.error(`❌ خطأ أثناء إيقاف البوت: ${error}`);
    await conn.reply(m.chat, `⚠️ *حدث خطأ أثناء محاولة إيقاف البوت.*`, m);
  }
};

handler.help = ['إيقاف'];
handler.tags = ['بوت'];
handler.command = ['توقف', 'اطفاء', 'وقف'];
handler.owner = true;

export default handler;