let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    let name = conn.getName(m.sender);
    let taguser = '@' + m.sender.split("@")[0];
    let message = `*${taguser}*\n *「اعـظـم بـطـل فـي الـعـالـم✨🖤」*`;

    conn.sendFile(m.chat, 'https://telegra.ph/file/ae2a5c0e2fdd0db349433.jpg', 'image.jpg', message, m);
};

// الأمر الآن يشتغل لما تكتب: .ايرين
handler.command = /^ايرينو$/i;

export default handler;