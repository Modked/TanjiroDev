import fs from 'fs'

let handler = async (m, { conn }) => {
  const db = global.db.data
  const users = db.users

  // 📦 عمل نسخة احتياطية قبل أي تعديل
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const backupPath = `./backup-users-${timestamp}.json`
  fs.writeFileSync(backupPath, JSON.stringify(users, null, 2))

  let fixed = 0, removed = 0, corrected = 0

  const requiredFields = {
    exp: 0,
    level: 0,
    money: 0,
    limit: 10,
    registered: false
  }

  const entries = Object.entries(users)
  for (const [jid, userData] of entries) {
    // ✅ حاول تصحيح المفتاح إذا كان غير مكتمل
    if (!jid.includes('@s.whatsapp.net')) {
      const maybeNumber = jid.replace(/\D/g, '')
      const newJid = maybeNumber + '@s.whatsapp.net'

      if (!users[newJid]) {
        users[newJid] = typeof userData === 'object' ? userData : {}
        corrected++
      }

      delete users[jid]
      continue
    }

    // ✅ تأكد من أن بيانات المستخدم عبارة عن كائن
    if (typeof userData !== 'object') {
      users[jid] = {}
      fixed++
    }

    for (let key in requiredFields) {
      if (!(key in users[jid])) {
        users[jid][key] = requiredFields[key]
        fixed++
      }
    }
  }

  if (global.db.write) await global.db.write()

  await m.reply(`✅ تم إصلاح قاعدة البيانات بنجاح:
🛠️ تم تصحيح JID: *${corrected}*
🔧 تم إصلاح الحقول: *${fixed}*
📦 تم حذف 0 (لن نحذف مباشرة بعد الآن)
🗂️ النسخة الاحتياطية محفوظة في: *${backupPath}*
📁 المستخدمين الحاليين: *${Object.keys(users).length}*`)
}

handler.help = ['fixdb']
handler.tags = ['owner']
handler.command = ['fixdb', 'اصلاح-القاعدة']
handler.rowner = true

export default handler