import fs from 'fs';

let handler = async (m, { args, conn }) => {
  const dbPath = './database.json';

  if (!args[0]) return m.reply('❗ أرسل JID الجروب اللي تبي تحذف بياناته.');

  const jid = args[0].trim();
  m.reply('📥 تم استلام JID: ' + jid);

  if (!jid.endsWith('@g.us')) return m.reply('❌ هذا ليس JID صحيح لجروب.');

  if (!fs.existsSync(dbPath)) return m.reply('🚫 ملف قاعدة البيانات غير موجود.');

  let db;
  try {
    db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  } catch (e) {
    return m.reply('⚠️ حصل خطأ في قراءة قاعدة البيانات:\n' + e.message);
  }

  let found = false;
  let deletedFrom = [];

  for (const key in db) {
    if (typeof db[key] === 'object' && db[key] !== null && db[key][jid]) {
      delete db[key][jid];
      found = true;
      deletedFrom.push(key);
    }
  }

  try {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    
    await conn.sendMessage(jid, {
      text: found 
        ? '🧹 تم حذف جميع بيانات هذا الجروب من قاعدة بيانات البوت.\n🔁 سيتم التعامل مع الجروب كأنه جديد تمامًا.'
        : '🧽 لم يتم العثور على بيانات محفوظة، لكن تم تنظيف الجروب على أي حال!'
    });

    return m.reply(
      found
        ? `✅ تم حذف البيانات من الأقسام التالية:\n${deletedFrom.join(', ')}\n\n🧼 الجروب أصبح كأنه جديد.`
        : `ℹ️ لم يتم العثور على بيانات محفوظة للجروب (${jid})، لكن تم إرسال رسالة تنظيف له.`
    );
  } catch (e) {
    return m.reply('❌ فشل حفظ التغييرات:\n' + e.message);
  }
};

handler.command = ['حذف_بياناته'];
handler.owner = true;

export default handler;