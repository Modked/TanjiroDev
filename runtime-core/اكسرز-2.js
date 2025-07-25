import syntaxerror from 'syntax-error';
import { format } from 'util';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createRequire } from 'module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);

const handler = async (m, _2, msg, pickRandom, isOwner) => {
    if (m.fromMe) return;

    const mention = m.mentionedJid && m.mentionedJid[0] 
        ? m.mentionedJid[0] 
        : m.quoted 
            ? m.quoted.sender 
            : false;

    const { conn, usedPrefix, noPrefix, args, groupMetadata, command, isROwner } = _2;
    if (!isROwner) return;

    let _return;
    let _syntax = '';
    const _text = (/^=/.test(usedPrefix) ? 'return ' : '') + noPrefix;
    const oldExp = m.exp * 1;

    try {
        let executionLimit = 15;
        const f = { exports: {} };

        const exec = new (async () => {}).constructor(
            'print', 'm', 'handler', 'require', 'conn', 'Array', 'process', 'args', 
            'groupMetadata', 'module', 'exports', 'argument', _text
        );

        _return = await exec.call(
            conn,
            (...args) => {
                if (--executionLimit < 1) return;
                console.log(...args);
                return conn.reply(m.chat, format(...args), m);
            },
            m, handler, require, conn, CustomArray, process, args, groupMetadata, f, f.exports, [conn, _2]
        );
    } catch (e) {
        const err = syntaxerror(_text, 'Execution Function', {
            allowReturnOutsideFunction: true,
            allowAwaitOutsideFunction: true,
            sourceType: 'module',
        });

        if (err) _syntax = '```' + err + '```\n\n';
        _return = e;
    } finally {
        conn.reply(m.chat, _syntax + format(_return), m);
        m.exp = oldExp;
    }
};

handler.help = ['> ', '=> '];
handler.tags = ['advanced'];
handler.customPrefix = /=?>|~/;
handler.command = /(?:)/i;

export default handler;

class CustomArray extends Array {
    constructor(...args) {
        if (typeof args[0] === 'number') return super(Math.min(args[0], 10000));
        else return super(...args);
    }
}

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}