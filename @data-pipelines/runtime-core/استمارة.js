let handler = async (m, { command, text }) => m.reply(`~*『𝓚𝓪𝓽𝓼𝓾𝓴𝓲 𓆩☕𓆪𝓐𝓵𝓵𝓲𝓪𝓷𝓬𝓮』*~
*❆━━━━━═⏣𓆩☕𓆪⏣═━━━━━━❆*

*يرجى ملىء الاستمارة👇🏻*


*✧❯ _اللقب_ :『』* 


*✧❯ _اسم الانمي_ :『』*


*✧❯ _ولد او بنت_  :『』*


*✧❯ _صورة اللقب_ :『』*


*✧❯ _من طرف_  :『』*


 _*منشن أحد المشرفين 📧*_ 

~*『𝓚𝓪𝓽𝓼𝓾𝓴𝓲 𓆩☕𓆪𝓐𝓵𝓵𝓲𝓪𝓷𝓬𝓮』*~

*❆━━━━━═⏣𓆩☕𓆪⏣═━━━━━━❆*`.trim(), null, m.mentionedJid ? {
  mentions: m.mentionedJid
} : {})

handler.help = ['الاوامر <teks>?']
handler.tags = ['الاوامر', 'fun']
handler.command = /^(الاستماره|استماره|استمارة)$/i

export default handler