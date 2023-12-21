'use strict';

const http = require('http');

// posso fare la require di spesa solo se all'interno di spesa.js ho fatto la export della classe
// per fare la export devo fare module.exports = Spesa;
// devo anche controllare che il file sia nella cartella node_modules (altrimenti non lo trova e devo inserire il path completo)
const sp = require('spesa');

// creo l'header da passare al dispatcher 
let header = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/plain'
};

// richiamo dispatcher e recupero la classe dispatcher
// dopo aver recuperato la classe dispatcher, creo un nuovo oggetto dispatcher
const dispatcher = require('dispatcher');
const d = new dispatcher(header);

// oppure potrei anche fare const dispatcher = new require('dispatcher');

// creazione del servizio saluto attraverso la funzione addServizio del dispatcher
d.addServizio('/saluto', (richiesta, risposta) => {
    header = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain'
    };

    risposta.writeHead(200, header);
    risposta.write('salve mondo');
    risposta.end();
});

// creazione del servizio initClasse attraverso la funzione addServizio del dispatcher (in questo caso il servizio è una funzione)
d.addServizio('/initClasse', () => {
    initClasse(richiesta, risposta);
});



// stesso cosa di quello sotto ma con un codice più compatto
//var server = http.createServer(d.smista.bind(d));

var server = http.createServer(gestisciRichieste);
server.listen(1337);
console.log('server in ascolto sulla porta 1337');

function gestisciRichieste(richiesta, risposta){
    d.smista(richiesta, risposta); 
}



function initClasse(richiesta, risposta){
    let s = new sp('lidl', 50, 'pippo');

    let header = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain'
    };

    // fare lo stringify dell'oggetto s è un problema perché non riporta le proprietà private e le funzioni
    risposta.writeHead(200, header);
    risposta.write(s.toString());
    risposta.end();
}