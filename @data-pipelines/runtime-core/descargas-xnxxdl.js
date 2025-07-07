import fetch from 'node-fetch';
import cheerio from 'cheerio';

const handler = async (m, { conn, args, command, usedPrefix }) => {
  if (!args[0]) throw `*[❗𝐈𝐍𝐅𝐎❗] يرجى إدخال رابط صحيح من xnxx.*`;

  try {
    await conn.reply(m.chat, '[❗] يتم الآن معالجة الفيديو، الرجاء الانتظار...', m);

    let xnxxLink = '';
    let quality = 'high'; // الجودة الافتراضية

    // التحقق من الرابط والجودة
    if (args[0].includes('xnxx')) {
      xnxxLink = args[0];
      if (args[1] && ['low', 'high', 'HLS'].includes(args[1].toLowerCase())) {
        quality = args[1].toLowerCase();
      }
    } else {
      throw '[❗] الرابط غير صحيح أو غير مدعوم.';
    }

    const res = await xnxxdl(xnxxLink);
    const { files, title, image, duration, videoWidth, videoHeight } = res.result;

    if (Object.keys(files).length === 0) {
      throw '[❗] فشل استخراج الفيديو بأي جودة. تأكد من الرابط.';
    }

    // حساب الحجم بالـ MB
    const fileUrl = files[quality] || files.high; // استخدام الجودة الافتراضية إذا لم يتم تحديدها
    const fileResponse = await fetch(fileUrl, { method: 'HEAD' });
    const fileSize = fileResponse.headers.get('content-length');
    const fileSizeMB = (parseInt(fileSize) / (1024 * 1024)).toFixed(2); // تحويل الحجم إلى ميغابايت

    // إرسال الصورة المصغرة مع معلومات الفيديو
    const availableQualities = [];
    if (files.high) availableQualities.push('1080p');
    if (files.low) availableQualities.push('360p');
    if (files.HLS) availableQualities.push('HLS');

    await conn.sendMessage(m.chat, {
      image: { url: image },
      caption: `*🎥 العنوان:* ${title}\n*⏳ المدة:* ${duration}\n*📏 الأبعاد:* ${videoWidth}x${videoHeight}\n*🔗 الجودات المتاحة:* ${availableQualities.join(', ')}\n*💾 الحجم:* ${fileSizeMB} MB`
    }, { quoted: m });

    // إرسال الفيديو بالجودة المحددة
    await conn.sendMessage(m.chat, {
      document: { url: fileUrl },
      mimetype: 'video/mp4',
      fileName: `${title || 'video'}.mp4`
    }, { quoted: m });

  } catch (err) {
    console.error('خطأ:', err);
    throw '[❗] حدث خطأ أثناء معالجة الطلب. تأكد من الرابط وأعد المحاولة.';
  }
};

handler.command = ['xnxxdl'];
handler.register = true;
export default handler;

async function xnxxdl(URL) {
  try {
    const response = await fetch(URL);
    const res = await response.text();

    const $ = cheerio.load(res);
    const title = $('meta[property="og:title"]').attr('content') || 'No title';
    const image = $('meta[property="og:image"]').attr('content') || '';
    const duration = $('meta[property="og:duration"]').attr('content') || 'غير متوفر';
    const videoWidth = $('meta[property="og:video:width"]').attr('content') || 'غير معروف';
    const videoHeight = $('meta[property="og:video:height"]').attr('content') || 'غير معروف';

    const videoScript = $('#video-player-bg > script:nth-child(6)').html() || '';

    const extractMatch = (pattern) => (videoScript.match(pattern) || [])[1] || '';

    const files = {
      low: extractMatch(/html5player\.setVideoUrlLow\('(.*?)'\);/),
      high: extractMatch(/html5player\.setVideoUrlHigh\('(.*?)'\);/),
      HLS: extractMatch(/html5player\.setVideoHLS\('(.*?)'\);/),
      thumb: extractMatch(/html5player\.setThumbUrl\('(.*?)'\);/),
    };

    if (!files.high && !files.low && !files.HLS) {
      throw new Error('لم يتم العثور على روابط فيديو بأي جودة.');
    }

    return {
      status: 200,
      result: {
        title,
        URL,
        image,
        duration,
        videoWidth,
        videoHeight,
        files
      }
    };

  } catch (error) {
    console.error('خطأ أثناء جلب الصفحة:', error);
    throw new Error('خطأ أثناء جلب الصفحة: ' + error.message);
  }
}