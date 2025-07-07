const isToxic =
  /(^|\s)(كسمك|كسم|كسي|طيز|طيزي|طيزك|زب|يكسم|يكسمك|عرص|انيكك|نيك|متناك|خول|شرموطه|بنوتهه|عرص|متناكه|شرموطة|زبي|زق|قحبة|قحب|منيوك|ابن متناكه|جحش|حقك في الزب|بعير|xxx|xnxx|سير تقود|تقود|🖕🏿|🖕🏻|🖕|🖕🏾|🖕🏽|🖕🏼|طبون|طبون امك|امك|مك|كسك|سكس|مصمص|كس|بتركبها|اركبك|مخنوث|يركبك|بوت زفت|بوت غبي|الحس|لحس|منوي|fack|رهطت|رهط|ارهطك|اعربك|عربك|عربكم)(\s|$)/i;


import axios from 'axios';

export async function before(m, { isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return true;
  if (!m.isGroup || !m.text) return false;

  let chat = global.db.data.chats[m.chat];
  let bot = global.db.data.settings[this.user.jid] || {};
  const isAntiToxic = isToxic.exec(m.text);
  let removeParticipant = m.key.participant;
  let messageId = m.key.id;

  if (chat.antiToxic && isAntiToxic) {
    if (!global.db.data.users[m.sender]) {
      global.db.data.users[m.sender] = { warn: 0 };
    }

    // حذف الرسالة
    try {
      await this.sendMessage(m.chat, {
        delete: { remoteJid: m.chat, fromMe: false, id: messageId, participant: removeParticipant },
      });
    } catch (error) {
      console.error("Error deleting message:", error);
    }

    // إرسال رسالة التحذير
    await this.sendMessage(m.chat, {
      text: `*🚫 تم اكتشاف رسالة تحتوي على كلمات غير لائقة، وتم اتخاذ إجراء!*\n\n⛔ يرجى الالتزام بآداب الحديث داخل المجموعة.`,
      mentions: [m.sender]
    });

    // التعامل مع التحذيرات
    if (isBotAdmin) {
      if (isAdmin) {
        global.db.data.users[m.sender].warn += 1;
        let warnCount = global.db.data.users[m.sender].warn;
        let warningMessage = `*تم حذف رسالتك لأنها تحتوي على كلمات غير لائقة.*\nعدد تحذيراتك الحالية: ${warnCount}/3`;

        if (warnCount >= 3) {
          warningMessage += `\n⚠️ وصلت للحد الأقصى من التحذيرات، لكن لا يمكن طردك لأنك مشرف.`;
          // تصفير التحذيرات حتى لو Admin (لو حاب تزيلها من هنا قول لي)
          global.db.data.users[m.sender].warn = 0;
        }

        await this.sendMessage(m.chat, {
          text: warningMessage,
          mentions: [m.sender]
        });
      } else {
        global.db.data.users[m.sender].warn += 1;
        let warnCount = global.db.data.users[m.sender].warn;

        if (warnCount >= 3) {
          await this.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
          global.db.data.users[m.sender].warn = 0; // تصفير التحذيرات بعد الطرد
          await this.sendMessage(m.chat, {
            text: `*تم طردك بسبب تكرار المخالفات، وتم تصفير تحذيراتك.*`,
            mentions: [m.sender]
          });
        } else {
          await this.sendMessage(m.chat, {
            text: `*تم حذف رسالتك لأنها تحتوي على كلمات غير لائقة.*\nعدد تحذيراتك الحالية: ${warnCount}/3`,
            mentions: [m.sender]
          });
        }
      }
    }
  }

  return true;
}