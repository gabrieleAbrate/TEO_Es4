window.onload = () => {
    /* 
        eseguissi questa chiamata da un altro dominio,
        il browser bloccherebbe la richiesta per motivi di sicurezza (CORS)
        per risolvere questo problema, il server deve inviare un header
        con il valore 'Access-Control-Allow-Origin': '*'
    */
    fetch('http://localhost:1337/saluto');
}