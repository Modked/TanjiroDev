import fetch from 'node-fetch';
import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/Baileys';
import cheerio from 'cheerio';

const handler = async (m, { text, conn, isOwner, args, command, usedPrefix }) => {

  let fakecontact = {
    'key': { 'participants': '0@s.whatsapp.net', 'remoteJid': 'status@broadcast', 'fromMe': false, 'id': '𝐒𝐀𝐅𝐑𝐎𝐓-𝐁𝐎𝐓' },
    'message': {
      'contactMessage': {
        'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    },
    'participant': '0@s.whatsapp.net'
  };

  if (!db.data.chats[m.chat].modohorny && m.isGroup) {
    return conn.sendMessage(m.chat, { text: '*وضع التقييد شغال ي حوب 🧚🏼‍♂️*' }, { quoted: fakecontact });
  }

  if (command === 'xn') {
    if (!text) {
      return conn.sendMessage(m.chat, { text: `*فين النص اللي هتبحث عنو ي حوب 🧚🏼‍♂️*` }, { quoted: fakecontact });
    }

    try {
      const vids_ = {
        from: m.sender,
        urls: [],
      };

      if (!global.videoListXXX) {
        global.videoListXXX = [];
      }

      if (global.videoListXXX[0]?.from === m.sender) {
        global.videoListXXX.splice(0, global.videoListXXX.length);
      }

      const res = await xnxxsearch(text);
      const json = res.result;

      let count = 1;
      let heager = [];
      for (const v of json) {
        const linkXXX = v.link;
        vids_.urls.push(linkXXX);

        heager.push({
          header: '',
          title: v.title,
          id: `.xn.1 ${v.link}`,
          description: `📽️ Download MP4`
        });
        count++;
      }

      const ppurl = `https://www.xnxx.com/search/${text}`;
      const screenshotUrl = `https://image.thum.io/get/fullpage/${ppurl}`;

      const imageUrl = screenshotUrl || 'https://j4y2n2s2.rocketcdn.me/wp-content/uploads/2016/05/XNXX.jpg';
      let messa = await prepareWAMessageMedia({ image: { url: imageUrl } }, { upload: conn.waUploadToServer });

      let cap = `${text.toUpperCase()}`;
      let menu = `Search results for : ${cap}`;
      let menu2 = `Search results for :`;
      let tit = `Title : ${cap}`;
      let nin = `Number : ${count}`;
      let saludos = `~Hi : @${m.sender.split("@")[0]}~`;

      let caption = `╮───────────────────────╭ـ\n│✑ ↝ ${saludos} ↜🧞.\n│✑ ${menu2}\n│✑ ${tit}\n│✑ ${nin}\n╯───────────────────────╰ـ`;

      let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
          message: {
            interactiveMessage: {
              body: { text: caption },
              footer: { text: 'ₛₐfᵣₒₜ↯bₒₜ' },
              header: {
                hasMediaAttachment: true,
                imageMessage: messa.imageMessage,
              },
              nativeFlowMessage: {
                buttons: [
                  {
                    name: 'single_select',
                    buttonParamsJson: JSON.stringify({
                      title: 'نتائــج البحــث',
                      sections: [
                        {
                          title: menu,
                          highlight_label: '🧚🏼‍♂️',
                          rows: heager
                        }
                      ]
                    }),
                  },
                ],
                messageParamsJson: "",
              },
            },
          },
        }
      }, { userJid: conn.user.jid, quoted: fakecontact });

      await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
      global.videoListXXX.push(vids_);
    } catch (e) {
      throw e;
    }
  } else if (command === 'xn.1') {
    let xnxxLink = args[0];

    try {
      const res = await xnxxdl(xnxxLink);
      const json = res.result.files;
      let txt = `╮───────────────────────╭ـ\n│✑ *أسم المقطع :* ${res.result.title} 🧞\n│✑ *رابط الصفحه :* ${xnxxLink}\n│✑ 🧞 𝐋𝐨𝐚𝐝𝐢𝐧𝐠, 𝐰𝐚𝐢𝐭 𝐦𝐨𝐦𝐞𝐧𝐭...\n╯───────────────────────╰ـ`;
      let txt2 = `╮───────────────────────╭ـ\n│✑ *أسم المقطع :* ${res.result.title} 🧞\n│✑ *وصف المقطع :* ${res.result.info}\n╯───────────────────────╰ـ`;

      conn.sendMessage(m.chat, { text: txt, image: { url: res.result.image }, mimetype: 'image/png', fileName: 'seximage.png' }, { quoted: fakecontact });
      await conn.sendMessage(m.chat, { video: { url: json.high }, mimetype: 'video/mp4', fileName: res.result.title, caption: txt2 }, { quoted: fakecontact });
    } catch {
      throw `*جرب تاني واتاكد من الرابط 🧚🏼‍♂️*`;
    }
  }
};

