const express = require('express');
const { exec } = require('child_process');
const ngrok = require('ngrok');
const app = express();

const PORT = process.env.PORT || 3000;

async function main () {
    try {
        const url = await ngrok.connect({
            proto: 'http',
            addr: PORT
        });
        console.log(url);
        await saveFirebaseURL(url);
        app.get('/', function (req, res) {
            exec('speedtest', (err, stdout, stderr) => {
                if (err) {
                    res.status(500).send();
                    return;
                }
                res.status(200).send({
                    response: stdout
                });
            });
        });

        app.listen(PORT, () => {
            console.log('Agente escuchando en el puerto ' + PORT);
        });
    } catch (error) {

    }

}

async function saveFirebaseURL(url) {
    
}

main();




