



module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        socket.on('room', function (data) {
            console.log('in joining room in SERVER')
            socket.join(data.room);
            console.log(data)
            socket.broadcast.to(data.room).emit('load users and code')
            socket.broadcast.to(data.room).emit('new user join', data.user)
        });

        socket.on('leave room', function (data) {
            socket.broadcast.to(data.room).emit('user left room', { user: data.user })
            socket.leave(data.room)
        })

        socket.on('coding event', function (data) {
            const queueEvent = []
            queueEvent.push(data)
            
            
            
            const lastOne = queueEvent.splice(queueEvent.length - 1, 1)
            console.log (lastOne[0].code)


            // console.log('in EXPRESS coding event')
            // console.log(data)
            socket.broadcast.to(data.room).emit('receive code', { code: lastOne[0].code});
        })

        socket.on('send users and code', function (data) {
            socket.broadcast.to(data.room).emit('receive users and code', data)
        })
    });

    
    
       

}