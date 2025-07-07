import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync } from 'fs';
import path from 'path';

var handler = async (m, { conn, usedPrefix }) => {
  // تحقق من أن الرقم هو الرقم المحدد فقط
  if (m.sender !== '967772350066@s.whatsapp.net') {
    return conn.reply(m.chat, '🚩 *هذا الأمر مخصص فقط للرقم 967772350066*', m);
  }

  await conn.reply(m.chat, '🚯 *بدء عملية حذف جميع ملفات الجلسة باستثناء ملف creds.json...*', m);
  m.react('🔄');

  let sessionPath = './BotSession/';

  try {
    if (!existsSync(sessionPath)) {
      return await conn.reply(m.chat, '🚩 *المجلد غير موجود*', m);
    }

    let files = await fs.readdir(sessionPath);
    let filesDeleted = 0;

    for (const file of files) {
      if (file !== 'creds.json') {
        await fs.unlink(path.join(sessionPath, file));
        filesDeleted++;
      }
    }

    if (filesDeleted === 0) {
      await conn.reply(m.chat, '🚩 *لا توجد ملفات للحذف باستثناء ملف creds.json*', m);
    } else {
      m.react('✅');
      await conn.reply(m.chat, `🎌 *تم الحذف بنجاح ${filesDeleted} ملفاً باستثناء ملف creds.json*`, m);
    }
  } catch (err) {
    console.error('حدث خطأ أثناء قراءة المجلد أو الملفات:', err);
    await conn.reply(m.chat, '🚩 *حدث فشل في العملية*', m);
  }
};

handler.help = ['dsowner'];
handler.tags = ['owner'];
handler.command = /^(del_reg_in_session_owner|تنظيف|clearallsession)$/i;

handler.rowner = true;

export default handler;