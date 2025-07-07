import { spawn } from 'child_process';

const allowedNumber = '967772350066'; // الرقم المسموح له فقط باستخدام الأمر

let handler = async (m, { conn, text }) => {
  if (m.sender.replace(/[^0-9]/g, '') !== allowedNumber) {
    throw '🚫 ليس لديك صلاحية لاستخدام هذا الأمر!';
  }

  if (!process.send) throw 'الرجاء تشغيل البرنامج بواسطة الأمر "node index.js" بدلاً من "node main.js"';

  await m.reply('🔄 جاري إعادة تشغيل البوت...\nالرجاء الانتظار لحظة');
  process.send('reset');
};

handler.help = ['restart'];
handler.tags = ['owner'];
handler.command = ['restart', 'ريستارت'];
handler.rowner = true;

export default handler;