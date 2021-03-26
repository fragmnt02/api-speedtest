require('dotenv').config(); 
const {Telegraf} = require('telegraf'); 
const express = require('express');
const expressApp = express(); 

const bot = new Telegraf(process.env.BOT_TOKEN); 
console.log(process.env.BOT_TOKEN); 

expressApp.use(express.json());
expressApp.post('/webhook',(req,res)=>{
    const {chatId} = req.query;
    const {response} = req.body;
    if (chatId) {
        bot.telegram.sendMessage(chatId,response);
    } else {
        console.log('NO CHAT ID PROVIDED');
    }
});

expressApp.use(bot.webhookCallback('/bot')); 
bot.telegram.setWebhook('https://bot-speedtest.vercel.app/bot'); 


expressApp.get('/', (req, res) => {
    res.send('Bot version 1');
});

bot.on('text', async (ctx) => {
    if (ctx.message.text.includes('chatId')) {
        ctx.reply(ctx.message.chat.id);
    }
});

expressApp.listen(3000, () => {
    console.log('Example app listening on port ' + PORT);
});