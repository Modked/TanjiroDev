let handler = async (m, { sock }) => {
  console.log("📥 تم تنفيذ أمر الدخول"); // ← اختبر هنا
  try {
    if (!m.quoted) return m.reply("📌 منشن رسالة فيها زر دعوة (مثل View Invite).");

    const msg = m.quoted.message;
    let inviteCode = null;

    if (msg.templateMessage?.hydratedTemplate?.hydratedButtons) {
      const buttons = msg.templateMessage.hydratedTemplate.hydratedButtons;

      for (let btn of buttons) {
        const url = btn?.urlButton?.url;
        const match = url?.match(/chat\.whatsapp\.com\/([0-9A-Za-z]+)/);
        if (match) {
          inviteCode = match[1];
          break;
        }
      }
    }

    if (!inviteCode) {
      return m.reply("❗ لم أتمكن من العثور على كود الدعوة في الزر. تأكد أنك منشن رسالة زر (View Invite).");
    }

    await sock.groupAcceptInvite(inviteCode);
    m.reply("✅ دخلت القروب بنجاح!");
  } catch (err) {
    console.error(err);
    m.reply("❌ صار خطأ، تأكد من صلاحية الدعوة أو نوع الرسالة.");
  }
};

handler.command = /^دخول$/i;
handler.owner = true;

module.exports = handler;