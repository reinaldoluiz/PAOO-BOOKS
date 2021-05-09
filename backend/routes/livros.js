const express = require('express')
const Livro = require("../models/livro")
const router = express.Router();

router.post('', (req, res, next)=>{
  const livro = new Livro({
    titulo: req.body.titulo,
    autor: req.body.autor,
    paginas: req.body.paginas
  })
  livro.save().then(livroInserido => {
    res.status(201).json({
      mensagem: 'Livro inserido',
    id: livroInserido._id})
  })

})
router.get('/:id', (req, res)=>{
  Livro.findById(req.params.id).then(liv =>{
    if (liv)
      res.status(200).json(liv)
    else
      res.status(404).json({mensagem: 'Livro não encontrado'})
  })
})
router.get('', (req, res, next)=>{
  Livro.find().then(documents => {
    res.status(200).json({
      mensagem: "Tudo Ok",
      livros: documents
    })
  })
})

router.delete('/:id', (req, res)=>{
  Livro.deleteOne({_id: req.params.id}).then((resultado)=>{
    res.status(200).json({mensagem: 'Livro Removido'})
  })
})

router.put('/:id', (req, res, next)=>{
  const livro = new Livro({
    _id: req.params.id,
    titulo: req.body.titulo,
    autor: req.body.autor,
    paginas: req.body.paginas
  })
  Livro.updateOne({_id: req.params.id}, livro)
  .then((resultado)=>{
    res.status(200).json({mensagem: 'Atualização realizada com sucesso'})
  })
})

module.exports = router;
