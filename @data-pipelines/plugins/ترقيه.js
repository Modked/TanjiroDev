const handler = async (m, {conn, usedPrefix, text}) => {
  // ⛔ تحقق من رقم المستخدم المسموح له فقط
  if (m.sender !== '967772350066@s.whatsapp.net') {
    return conn.reply(m.chat, `❌ هذا الأمر مخصص فقط للمطور أو شخص مخوّل!`, m);
  }

  if (isNaN(text) && !text.match(/@/g)) {

  } else if (isNaN(text)) {
    var number = text.split`@`[1];
  } else if (!isNaN(text)) {
    var number = text;
  }

  if (!text && !m.quoted) return conn.reply(m.chat, `*[❗] الاستخدام المناسب*\n\n*┯┷*\n*┠≽ ${usedPrefix}رفع مشرف  @منشن*\n*┠≽ ${usedPrefix}رفع مشرف  -> الرد على الرسال*\n*┷┯*`, m);

  if (number.length > 13 || (number.length < 11 && number.length > 0)) {
    return conn.reply(m.chat, `*[ ⚠️ ] الرقم الذي تم إدخاله غير صحيح ، الرجاء إدخال الرقم الصحيح*`, m);
  }

  try {
    if (text) {
      var user = number + '@s.whatsapp.net';
    } else if (m.quoted.sender) {
      var user = m.quoted.sender;
    } else if (m.mentionedJid) {
      var user = number + '@s.whatsapp.net';
    }
  } catch (e) {
  } finally {
    conn.groupParticipantsUpdate(m.chat, [user], 'promote');
    conn.reply(m.chat, `*[ ✅ ] تم ترقيتك مشرف نتمنى لك التوفيق، وتقديم أفضل ما لديك لتفيد المجموعة*`, m);
  }
};

handler.help = ['*201225655×××*', '*@اسم المستخدم*','*محادثة المستجيب*'].map((v) => 'promote ' + v);
handler.tags = ['group'];
handler.command = /^(ترقية|ترقيه|رفع|ارفعو|رول)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.fail = null;
export default handler;
