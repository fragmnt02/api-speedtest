require('dotenv').config(); 
const Telegraf = require('telegraf'); 
const express = require('express'); 
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
    if (ctx.message.text.includes('ver')) {
        const res = await fetchVelocidades();
        ctx.reply(res);
    } else {
        ctx.reply('adios test');
    }
});

async function fetchVelocidades() {
    return 'Hola test';
}

expressApp.listen(3000, () => {
    console.log('Example app listening on port ' + PORT);
});