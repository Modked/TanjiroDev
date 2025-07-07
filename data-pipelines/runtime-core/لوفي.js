let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    let name = conn.getName(m.sender);
    let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];
    let message = `*${taguser}*\n*「نعم سيدي ،،لوفي خدامك بأي وقت🤓⚡」*`;

    conn.sendFile(m.chat, 'let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    let name = conn.getName(m.sender);
    let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];
    let message = `*${taguser}*\n*「نعم سيدي ،،لوفي خدامك بأي وقت🤓⚡」*`;

    conn.sendFile(m.chat, 'https://telegra.ph/file/03bef07dfae8c091fec04.jpg', 'image.jpg', message, m);
};

handler.customPrefix = /^(لوفي|ونبيس)$/i;
handler.command = new RegExp;

export default handler;', 'image.jpg', message, m);
};

handler.customPrefix = /^(لوفي|ونبيس)$/i;
handler.command = new RegExp;

export default handler;