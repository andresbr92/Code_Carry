



module.exports = (io) => {

    

    const users = {}
    const socketToRoom = {}

    io.on('connection', (socket) => {
        // console.log('a user connected');

        socket.on('disconnect', () => {
            const roomID = socketToRoom[socket.id];
            let room = users[roomID];
            if (room) {
                room = room.filter(id => id !== socket.id);
                users[roomID] = room;
            }
            
            
        });

        socket.on('room', function (data) {
            //console.log('in joining room in SERVER')
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
            
            if (users[roomID]) {


                users[roomID].push(socket.id)
                console.log(users, 'SOY USERS EN EL IF')

            } else {

                users[roomID] = [socket.id];
                console.log (users, 'soy los users en el ELSE')
            }
            socketToRoom[socket.id] = roomID;
            console.log(socketToRoom, '<====================================')
            console.log(users[roomID], ' SOY LOS USERS[ROOMID]' )
             const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

            console.log (users[roomID], 'SOY LOS USUARIOS ACTUALES EN LA ROOM')
            socket.emit("allUsers", usersInThisRoom[0])
            console.log (users)
        })





        //io.sockets.emit("allUsers", users);




        

        socket.on("callUser", (data) => {
            io.to(data.userToCall).emit('hey', { signal: data.signalData, from: data.from });
        })

        socket.on("acceptCall", (data) => {
            io.to(data.to).emit('callAccepted', data.signal);
        })
    });


}