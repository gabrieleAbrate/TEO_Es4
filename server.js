'use strict';

const http = require('http');
const url = require('url');
const fs = require('fs');

// posso fare la require di spesa solo se all'interno di spesa.js ho fatto la export della classe
// per fare la export devo fare module.exports = Spesa;
// devo anche controllare che il file sia nella cartella node_modules (altrimenti non lo trova e devo inserire il path completo)
const sp = require('spesa');

var server = http.createServer(gestisciRichieste);
server.listen(1337);
console.log('server in ascolto sulla porta 1337');

function gestisciRichieste(richiesta, risposta){
    let info = url.parse(richiesta.headers.host + richiesta.url, true);

    console.log(info.pathname);

    let header;
    let file;

    switch(info.pathname){
        case '/':
            file = fs.readFileSync('public/index.html');

            // access-control-allow-origin: * => permette a tutti di accedere al server (problemi di CORS)
            header = {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'text/html'
            };
            
            risposta.writeHead(200, header);
            risposta.write(file);
            risposta.end();

            break;

        case '/index.js':
            file = fs.readFileSync('public/js/index.js');

            header = {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'text/javascript'
            };

            risposta.writeHead(200, header);
            risposta.write(file);
            risposta.end();

            break;

        case '/saluto':
            header = {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'text/plain'
            };

            risposta.writeHead(200, header);
            risposta.write('salve mondo');
            risposta.end();

            break;

        case '/initClasse':
            let s = new sp('lidl', 50, 'pippo');

            header = {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'text/plain'
            };

            // fare lo stringify dell'oggetto s è un problema perché non riporta le proprietà private e le funzioni
            risposta.writeHead(200, header);
            risposta.write(s.toString());
            risposta.end();

        default:

            break;
    }   
}