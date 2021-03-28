const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

const livros = [
  {
    id: 158,
    titulo: '1984',
    autor: 'George Orwell',
    paginas: 150
  },
  {
    id: 18,
    titulo: 'Animal farms',
    autor: 'George Orwell',
    paginas: 100
  }
]

app.post('/api/livros', (req, res, next)=>{
  const livro = req.body
  res.status(201).json({mensagem: 'Livro inserido'})
})

app.get('/api/livros', (req, res, next)=>{
  res.status(200).json({
    mensagem: 'Tudo OK',
    livros: livros
  })
})

module.exports = app;
