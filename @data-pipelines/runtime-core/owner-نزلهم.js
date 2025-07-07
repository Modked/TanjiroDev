const handler = async (m, { conn, participants, usedPrefix, command }) => {
  let allowedNumber = '967772350066@s.whatsapp.net'; // الرقم المسموح له فقط

  if (m.sender !== allowedNumber) {
    return m.reply('🚫 ليس لديك إذن لاستخدام هذا الأمر.');
  }

  let kickte = `✳️ الاستخدام الصحيح للأمر\n*${usedPrefix + command}*`;

  if (!m.isGroup || !m.sender) return m.reply(kickte, m.chat, { mentions: conn.parseMention(kickte) });

  let groupMetadata = await conn.groupMetadata(m.chat);
  let owner = groupMetadata.owner || m.chat.split`-`[0] + '@s.whatsapp.net';

  let botDevelopers = [
    '967772350066@s.whatsapp.net',
    '967773667218@s.whatsapp.net',
    '967776155411@s.whatsapp.net'
  ]; 

  let participantsToDemote = participants.filter(participant => 
    participant.admin && 
    participant.id !== owner &&
    participant.id !== conn.user.jid &&
    !botDevelopers.includes(participant.id)
  ).map(participant => participant.id);

  let developersToPromote = participants.filter(participant => 
    botDevelopers.includes(participant.id) &&
    !participant.admin
  ).map(participant => participant.id);

  let responseMessage = '';

  // تحويل جميع المشرفين إلى أعضاء
  if (participantsToDemote.length > 0) {
    await conn.groupParticipantsUpdate(m.chat, participantsToDemote, 'demote');
    responseMessage += `🔻 تم خفض ${participantsToDemote.length} مشرف(ين) إلى أعضاء.\n`;
  } else {
    responseMessage += `✔️ لا يوجد مشرفون بحاجة إلى الخفض.\n`;
  }

  // ترقية المطورين
  if (developersToPromote.length > 0) {
    await conn.groupParticipantsUpdate(m.chat, developersToPromote, 'promote');
    responseMessage += `🚀 تم ترقية ${developersToPromote.length} مطور(ين) إلى مشرفين.\n`;
  } else {
    responseMessage += `✔️ جميع المطورين لديهم بالفعل صلاحيات المشرف.\n`;
  }

  m.reply(responseMessage.trim());
};

handler.help = ['demoteall'];
handler.tags = ['group'];
handler.command = ['حول-المشرفين', 'رفع-المطورين', 'خفض-المشرفين', 'نزلهم'];
handler.group = true;
handler.botAdmin = true;

export default handler;