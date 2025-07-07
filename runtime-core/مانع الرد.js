import fs from 'fs';
const { proto, generateWAMessage, areJidsSameUser } = (await import("@whiskeysockets/Baileys")).default;

const handler = (m) => m;
handler.all = async function(m) {

if (m?.isBaileys) return;
if (m?.fromMe) return;

};
export default handler;