handler.help = ['xns'].map((v) => v + ' <query>');
handler.tags = ['downloader', 'premium'];
handler.command = /^(xn|xn.1)$/i;

export default handler;

async function xnxxsearch(query) {
  const baseurl = 'https://www.xnxx.com';
  const url = `${baseurl}/search/${query}/${Math.floor(Math.random() * 8) + 4}`;
  try {
    const res = await fetch(url);
    const text = await res.text();
    const $ = cheerio.load(text);
    const results = [];

    $('div.mozaique').each((a, b) => {
      const thumb = $(b).find('div.thumb a');
      const thumbUnder = $(b).find('div.thumb-under');
      thumb.each((i, el) => {
        const link = baseurl + $(el).attr('href').replace('/THUMBNUM/', '/');
        const title = thumbUnder.eq(i).find('a').attr('title');
        const info = thumbUnder.eq(i).find('p.metadata').text();
        results.push({ title, info, link });
      });
    });

    return { code: 200, status: true, result: results };
  } catch (err) {
    return { code: 503, status: false, result: err };
  }
}

async function xnxxdl(URL) {
  return new Promise((resolve, reject) => {
    fetch(`${URL}`, { method: 'get' }).then((res) => res.text()).then((res) => {
      const $ = cheerio.load(res, { xmlMode: false });
      const title = $('meta[property="og:title"]').attr('content');
      const duration = $('meta[property="og:duration"]').attr('content');
      const image = $('meta[property="og:image"]').attr('content');
      const videoType = $('meta[property="og:video:type"]').attr('content');
      const videoWidth = $('meta[property="og:video:width"]').attr('content');
      const videoHeight = $('meta[property="og:video:height"]').attr('content');
      const info = $('span.metadata').text();
      const videoScript = $('#video-player-bg > script:nth-child(6)').html();
      const files = {
        low: (videoScript.match('html5player.setVideoUrlLow\\(\'(.*?)\'\\);') || [])[1],
        high: videoScript.match('html5player.setVideoUrlHigh\\(\'(.*?)\'\\);' || [])[1],
        HLS: videoScript.match('html5player.setVideoHLS\\(\'(.*?)\'\\);' || [])[1],
        thumb: videoScript.match('html5player.setThumbUrl\\(\'(.*?)\'\\);' || [])[1],
        thumb69: videoScript.match('html5player.setThumbUrl169\\(\'(.*?)\'\\);' || [])[1],
        thumbSlide: videoScript.match('html5player.setThumbSlide\\(\'(.*?)\'\\);' || [])[1],
        thumbSlideBig: videoScript.match('html5player.setThumbSlideBig\\(\'(.*?)\'\\);' || [])[1]
      };
      resolve({ status: 200, result: { title, URL, duration, image, videoType, videoWidth, videoHeight, info, files } });
    }).catch((err) => reject({ code: 503, status: false, result: err }));
  });
}