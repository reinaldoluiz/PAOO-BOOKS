const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const livroRoutes = require('./routes/livros')

const userDB = process.env.MONGODB_USER
const passDB = process.env.MONGODB_PASSWORD
const clusterDB = process.env.MONGODB_CLUSTER
const nameDB = process.env.MONGODB_DATABASE

mongoose.connect(`mongodb+srv://${userDB}:${passDB}@${clusterDB}.mongodb.net/${nameDB}?retryWrites=true&w=majority`, {useNewUrlParser: true})
.then(()=>console.log('MongoDB: Conexao OK'))
.catch((erro)=> console.log('MongoDB: Conexao NO OK' + erro))

app.use(express.json())
app.use(cors())

app.use('/api/livros', livroRoutes)

module.exports = app
