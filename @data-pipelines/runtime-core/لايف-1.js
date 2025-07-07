import { exec } from 'child_process';

const handler = async (m, { conn }) => {
  try {
    const command = `ffmpeg -re -i https:                                                                                                                                                                                                          

    let initialMessage = await conn.sendMessage(m.chat, { text: `//dwamdstream103.akamaized.net/hls/live/2015526/dwstream103/index.m3u8 -c:v libx264 -c:a aac -f flv rtmps://live-api-s.facebook.com:443/rtmp/FB-122155882760548164-0-Ab0kCgYsUzcMWvL6K8wwzEmp?ds=1&s_l=1`;

    let initialMessage = await conn.sendMessage(m.chat, { text: `جاري تشغيل البث...` }, { quoted: m });

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        conn.sendMessage(m.chat, { text: `حدث خطأ أثناء تشغيل البث: ${error.message}`, edit: initialMessage.key }, { quoted: m });
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        conn.sendMessage(m.chat, { text: `تحذير: ${stderr}`, edit: initialMessage.key }, { quoted: m });
        return;
      }
      console.log(`stdout: ${stdout}`);
      conn.sendMessage(m.chat, { text: `تم تشغيل البث بنجاح`, edit: initialMessage.key }, { quoted: m });
    });
  } catch (err) {
    console.error(`Failed to start stream: ${err.message}`);
    conn.sendMessage(m.chat, { text: `فشل في تشغيل البث: ${err.message}` }, { quoted: m });
  }
};

handler.help = ['startstream'];
handler.tags = ['owner'];
handler.command = /^(بث)$/i;
handler.owner = true;

export default handler;