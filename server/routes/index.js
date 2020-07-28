module.exports = app => {

    // Base URLS
    app.use('/', require('./base'))
    app.use('/auth', require('./auth'))
    app.use('/profile', require('./profile'))
    app.use('/question', require('./questions'))
    
    // CLOUDINARYCONFIG 
    app.use('/files', require('./file'))
    // TODO
}