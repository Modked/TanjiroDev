const handler = async (m, { conn }) => {
  let txt = '';
  try {    
    const groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats);
    const totalGroups = groups.length;
    for (let i = 0; i < groups.length; i++) {
      const [jid, chat] = groups[i];
      const groupMetadata = ((conn.chats[jid] || {}).metadata || (await conn.groupMetadata(jid).catch((_) => null))) || {};
      const participants = groupMetadata.participants || [];
      const bot = participants.find((u) => conn.decodeJid(u.id) === conn.user.jid) || {};
      const isBotAdmin = bot?.admin || false;
      const isParticipant = participants.some((u) => conn.decodeJid(u.id) === conn.user.jid);
      const participantStatus = isParticipant ? '✅ *أنا هنا*' : '❌ *أنا مش هنا*';
      const totalParticipants = participants.length;
      txt += `> • ${i + 1} ${await conn.getName(jid)} | ${participantStatus}
        > *• ID:* ${jid}
        > *• أدمن:* ${isBotAdmin ? 'أيوة' : 'لأ'}
        > *• عدد الأعضاء:* ${totalParticipants}
        > *• رابط:* ${isBotAdmin ? `https://chat.whatsapp.com/${await conn.groupInviteCode(jid) || 'خطأ'}` : 'مش أدمن'}\n\n> ━━━━━━━━━━━━━━━━━━━\n\n`;
    }
    m.reply(`_*إنت في الجروبات دي:*_\n*• عدد الجروبات:* ${totalGroups}\n\n${txt}`.trim());
  } catch {
    const groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats);
    const totalGroups = groups.length;
    for (let i = 0; i < groups.length; i++) {
      const [jid, chat] = groups[i];
      const groupMetadata = ((conn.chats[jid] || {}).metadata || (await conn.groupMetadata(jid).catch((_) => null))) || {};
      const participants = groupMetadata.participants || [];
      const bot = participants.find((u) => conn.decodeJid(u.id) === conn.user.jid) || {};
      const isBotAdmin = bot?.admin || false;
      const isParticipant = participants.some((u) => conn.decodeJid(u.id) === conn.user.jid);
      const participantStatus = isParticipant ? '✅ *أنا هنا*' : '❌ *أنا مش هنا*';
      const totalParticipants = participants.length;    
      txt += `> ${i + 1} ${await conn.getName(jid)} | ${participantStatus}
        > *• ID:* ${jid}
        > *• أدمن:* ${isBotAdmin ? 'أيوة' : 'لأ'}
        > *• عدد الأعضاء:* ${totalParticipants}
        > *• رابط:* ${isBotAdmin ? 'خطأ' : 'مش أدمن'}\n\n> ━━━━━━━━━━━━━━━━━━━\n\n`;
    }
    m.reply(`${wm} _*إنت في الجروبات دي:*_\n*• عدد الجروبات:* ${totalGroups}\n\n${txt}`.trim());
  }    
};
handler.help = ['groups', 'grouplist']
handler.tags = ['main']
handler.command = /^(groups|grouplist|listadegrupo|gruposlista|listagrupos|listadegrupos|grupolista|listagrupo)$/i
handler.register = true
export default handler;