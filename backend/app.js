const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const Livro = require("./models/livro")
const env = require('./env')

const dbName = "db_livros"

mongoose.connect(`mongodb+srv://paoo:${env.mongoPassword}@livros.uglfp.mongodb.net/${dbName}?retryWrites=true&w=majority`, {useNewUrlParser: true})
.then(()=>console.log('MongoDB: Conexao OK'))
.catch(()=> console.log('MongoDB: Conexao NO OK'))

app.use(express.json())
app.use(cors())

const livros = [
  {
    titulo: '1984',
    autor: 'George Orwell',
    paginas: 150
  },
  {
    titulo: 'Animal farms',
    autor: 'George Orwell',
    paginas: 100
  }
]

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
