



module.exports = (io) => {

    

    const users = {}
    const socketToRoom = {}

    io.on('connection', (socket) => {
 
        socket.on('disconnect', () => {
            const roomID = socketToRoom[socket.id]
            let room = users[roomID]
            if (room) {
                room = room.filter(id => id !== socket.id)
                users[roomID] = room
            }
            
            
        });

        socket.on('room', function (data) {
            socket.join(data.room);
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
            const lastOne = queueEvent.shift(queueEvent.length)

            socket.broadcast.to(data.room).emit('receive code', { code: lastOne.code });
        })

        socket.on('send users and code', function (data) {
            socket.broadcast.to(data.room).emit('receive users and code', data)
        })
        socket.on('clear code', function (data) {
            console.log(data, 'soy CLEAR CODE')
            socket.broadcast.to(data.room).emit('receive code', { code: data.code })
        })

        //CONFIG VIDEO
        socket.on("join room", roomID => {
            socket.emit("yourID", socket.id);
            users[roomID] ? users[roomID].push(socket.id) : users[roomID] = [socket.id];
            socketToRoom[socket.id] = roomID;
            const usersInThisRoom = users[roomID].filter(id => id !== socket.id);
            socket.emit("allUsers", usersInThisRoom)
            
        })

        socket.on("callUser", (data) => {
            io.to(data.userToCall).emit('hey', { signal: data.signalData, from: data.from });
        })

        socket.on("acceptCall", (data) => {
            io.to(data.to).emit('callAccepted', data.signal);
        })
    });


}