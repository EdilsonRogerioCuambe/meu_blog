const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UsuarioSchema = new Schema({
    nome: {
        type: String,
        required: true,
        min: 2,
        unique: true,
    },
    email: {
        type: String,
        min: 6,
        unique: true,
        required: true,
    },
    senha: {
        type: String,
        min: 4,
        required: true,
    },
    foto: String,
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const Usuario = model('Usuario', UsuarioSchema);

module.exports = Usuario;