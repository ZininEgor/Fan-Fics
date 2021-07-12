const express = require('express')
const config = require('config')
const mongoose = require('mongoose')


const server = express()
server.use(express.json({extended: true}))
server.use('/api/profile', require('./routes/profile.routes'))
server.use('/api/fanfictions', require('./routes/fanfiction.routes'))
server.use('/api/auth', require('./routes/auth.routes'))
server.use('/api/comments', require('./routes/comments.routes'))
server.use('/api/fanfics', require('./routes/fanfics.all'))
server.use('/api/my-fanfiction', require('./routes/my-fanfics.routes'))
const PORT = process.env.PORT || 8080

if (process.env.NODE_ENV === 'production'){
    server.use(express.static('client/build/'))
}

async function start() {
    try {
        await mongoose.connect(config.get("mongoUri"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true
        })
        server.listen(PORT, () => console.log(`App has benn started on port ${PORT}...`))
    } catch (e) {
        console.log('Server internal error', e.message)
        process.exit(1)
    }
}


start()