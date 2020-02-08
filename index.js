const app = require('./bootstrap/app')
const routes = require('./routes/main')

require('dotenv').config()

app.use('/api/todo', routes)

console.log(`${process.env.URL}:${process.env.PORT}`)
app.listen(process.env.PORT)