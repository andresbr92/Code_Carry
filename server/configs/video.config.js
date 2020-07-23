require('dotenv').config();

const http = require("http");

const server = http.createServer();
const socket = require("socket.io");
const io = socket(server);

const users = {};

const socketToRoom = {};

io.on('connection', socket => {
    socket.on("join room", video_id => {
        if (users[video_id]) {
            const length = users[video_id].length;
            if (length === 2) {
                socket.emit("room full");
                return;
            }
            users[video_id].push(socket.id);
        } else {
            users[video_id] = [socket.id];
        }
        socketToRoom[socket.id] = video_id;
        const usersInThisRoom = users[video_id].filter(id => id !== socket.id);

        socket.emit("all users", usersInThisRoom);
    });

    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    socket.on('disconnect', () => {
        const video_id = socketToRoom[socket.id];
        let room = users[video_id];
        if (room) {
            room = room.filter(id => id !== socket.id);
            users[video_id] = room;
        }
    });

});

server.listen(6000, () => console.log('serverVIDEO is running on port 7000'));


