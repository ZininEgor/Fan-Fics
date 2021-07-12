const express = require('express')
const config = require('config')
const mongoose = require('mongoose')


const app = express()
app.use(express.json({extended: true}))
app.use(express.static('client/build/'))
app.use('/api/profile', require('./routes/profile.routes'))
app.use('/api/fanfictions', require('./routes/fanfiction.routes'))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/comments', require('./routes/comments.routes'))
app.use('/api/fanfics', require('./routes/fanfics.all'))
app.use('/api/my-fanfiction', require('./routes/my-fanfics.routes'))
app.get('*', function (req, res) {
    const index = path.join(__dirname, 'build', 'index.html');
    res.sendFile(index);
});
const PORT = process.env.PORT || 5000

if (process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build/'))
}

async function start() {
    try {
        await mongoose.connect(config.get("mongoUri"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true
        })
        app.listen(PORT, () => console.log(`App has benn started on port ${PORT}...`))
    } catch (e) {
        console.log('Server internal error', e.message)
        process.exit(1)
    }
}


start()