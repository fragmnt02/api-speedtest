require('dotenv').config();
const fetch = require('node-fetch');
const { exec } = require('child_process');
const MINUTOS = 2;
function callback() {
    console.log('calculando velocidad');
    exec('speedtest', async (err, stdout, stderr) => {
        if (err) {
            console.log(err)
            return;
        }
        if (stderr) {
            console.log(stderr);
            return;
        }
        const body = JSON.stringify({
            response: stdout
        });
        console.log(stdout);
        console.log(`Envidando a https://bot-speedtest.vercel.app/webhook?chatId=${process.env.CHAT_ID}`);
        const res = await fetch(`https://bot-speedtest.vercel.app/webhook?chatId=${process.env.CHAT_ID}`, {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.ok) {
            console.log('Mensaje enviado con extito');
        }
    });
}

enviarMsg('agente conectado');
console.log(`Agente conectado para chat ${process.env.CHAT_ID}`)
const intervalId = setInterval(callback, MINUTOS * 60000);

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