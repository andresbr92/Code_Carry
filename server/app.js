require('dotenv').config()

// Database
require('./configs/mongoose.config')

// Debugger
require('./configs/debugger.config')

// App
const express = require('express')
const socketio = require('socket.io')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = socketio(server)

//CONFIGURACION DE IO
io.on('connection', (socket) => {
    console.log('new connection')
    
    socket.on('disconnetc', () => {
        console.log('user has left')
    })
})







// Configs
require('./configs/preformatter.config')(app)
require('./configs/middleware.config')(app)
require('./configs/passport.config')(app)
require('./configs/views.configs')(app)
require('./configs/locals.config')(app)

// Routes index
require('./routes')(app)

module.exports = app
