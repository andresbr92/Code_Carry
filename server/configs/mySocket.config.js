const app = require('express')();
const server = require('http').createServer(app);
const options = { /* ... */ };
const io = require('socket.io')(server, options);
const nsp = io.of('/chatNuevo')
nsp.on('connection', socket => { 
    console.log ('someone conected')
})

io.on('connection', socket => { 
    const workspace = socket.nsp
    socket.join('someRoom')
    socket.send ('hello')
 });

server.listen(4000);