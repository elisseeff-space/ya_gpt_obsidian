import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import config from "config"

import { yaGPT } from "./ya_gpt.js";


const bot = new Telegraf(config.get('ya_stt_bot'), {
    handlerTimeout: Infinity,
})

bot.command('start', ctx => {
    ctx.reply('Welcome to our Bot!')
})

bot.on(message('text'), async (ctx) => {
    const res_ya = await yaGPT(ctx.message.text)
    ctx.reply(res_ya)
    //ctx.reply('test!')
})

bot.launch()