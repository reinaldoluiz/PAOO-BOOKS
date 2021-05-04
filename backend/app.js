const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const Livro = require("./models/livro")

const userDB = process.env.MONGODB_USER
const passDB = process.env.MONGODB_PASSWORD
const clusterDB = process.env.MONGODB_CLUSTER
const nameDB = process.env.MONGODB_DATABASE

mongoose.connect(`mongodb+srv://${userDB}:${passDB}@${clusterDB}.mongodb.net/${nameDB}?retryWrites=true&w=majority`, {useNewUrlParser: true})
.then(()=>console.log('MongoDB: Conexao OK'))
.catch((erro)=> console.log('MongoDB: Conexao NO OK' + erro))

app.use(express.json())
app.use(cors())

app.post('/api/livros', (req, res, next)=>{
  const livro = new Livro({
    titulo: req.body.titulo,
    autor: req.body.autor,
    paginas: req.body.paginas
  })
  livro.save()
  res.status(201).json({mensagem: 'Livro inserido'})
})

app.get('/api/livros', (req, res, next)=>{
  Livro.find().then(documents => {
    res.status(200).json({
      mensagem: "Tudo Ok",
      livros: documents
    })
  })
})

module.exports = app;
