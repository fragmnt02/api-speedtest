require('dotenv').config();
const fetch = require('node-fetch');
const { exec } = require('child_process');
function callback() {
    exec('speedteest', async (err, stdout, stderr) => {
        if (err) {
            return
        }
        const body = JSON.stringify({
            response: stdout
        });
        console.log(`Envidando a https://bot-speedtest.vercel.app/webhook?chatId=${process.env.CHAT_ID}`);
        await fetch(`https://bot-speedtest.vercel.app/webhook?chatId=${process.env.CHAT_ID}`, {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    });
}

enviarMsg('agente conectado');
console.log(`Agente conectado para chat ${process.env.CHAT_ID}`)
const intervalId = setInterval(callback, 600000);

async function enviarMsg(msg) {
    await fetch(`https://bot-speedtest.vercel.app/webhook?chatId=${process.env.CHAT_ID}`, {
        method: 'POST',
        body: JSON.stringify({
            response: msg
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

function cleanup() {
    clearInterval(intervalId);
}

//do something when app is closing
process.on('exit', cleanup);

//catches ctrl+c event
process.on('SIGINT', cleanup);

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', cleanup);
process.on('SIGUSR2', cleanup);

//catches uncaught exceptions
process.on('uncaughtException', cleanup);