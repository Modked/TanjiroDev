/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

import axios from "axios";
import cheerio from "cheerio";

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
    if (!text) throw "Input text required";
    try {
        await m.react('🔁');

        let res = await fetchThumbnailUrls('https://storyset.com/search?q=' + encodeURIComponent(text));

        if (res.length === 0) {
            await m.react('❌');
            throw "No results found.";
        }

        let rdm = res[Math.floor(Math.random() * res.length)];

        await conn.sendMessage(m.chat, {
            image: { url: rdm },
            caption: `[ RESULT ]\n${text}`
        }, { quoted: m });

        await m.react('✅');

    } catch (e) {
        console.error("Error in handler:", e);
        await m.react('❌');
        throw "An error occurred. Please try again later.";
    }
};

handler.help = ["storyset"];
handler.tags = ["internet"];
handler.command = /^(storyset)$/i;

export default handler;

/* Fetch Thumbnail URLs */
async function fetchThumbnailUrls(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const thumbnailUrls = $('script[type="application/ld+json"]').toArray()
            .map(element => {
                try {
                    const jsonData = JSON.parse($(element).html());
                    if (jsonData['@type'] === 'ImageObject' && jsonData.thumbnailUrl) {
                        return jsonData.thumbnailUrl;
                    }
                } catch (error) {
                    console.error("JSON parse error:", error);
                }
            }).filter(url => url);

        return thumbnailUrls;
    } catch (error) {
        console.error('Failed to fetch webpage:', error);
        return [];
    }
}