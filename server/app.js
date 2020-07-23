require('dotenv').config()

// Database
require('./configs/mongoose.config')

// Debugger
require('./configs/debugger.config')

// App
const express = require('express')
const app = express()

//CONFIGURACION DE SOCKET 00000000000000000000000000000000000000000000000000
















//============================================================================

// Configs
//require('./configs/videoPrueba')
require('./configs/mySocket.config')
require('./configs/socket.config')
require('./configs/videoPrueba')
require('./configs/preformatter.config')(app)
require('./configs/middleware.config')(app)
require('./configs/passport.config')(app)
require('./configs/views.configs')(app)
require('./configs/locals.config')(app)

// Routes index
require('./routes')(app)

module.exports = app
