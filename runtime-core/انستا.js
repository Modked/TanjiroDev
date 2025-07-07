import { igdl } from 'ruhend-scraper';

const handler = async (m, { args, conn }) => {
  if (!args[0]) {
    return conn.reply(m.chat, `*${emoji} الرجاء إدخال رابط Instagram.*`, m);
  }

  try {
    await m.react(rwait);
    const res = await igdl(args[0]);
    const data = res.data;

    for (let media of data) {
      await conn.sendFile(m.chat, media.url, 'instagram.mp4', ` ╭────────⚔────────╮  
  ${emoji}  *ঔৣ☬ღṨᾋṨȖḰἝ ϐὋҬ ღ☬ঔৣ*  
╰────────⚔────────╯\n> ⟢ ღօառεг : *© ʙy ᴛᴀɴᴊɪʀᴏ-ᴀɪ*`, m);
    await m.react(done);
    }
  } catch (e) {
    return conn.reply(m.chat, `${msm} Ocurrió un error.`, m);
    await m.react(error);
  }
};

handler.command = ['instagram', 'ig', 'انستا', 'انستقرام', 'انستغرام', 'insta']
handler.tags = ['downloader']
handler.help = ['instagram <text>']
handler.group = true;
export default handler;