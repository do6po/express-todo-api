const express = require('express')
const app = express()
const path = require('path')
const routes = require('../routes/main')

const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath))
app.use(express.json())

app.use('/api/todo', routes)

const index = path.resolve(publicPath, 'index.html')

app.use((req, res, next) => {
    res.sendFile(index)
})

module.exports = app
