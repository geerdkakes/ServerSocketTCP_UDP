// Example adapted from https://gist.github.com/sid24rane/6e6698e93360f2694e310dd347a2e2eb
// https://gist.github.com/sid24rane

const udp = require('dgram')
const conf = require('./config/config')
var increment = Math.floor( Math.random() * 9007199254740991);

function log(...args){
    console.log(...args);
}

function getTime() {
    return Date.now().valueOf();
}

// --------------------creating a udp server --------------------

// creating a udp server
const server = udp.createSocket('udp4')

// emits when any error occurs
server.on('error', (error) => {
    log("udp_server", "error", error)
    server.close()
})

// emits on new datagram msg
server.on('message', (msg,info) => {
    let message = JSON.parse(msg.toString());
    

    let timestp = getTime();
    let delay = Number(timestp) - Number(message.timestamp);
    let response = {
        sequencenr: increment++,
        response_to: message.sequencenr,
        delay: delay,
        timestamp: timestp,
    }
    const data = Buffer.from(JSON.stringify(response))
    log(message.client, message.sequencenr, message.timestamp, delay, info.address);
    //sending msg
    server.send(data, info.port, info.address, (error, bytes) => {
        if(error){
            log("error sending data", error)
            client.close()
        }  
    })
})  // end server.on


//emits when socket is ready and listening for datagram msgs
server.on('listening', () => {
    const address = server.address()
    const port = address.port
    const family = address.family
    const ipaddr = address.address

    log("udp_server", "info", 'Server is listening at port ' + port)
    log("udp_server", "info", 'Server ip :' + ipaddr)
    log("udp_server", "info", 'Server is IP4/IP6 : ' + family)
})

//emits after the socket is closed using socket.close()
server.on('close', () => {
    log("udp_server", "info", 'Socket is closed !');
    process.exit(1);
})

server.bind(conf.port)
