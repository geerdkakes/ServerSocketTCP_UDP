// Example adapted from https://gist.github.com/sid24rane/6e6698e93360f2694e310dd347a2e2eb
// https://gist.github.com/sid24rane

const udp = require('dgram');
const conf = require('./config/config');
var increment = Math.floor( Math.random() * 9007199254740991);
const interval = 1000;

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
        client: "client_1"
    }

    var data = Buffer.from(JSON.stringify(message));

    //sending msg
    client.send(data, conf.port, conf.host, error => {
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

