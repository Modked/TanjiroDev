let usedCounts = {};

let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
    const user = m.sender; // رقم المستخدم
    const today = new Date().toLocaleDateString(); // تاريخ اليوم

    // تهيئة بيانات المستخدم لو مش موجود
    if (!usedCounts[user]) usedCounts[user] = {};
    if (usedCounts[user].date !== today) {
        usedCounts[user].count = 0;
        usedCounts[user].date = today;
    }

    // تحديد الحد الأقصى (غير الرقم لو حاب)
    const limit = 5;

    if (usedCounts[user].count >= limit) {
        return conn.reply(m.chat, `📛 لقد وصلت للحد اليومي (${limit}) لاستخدام هذا الأمر.\n🕒 حاول مرة أخرى غدًا.`, m);
    }

    if (!args[0]) {
        return conn.reply(m.chat, '*\`『 اكتب اسم التطبيق الي انت عيزو🧚🏻‍♂️ 』\`*:\n```................```\n.تطبيق القران\n.تطبيق كيبورد', m);
    }

    try {
        let res = await fetch(`https://api-streamline.vercel.app/dlapk?search=${args[0]}`);
        let result = await res.json();

        if (!result.file || !result.file.path) {
            return conn.reply(m.chat, '[ ⚠️ ] لم أستطع العثور على رابط تحميل التطبيق، حاول اسم آخر.', m);
        }

        let { name, size, package: packe, icon, updated } = result;
        let URL = result.file.path;
        let sizeInMB = (parseInt(size) / (1024 * 1024)).toFixed(2) + ' MB';

        let remaining = limit - usedCounts[user].count;

        let texto = `❯───「 𝗔𝗣𝗞 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗 」───❮
✦ الاسم : ⇢ ${name}
✦ الحجم : ⇢ ${sizeInMB}
✦ الباكدج : ⇢ ${packe}
✦ التحديث : ⇢ ${updated}

📊 عدد محاولاتك المتبقية اليوم: ${remaining} من أصل ${limit}
📥 جاري إرسال التطبيق، من فضلك انتظر...`;

        await conn.sendFile(m.chat, icon, name + '.jpg', texto, m);

        await conn.sendMessage(m.chat, {
            document: { url: URL },
            mimetype: 'application/vnd.android.package-archive',
            fileName: name + '.apk',
            caption: ''
        }, { quoted: m });

        usedCounts[user].count++; // زيادة العداد بعد التنفيذ

    } catch (error) {
        console.error(error);
        return conn.reply(m.chat, '[ ⚠️ ] حدث خطأ أثناء محاولة تحميل التطبيق، حاول مرة أخرى لاحقًا.', m);
    }
}

handler.command = ['apk', 'بلاي', 'تطبيق', 'متجر'];
handler.help = ['apkdl'];
handler.tags = ['descargas'];
handler.register = true
export default handler;