import { googleImage } from '@bochilteam/scraper';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `*اكتب اسم الصوره الي بدور عليها🧚🏼‍♂️*\n• مثال\n*${usedPrefix + command} خلفيه*`, m, {
      contextInfo: {
        externalAdReply: {
          mediaUrl: null,
          mediaType: 1,
          description: null,
          title: 'بحث صور', // تم تعيين عنوان افتراضي
          body: '> © ʙy ᴛᴀɴᴊɪʀᴏ-ᴀɪ',
          previewType: 0,
          thumbnail: null, // يمكنك تعيين صورة افتراضية هنا
          sourceUrl: null // يمكنك تعيين رابط افتراضي هنا
        }
      }
    });
  }

  const blockedWords = ['gore', 'cp', 'porno', 'rule34', 'xxx', 'سكس', 'نودز', 'شرموطه', 'كس', 'نيك', 'سكسي', 'عهيرات', 'شراميط', 'لبوه', 'اكساس', 'xnxx'];
  if (blockedWords.some(word => m.text.toLowerCase().includes(word))) {
    throw 'طلبك مرفوض ،روح استغفر أحسن🙄';
  }

  const res = await googleImage(text);
  const image = await res.getRandom();
  const link = image;

  conn.sendBtImg(m.chat, image, '*\`『 تم يحب 💗 』\`*', '> © ʙy ᴛᴀɴᴊɪʀᴏ-ᴀɪ', [['🧚🏼‍♂️ صوره تاني ', `/${command} ${text}`]], m);
};

handler.help = ['صوره'];
handler.tags = ['buscadores'];
handler.command = /^(gimage|صوره|صورة|imagen|صور)$/i;
handler.limit = 1;

export default handler;