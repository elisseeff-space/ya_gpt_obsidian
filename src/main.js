import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import config from "config"

import { yaGPT } from "./ya_gpt.js";
import { Loader } from "./loader.js";
import { Dialog } from "./dialog.js";

const dialogs = {}
const bot = new Telegraf(config.get('ya_stt_bot'), {
//const bot = new Telegraf(config.get('elis_ya_gpt_bot'), {
    handlerTimeout: Infinity,
})

bot.command('start', ctx => {
    try {
        const chat_id = ctx.chat.id
        if (dialogs[chat_id] == undefined) {
            dialogs[chat_id] = new Dialog(ctx)
        } else {
            dialogs[chat_id].clear_dialog(ctx)
            ctx.reply('Dialog is cleared. Starting again!')
        }
    } catch (err) {
        console.log('Error while command -Start- executed.', err.message)
    }
})

bot.command('role', ctx => {
    try {
        const chat_id = ctx.chat.id
        if (dialogs[chat_id] == undefined) {
            dialogs[chat_id] = new Dialog(ctx)
        } else {
            dialogs[chat_id].set_dialog_role(ctx)
        }
    } catch (err) {
        console.log('Error while command -role- executed.', err.message)
    }
})

bot.command('control', ctx => {
    try {
        const keys = Object.keys(dialogs);
        for (let i of keys) { 
            //ctx.reply(`In chat: ${i}\n`)
            const keys_2 = Object.keys(dialogs[i].dialog_messages);
            for (let j of keys_2) {
                ctx.reply(`chat: ${i}, role: ${dialogs[i].dialog_messages[j].role}, text: ${dialogs[i].dialog_messages[j].text}`)
            }
        }
    } catch (err) {
        console.log('Error while command -Control- executed.', err.message)
    }
})

bot.command('help', ctx => {
    try {
        const content = `Иструкция по применению!

    Всего несколько правил использования бота:
                
    1. Командой /role можно задать инструкцию боту, чтобы он лучше понимал, что ему надо делать.

    "Например: Инструкция: Найди все упомянутые даты и время в тексте. Выпиши их, каждый с новой строки. \n Пример результата: 22-01-2019 17:00 Завтра 18:15 Вчера Если в тексте нет дат, верни 0.\n",
    "Или: Ты — опытный копирайтер. Сгенерируй 5 опций заголовка для маркетингового текста, чтобы привлечь внимание читателей.
    
    2. Командой /start можно сбросить историю диалога.
    
    3. Если бот добавлен в группу, и нужно чтобы он проигнорировал сообщение, то есть НЕ отвечал на него, надо добавить символ @ в сообщение."),
    "Например, адресно обратиться к одному из участников.\n Тогда бот не будет мешать своими ответами.`
        ctx.reply(content)
    } catch (err) {
        console.log('Error while command -Help- executed.', err.message)
    }
})

bot.on(message('text'), async (ctx) => {
    
    try {
        const text = ctx.message.text
        //const chat_id = toString(ctx.chat.id)
        const chat_id = ctx.chat.id
        if (!text.trim()) ctx.reply('Сообщение не может быть пустым!')
        const loader = new Loader(ctx)
        //loader.show()

        //console.log(dialogs)

        if (dialogs[chat_id] == undefined) {
            dialogs[chat_id] = new Dialog(ctx)
        } else {
            dialogs[chat_id].update_dialog(ctx)
            //console.log(dialogs[chat_id])
        }
        //const res_ya = await yaGPT(text)
        const res_ya = await yaGPT(dialogs[chat_id].dialog_messages)
        if(!res_ya) return('API Error!', res_ya)

        //loader.hide()
        ctx.reply(res_ya)
        dialogs[chat_id].add_assistant_message(res_ya)
    } catch (err) {
        console.log('Error while processing text.', err.message)
    }
})

bot.launch()