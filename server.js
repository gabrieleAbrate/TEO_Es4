'use strict';

const http = require('http');
const url = require('url');
const fs = require('fs');

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

        default:

            break;
    }   
}