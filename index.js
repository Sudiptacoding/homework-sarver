require('dotenv').config()
var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const PORT = process.env.PORT





app.get('/', function (req, res) {
    res.send('hello world')
})

app.listen(PORT, () => {
    console.log(`https://localhost run ${PORT}`)
})