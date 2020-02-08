const app = require('./bootstrap/app')
const routes = require('./routes/main')
const sequelize = require('./bootstrap/database')

require('dotenv').config()

app.use('/api/todo', routes)

async function start() {
    try {
        await sequelize.sync()
        app.listen(process.env.PORT)
        console.log(`${process.env.URL}:${process.env.PORT}`)
    } catch (e) {
        console.log(e)
    }
}

start()