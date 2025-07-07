import gtts from 'node-gtts';
import ffmpeg from 'fluent-ffmpeg';
import { writeFileSync, readFileSync, unlinkSync } from 'fs';
import { join } from 'path';

const defaultLang = 'ar'; // اللغة الافتراضية العربية

const handler = async (m, { conn, args }) => {
  let lang = args[0];
  let text = args.slice(1).join(' ');

  if ((args[0] || '').length !== 2) {
    lang = defaultLang;
    text = args.join(' ');
  }

  if (!text && m.quoted?.text) text = m.quoted.text;

  let res;
  try {
    res = await tts(text, lang);
  } catch (e) {
    m.reply(e + '');
    text = args.join(' ');
    if (!text) throw `*🗣️ يرجى إدخال نص للتحويل إلى صوت*\n\nمثال:\n- .انطق مرحبًا كيف حالك؟`;
    res = await tts(text, defaultLang);
  } finally {
    if (res) conn.sendFile(m.chat, res, 'tts.opus', null, m, true);
  }
};

handler.help = ['tts <lang> <text>'];
handler.tags = ['tools'];
handler.group = true;
handler.register = true;
handler.command = ['tts', 'انطق', 'تحدث', 'تكلم'];

export default handler;

async function tts(text, lang = 'ar') {
  return new Promise((resolve, reject) => {
    try {
      const mp3Path = join('/tmp', `${Date.now()}.mp3`);
      const opusPath = join('/tmp', `${Date.now()}.opus`);

      const tts = gtts(lang);
      tts.save(mp3Path, text, () => {
        // تحسين جودة الصوت
        ffmpeg(mp3Path)
          .audioBitrate(192) // رفع جودة الصوت
          .audioFrequency(48000) // تحسين نقاء الصوت
          .audioFilters([
            'volume=2', // رفع مستوى الصوت
            'equalizer=f=1000:width_type=h:width=200:g=5', // تحسين الصوت
            'dynaudnorm' // تطبيع الصوت تلقائيًا
          ])
          .audioCodec('libopus')
          .toFormat('opus')
          .on('end', () => {
            resolve(readFileSync(opusPath));
            unlinkSync(mp3Path);
            unlinkSync(opusPath);
          })
          .on('error', (err) => reject(err))
          .save(opusPath);
      });
    } catch (e) {
      reject(e);
    }
  });
}