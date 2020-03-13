# Server Socket TCP UDP


TCP and UDP servers and its clients

## Getting Started

Get and install the code:
```
git clone https://github.com/geerdkakes/ServerSocketTCP_UDP.git
cd ServerSocketTCP_UDP
npm install
```

Run the server on kubernetes using:
```
kubectl apply -f deployment-udp-server.yaml
```

Run the server directly on a machine using:
```
node udp_server.js
```


Run the client using:
```
node udp_client.js -h 127.0.0.1 -c clientname -p portnumber
```
where you change the ip into the ip the server is running on. The portnumber can and clientname can be ommited. 

### Prerequisites

NodeJS 8 or above



```

## Acknowledgments

*  This is a fork from: https://github.com/rodrigoms2004/ServerSocketTCP_UDP.git
* [sid24rane](https://gist.github.com/sid24rane) - Git Hub from sid24rane
* [UDP Server and Client](https://gist.github.com/sid24rane/6e6698e93360f2694e310dd347a2e2eb) - Original UDP server and client


## License

Copyfree
