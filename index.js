const app = require('./bootstrap/app')

require('dotenv').config()

app.listen(process.env.PORT)