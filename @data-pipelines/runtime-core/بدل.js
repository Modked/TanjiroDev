import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// عشان نحصل __dirname بنمط ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('✅ بلوجين .بدل (ESM) تم تحميله');

const handler = async (m, { text, command }) => {
    console.log(`📌 تم استقبال الأمر: ${command} | نص: ${text}`);

    if (!text.includes('|')) {
        await m.reply('❌ الصيغة خطأ. استعمل: .بدل الكلمة القديمة|الكلمة الجديدة');
        return;
    }

    const [oldText, newText] = text.split('|').map(s => s.trim());

    if (!oldText || !newText) {
        await m.reply('❌ تأكد أنك كتبت الكلمتين بشكل صحيح مفصولتين بـ |');
        return;
    }

    const pluginsDir = path.join(__dirname, '../plugins');
    let changedFiles = [];

    try {
        const files = fs.readdirSync(pluginsDir).filter(f => f.endsWith('.js'));

        for (let file of files) {
            const filePath = path.join(pluginsDir, file);
            let content = fs.readFileSync(filePath, 'utf8');

            if (content.includes(oldText)) {
                let updatedContent = content.split(oldText).join(newText);
                fs.writeFileSync(filePath, updatedContent, 'utf8');
                changedFiles.push(file);
                console.log(`✅ تم التبديل في: ${file}`);
            }
        }

        if (changedFiles.length === 0) {
            await m.reply(`ℹ️ لم يتم العثور على "${oldText}" في أي ملف.`);
        } else {
            await m.reply(`✅ تم التبديل في الملفات:\n${changedFiles.join('\n')}`);
        }

    } catch (err) {
        console.error('❌ خطأ أثناء التبديل:', err);
        await m.reply('❌ حدث خطأ أثناء التبديل.');
    }
};

handler.command = /^بدل$/i;
handler.owner = true; // خليها true للأمان
handler.desc = 'يبدل نص معين في جميع كودات البلوجين';

export default handler;