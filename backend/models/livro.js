const mongoose = require('mongoose');
const livroScheme = mongoose.Schema({
    titulo: {type: String, required: true},
    autor: {type: String, required: true},
    paginas: {type: Number, required: false}
});


module.exports = mongoose.model('Livro', livroScheme)
