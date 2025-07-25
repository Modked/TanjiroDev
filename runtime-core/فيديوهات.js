let handler = async (m, { conn, args, usedPrefix, command }) => {
 const taguser = '@' + m.sender.split("@s.whatsapp.net")[0]
  
 conn.relayMessage(m.chat, {
  viewOnceMessage: {
   message: {
    interactiveMessage: {
     header: {
      title: `*⟣┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈⟢*
*🐉✬⃝╿↵ مرحــبـا ➻${m.pushName}*
*⟣┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈⟢*
🎥│قسم الفيديوهات│🌌`
     },
     body: {
      text: ''
     },
     nativeFlowMessage: {
      buttons: [
       {
        name: 'single_select',
        buttonParamsJson: JSON.stringify({
         title: 'الفيديوهات',
         sections: [
          {
           title: 'قسم الفيديوهات',
           highlight_label: '© 𝑺𝒂𝒔𝒖𝒌𝒆 2025',
           rows: [
{ header: 'الفيديوهات', title: '🎬 ❛╏مقاطع أنمي', description: '', id: '.ايديت-انمي1' },
{ header: 'الفيديوهات', title: '🎞️ ❛╏مقاطع انمي 2', description: '', id: '.ايديت-انمي2' },
{ header: 'الفيديوهات', title: '📺 ❛╏مقاطع انمي 3', description: '', id: '.ايديت-انمي3' },
{ header: 'الفيديوهات', title: '🎥 ❛╏مقاطع انمي 4', description: '', id: '.ايديت-انمي4' },
{ header: 'الفيديوهات', title: '📱 ❛╏استوريهات انمي', description: '', id: '.ايديت-ستوري' },
{ header: 'الفيديوهات', title: '🐉 ❛╏مقاطع دراغون بول', description: '', id: '.دراغون-بول' },
{ header: 'الفيديوهات', title: '⚽ ❛╏مقاطع اهداف', description: '', id: '.اهداف' },
{ header: 'الفيديوهات', title: '🐐 ❛╏مقاطع الدون كريستيانو رونالدو', description: '', id: '.ايديت-كريستيانو' },
{ header: 'الفيديوهات', title: '🎵 ❛╏مقاطع موسيقي', description: '', id: '.ايديت-اغنيه' },
{ header: 'الفيديوهات', title: '🚗 ❛╏مقاطع سيارات', description: '', id: '.ايديت-سيارات' },
{ header: 'الفيديوهات', title: '👫 ❛╏مقاطع لصديقك', description: '', id: '.لصديق' },
{ header: 'الفيديوهات', title: '🎭 ❛╏مقاطع منوعة', description: '', id: '.ايديت-منوع' },
{ header: 'الفيديوهات', title: '🎡 ❛╏مقاطع مختلط', description: '', id: '.ايديت-مختلط' }
           ]
          }
         ]
        }),
        messageParamsJson: ''
       }
      ]
     }
    }
   }
  }
 }, {})
}

handler.help = ['info']
handler.tags = ['main']
handler.command = ['الفيديوهات', 'التصاميم', 'تصاميم', 'التصميمات', 'تصميمات']

export default handler