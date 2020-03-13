//
// Usage:
// -h hostname
// -c client name
// -p port number
//
//
const args = require('minimist')(process.argv.slice(2));
const udp = require('dgram');
var increment = Math.floor( Math.random() * 9007199254740991);
const interval = 1000;
const host = (typeof args.h === 'undefined' || args.h === null) ? "127.0.01" : args.h;
const clientName = (typeof args.h === 'undefined' || args.c === null) ? "client_1" : args.c;
const port = (typeof args.p === 'undefined' || args.p === null) ?  21000 : Number(args.p);

// creating a client socket
const client = udp.createSocket('udp4');

function getTime() {
    return Date.now().valueOf();
}

client.on('message', (msg, info) => {
    let message = JSON.parse(msg.toString());
    console.log('R', message.response_to, message.timestamp, message.delay, message.sequencenr)
});

function send_message() {

    let message = {
        sequencenr: increment++,
        timestamp: getTime(),
        client: clientName
    }

    var data = Buffer.from(JSON.stringify(message));

    //sending msg
    client.send(data, port, host, error => {
        if (error) {
            console.log(error)
            client.close()
        } else {
            console.log('S', message.sequencenr, message.timestamp);
        }
    });
}

setInterval(function(){
    send_message();
}, interval);

