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

const homeworkModel = mongoose.model('projects', homeworkSchema);
console.log(homeworkModel)
const dbCunnect = async () => {
    await mongoose.connect('mongodb+srv://sudipta:ppmDbA0zQBnhgPBv@cluster0.yjaatuq.mongodb.net/sudipta?retryWrites=true&w=majority');
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

app.get("/user", async (req, res) => {
    const user = await homeworkModel.find();
    res.send(user)

})
app.get('/', (req, res) => {
    res.send('Hello world i am all user')
})

// app.get('/', (req, res) => {
//     res.send("Ami output")
// })

app.listen(PORT, async () => {
    await dbCunnect()
    console.log(`https://localhost run ${PORT}`)
})