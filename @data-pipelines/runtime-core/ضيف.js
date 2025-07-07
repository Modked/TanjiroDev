import fs from 'fs';

const allowedNumber = '967772350066'; // الرقم المسموح له فقط باستخدام الأمر

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

handler.help = ['saveplugin'].map((v) => v + ' <nombre>');
handler.tags = ['owner'];
handler.command = ['ضيف', 'addp', 'addplugin'];
handler.owner = true;

export default handler;