import { exec } from 'child_process';

const handler = async (m, { conn }) => {
  try {
    let msg = await conn.sendMessage(m.chat, { text: `جاري تشغيل البث...` }, { quoted: m });
    exec(`ffmpeg -re -i https://dwamdstream103.akamaized.net/hls/live/2015526/dwstream103/index.m3u8 -c:v libx264 -c:a aac -f flv rtmps://live-api-s.facebook.com:443/rtmp/FB-1216500886605133-0-Ab2JckKQWQphiI6DBmwG8R4R?ds=1&s_l=1`);
    conn.sendMessage(m.chat, { text: `تم تشغيل البث بنجاح`, edit: msg.key }, { quoted: m });
  } catch (err) {
    conn.sendMessage(m.chat, { text: `فشل في تشغيل البث: ${err.message}` }, { quoted: m });
  }
};

handler.help = ['startstream'];
handler.tags = ['owner'];
handler.command = /^(بثه3)$/i;
handler.owner = true;

export default handler;