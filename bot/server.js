require('dotenv').config()
const Telegraf = require('telegraf')
const express = require('express')
const expressApp = express()

const bot = new Telegraf(process.env.BOT_TOKEN)
console.log(process.env.BOT_TOKEN)

expressApp.use(bot.webhookCallback('/bot'))
bot.telegram.setWebhook('https://bot-speedtest.vercel.app/bot')

expressApp.get('/', (req, res) => {
  res.send('Bot version 1')
})


bot.command('ver', (ctx) =>{
  ctx.reply(`${Math.floor(Math.random() * 100)}`)
})


bot.on('text', ctx => {
  if (ctx.message.text.includes('ver')) {
      
  }
  
})

expressApp.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})