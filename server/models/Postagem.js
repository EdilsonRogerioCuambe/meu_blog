const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const PostagemSchema = new Schema({
    titulo: String,
    descricao: String,
    imagem: String,
    conteudo: String,
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, {
    timestamps: true
});

const Postagem = model('Postagem', PostagemSchema);

module.exports = Postagem;