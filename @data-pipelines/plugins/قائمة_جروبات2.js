let handler = async (m, { conn }) => {
  const groups = await conn.groupFetchAllParticipating();
  const list = Object.entries(groups)
    .map(([jid, data], index) => `${index + 1}. ${data.subject} (${jid})`)
    .join('\n');

  m.reply(`📂 قائمة الجروبات:\n\n${list}`);
};

handler.command = ['قائمة_جروبات2'];
handler.owner = true;

export default handler;