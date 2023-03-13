require('dotenv').config()
const mongoose = require('mongoose');
var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const PORT = process.env.PORT || 4000

// db cunnect


const homeworkSchema = new mongoose.Schema({
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

const homeworkModel = mongoose.model('project', homeworkSchema);
console.log(homeworkModel)
const dbCunnect = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/homework');
    console.log('Db cunnect sucessfully')
}


app.post('/user', async (req, res) => {
    try {
        const user = req.body;
        const newUser = new homeworkModel({
            name: user.name,
            age: user.age
        })
        const saveUser = await newUser.save()
    } catch (error) {
        console.log(error)
    }
})

app.get("/userlist", async (req, res) => {
    try {
        const user = await homeworkModel.find();
        if (user) {
            res.status(200).send(user)
        } else {
            res.status(404).send("User not found")
        }
    } catch (error) {
        res.status(502).send(error)
    }
})

app.get('/', (req, res) => {
    res.send("Ami output")
})

app.listen(PORT, async () => {
    await dbCunnect()
    console.log(`https://localhost run ${PORT}`)
})