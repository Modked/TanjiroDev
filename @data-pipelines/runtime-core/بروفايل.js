let handler = async (m, { conn, args }) => {
    let targetId = args[0] ? args[0] + "@s.whatsapp.net" : m.sender;
    let user = global.db.data.users[targetId];

    if (!user) return m.reply("❌ *هذا المستخدم غير مسجل!*");

    // التأكد من وجود البيانات
    user.hearts = user.hearts || 0;
    user.name = user.name || "غير محدد";
    user.description = user.description || "لا يوجد وصف";
    user.registered = user.registered || false;

    let status = user.registered ? "✅ مسجل" : "❌ غير مسجل";

    // جلب صورة البروفايل
    let profilePic;
    try {
        profilePic = await conn.profilePictureUrl(targetId, 'image');
    } catch (e) {
        profilePic = 'https://tinyurl.com/2yux4foz'; // صورة افتراضية
    }

    let profileText = `            ˼🪪˹╿الـبـروفـايـل╿˼🪪˹
*┐┈─๋︩︪──๋︩︪─═⊐‹⌗›⊏═─๋︩︪──๋︩︪─┈┌*
*┊اســ🪪مـك: ˼${user.name}˹*
*┊عـمـ🪄ـرك: ˼${user.age}˹
*┊مـسـتـ🔮ـواك: ˼${user.level}˹*
*┊خــبـ🎗️ــرتـك: ˼${user.exp}˹*
*┊رقـمـ🔢ـك: ˼${targetId.split("@")[0]}˹*
*┊الـوصـ📄ـف ˼${user.description}˹*
*┊مـسـ🗞ـجـل ˼${status}˹*
*┊عـدد الـقـلـ❤ـوب: ˼${user.hearts}˹*
*┘┈─๋︩︪──๋︩︪─═⊐‹⌗›⊏═─๋︩︪──๋︩︪─┈└*`;

    conn.sendMessage(m.chat, {
        image: { url: profilePic },
        caption: profileText,
        footer: "© ʙy ᴛᴀɴᴊɪʀᴏ-ᴀɪ ²⁰²⁵",
        buttons: [
            {
                buttonId: `.قلب ${targetId.split("@")[0]}`,
                buttonText: { displayText: "❤️" }
            }
        ],
        headerType: 4,
        viewOnce: true
    }, { quoted: m });
};

handler.command = ['بروفايل','بروفايلي','انا'];
handler.register = true
export default handler;