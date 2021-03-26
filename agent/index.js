require('dotenv').config(); 
const { exec } = require('child_process');
async function callback() {
    exec('speedteest', (err, stdout, stderr) => {
        if (err) {
            return
        }
        const body = JSON.stringify({
            response: stdout
        });
        console.log(`Envidando a https://bot-speedtest.vercel.app/webhook?chatId=${process.env.CHAT_ID}`);
        await fetch(`https://bot-speedtest.vercel.app/webhook?chatId=${process.env.CHAT_ID}`,{
            method:'POST',
            body,
            headers:{
                'Content-Type':'application/json'
            }
        });
    });
}

const intervalId = setInterval(callback,600000);
console.log('agent started');

function cleanup() {
    clearInterval(intervalId);
}

//do something when app is closing
process.on('exit', cleanup);

//catches ctrl+c event
process.on('SIGINT', cleanup);

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', cleanup);
process.on('SIGUSR2',cleanup);

//catches uncaught exceptions
process.on('uncaughtException', cleanup);