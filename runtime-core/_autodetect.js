let WAMessageStubType = (await import('@whiskeysockets/Baileys')).default

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return

  // تعريف جهة اتصال وهمية للردود
  const fkontak = {
    "key": {
      "participants":"0@s.whatsapp.net",
      "remoteJid": "status@broadcast",
      "fromMe": false,
      "id": "Halo"
    },
    "message": {
      "contactMessage": {
        "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    },
    "participant": "0@s.whatsapp.net"
  }  

  let chat = global.db.data.chats[m.chat]
  let usuario = `@${m.sender.split`@`[0]}`
  let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || 'https://qu.ax/QGAVS.jpg'

  // رسائل مختلفة حسب نوع التغيير في القروب
  let nombre, foto, edit, newlink, status, admingp, noadmingp

  nombre = `*${usuario}*\n💥 غيّر اسم القروب.\n\n👁️‍🗨️ الاسم الجديد:\n*${m.messageStubParameters[0]}*`
  foto = `*${usuario}*\n🩸 غيّر صورة القروب:\n*${groupMetadata.subject}*`
  edit = `*${usuario}*\n⚙️ عطى صلاحية تعديل الإعدادات لـ: ${m.messageStubParameters[0] == 'on' ? 'الادمنز فقط' : 'الكل'}`
  newlink = `🕸️ رابط القروب *${groupMetadata.subject}* تم إعادة تعيينه بواسطة:\n*${usuario}*`
  status = `*${groupMetadata.subject}* صار ${m.messageStubParameters[0] == 'on' ? '*مقفول 🔒*' : '*مفتوح 🔓*'} بواسطة *${usuario}*\n\n💬 الحين ${m.messageStubParameters[0] == 'on' ? '*بس الادمنز*' : '*الكل*'} يقدر يرسل رسائل`
  admingp = `*@${m.messageStubParameters[0].split`@`[0]}* صار ادمن 🧠\n\n⚡ العملية تمت بواسطة:\n*${usuario}*`
  noadmingp =  `*@${m.messageStubParameters[0].split`@`[0]}* تم سحب الادمن منه 🕯️\n\n⚡ العملية تمت بواسطة:\n*${usuario}*`

  // تحقق من نوع التغيير وارسال الرسالة المناسبة
  if (chat.detect && m.messageStubType == 21) {
    await conn.sendMessage(m.chat, { text: nombre, mentions: [m.sender] }, { quoted: fkontak })   

  } else if (chat.detect && m.messageStubType == 22) {
    await conn.sendMessage(m.chat, { image: { url: pp }, caption: foto, mentions: [m.sender] }, { quoted: fkontak })

  } else if (chat.detect && m.messageStubType == 23) {
    await conn.sendMessage(m.chat, { text: newlink, mentions: [m.sender] }, { quoted: fkontak })    

  } else if (chat.detect && m.messageStubType == 25) {
    await conn.sendMessage(m.chat, { text: edit, mentions: [m.sender] }, { quoted: fkontak })  

  } else if (chat.detect && m.messageStubType == 26) {
    await conn.sendMessage(m.chat, { text: status, mentions: [m.sender] }, { quoted: fkontak })  

  } else if (chat.detect && m.messageStubType == 29) {
    await conn.sendMessage(m.chat, { text: admingp, mentions: [`${m.sender}`,`${m.messageStubParameters[0]}`] }, { quoted: fkontak })  
    return;

  } if (chat.detect && m.messageStubType == 30) {
    await conn.sendMessage(m.chat, { text: noadmingp, mentions: [`${m.sender}`,`${m.messageStubParameters[0]}`] }, { quoted: fkontak })  

  } else {
    // console.log({ messageStubType: m.messageStubType, messageStubParameters: m.messageStubParameters, type: WAMessageStubType[m.messageStubType] })
  }
}