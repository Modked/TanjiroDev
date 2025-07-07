import axios from "axios"
import cheerio from "cheerio"

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    throw `*please provide a video link from Capcut Lee 🪄💗📚_*\n*exemple* :.capcut https://www.capcut.com/t/Zs8F2jgx7`;
  m.reply(wait);
  try {
    let res = await capcut(text);
    conn.sendFile(
      m.chat,
      res.video,
      null,
      `*DONE ✅🪄_*\n*⌝ lein photo mosarara ┋📚⌞ ⇊*\n ${res.thumbnail}\n*⌝ lein video ⇊*\n${text}*`,
      m,
    );
  } catch (e) {}
};
handler.help = ["capcut"].map((a) => a + "");
handler.tags = ["downloader"];
handler.command = ["capcut"];
export default handler;

async function capcut(url) {
  const response = await fetch(url);
  const data = await response.text();
  const $ = cheerio.load(data);

  return {
    thumbnail: $("video").attr("poster"),
    video: $("video").attr("src"),
  };
}