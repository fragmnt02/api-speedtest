require('dotenv').config(); 
const Telegraf = require('telegraf'); 
const express = require('express'); 
const fetch = require('node-fetch');
const expressApp = express(); 

const bot = new Telegraf(process.env.BOT_TOKEN); 
console.log(process.env.BOT_TOKEN); 

expressApp.use(bot.webhookCallback('/bot')); 
bot.telegram.setWebhook('https://bot-speedtest.vercel.app/bot'); 

expressApp.get('/', (req, res) => {
    res.send('Bot version 1');
})


bot.command('ver', async (ctx) => {
    const res = await fetchVelocidades();
    ctx.reply(res);
})


bot.on('text', async (ctx) => {
    if (ctx.message.text.includes('velocidad')) {
        const res = await fetchVelocidades(ctx.message.text.replace('velocidad ',''));
        ctx.reply(res);
    } else {
        ctx.reply('adios test');
    }
});

async function fetchVelocidades(url) {
    const res = await fetch(url);
    if (res.ok) {
        const data = await res.json();
        return data.response;
    }
    return 'Hola test';
}

expressApp.listen(3000, () => {
    console.log('Example app listening on port ' + PORT);
});