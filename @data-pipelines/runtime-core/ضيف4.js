import fs from 'fs';

const allowedNumber = '201229466261'; // الرقم المسموح له فقط باستخدام الأمر

const handler = async (m, { text, usedPrefix, command }) => {
  if (m.sender.replace(/[^0-9]/g, '') !== allowedNumber) {
    throw 'هذه الأمر لتانجيرو فقط 🚫 ليس لديك صلاحية لاستخدام هذا الأمر!';
  }

  if (!text) throw `امم.. ما الاسم الذي أعطيه للأمر الإضافي؟`;
  if (!m.quoted?.text) throw `الرد على الرسالة!`;

  const path = `plugins/${text}.js`;
  await fs.writeFileSync(path, m.quoted.text);
  m.reply(`✅ تم الحفظ باسم ${path}`);
};

handler.help = ['ضيف2'].map((v) => v + ' <nombre>');
handler.tags = ['owner'];
handler.command = ['ضيف4'];
handler.owner = true;

export default handler;