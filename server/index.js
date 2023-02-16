const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path');

const secret = 'asjkndakdsndlansdafamnfasdabkdb';

const salt = bcrypt.genSaltSync(10);

const upload = multer({
    dest: 'uploads/',
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});

const Usuario = require('./models/Usuario');
const Postagem = require('./models/Postagem');

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.urlencoded({
    extended: true,
}));
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(express.json({
    limit: '50mb',
}));

mongoose.set('strictQuery', false);

mongoose.connect('mongodb+srv://Edilson:0eedFiC8Kpbsi2X0@cluster0.ty9b7ez.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.post('/registro', upload.single('foto'), async (req, res) => {
    const { nome, email, senha } = req.body;
    const foto = req.file.path;

    const usuario = new Usuario({
        nome,
        email,
        senha: bcrypt.hashSync(senha, salt),
        foto
    });

    try {
        const usuarioSalvo = await usuario.save();
        res.status(200).json('Usuário registrado com sucesso!');
        res.json(usuarioSalvo);
    } catch (error) {
        res.status(400).json(error);
    }
});

app.post('/login', async (req, res) => {
    const { nome, senha } = req.body;
    const usuarioDoc = await Usuario.findOne({ nome });

    if (!usuarioDoc) {
        res.status(400).json({ message: 'Usuário não encontrado!' });
    }

    const senhaOk = bcrypt.compareSync(senha, usuarioDoc.senha);

    if (senhaOk) {
        jwt.sign({ id: usuarioDoc._id }, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({
                id: usuarioDoc._id,
                nome: usuarioDoc.nome,
                email: usuarioDoc.email,
                foto: usuarioDoc.foto
            });
        });
    } else {
        res.status(400).json('Senha incorreta!');
    }
});

app.get('/perfil', async (req, res) => {

    const { token } = req.cookies;

    if (!token) {
        res.status(401).json('Usuário não autenticado!');
    }

    try {
        const decoded = jwt.verify(token, secret);
        const usuarioDoc = await Usuario.findOne({ _id: decoded.id });

        const foto = fs.readFileSync(path.join(__dirname, usuarioDoc.foto));
        const fotoBase64 = foto.toString('base64');

        res.json({
            nome: usuarioDoc.nome,
            email: usuarioDoc.email,
            foto: `data:image/png;base64,${fotoBase64}`
        });

    } catch (error) {
        // if (error.name === "jsonwebtoken") {
        //     res.status(401).json('Usuário não autenticado!');
        // } else {
        //     res.status(400).json(error);
        // }
    }
});

app.post("/criar-post", upload.single("imagem"), async (req, res) => {
    const { originalname, path } = req.file;
    const partes = originalname.split(".");
    const extensao = partes[partes.length - 1];

    fs.renameSync(path, path + "." + extensao);

    const { token } = req.cookies;

    if (!token) {
        res.status(401).json({ message: 'Usuário não autenticado!' });
    }

    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;

        const { titulo, descricao, conteudo } = req.body;

        const postagem = await Postagem.create({
            titulo,
            descricao,
            imagem: path + "." + extensao,
            conteudo,
            autor: info.id
        });
        res.json(postagem);
    });

});

app.get("/postagens", async (req, res) => {
    const postagens = await Postagem.find()
        .sort({ createdAt: -1 })
        .populate("autor", ["nome", "foto"])
        .limit(10);
    res.json(postagens);
});

app.get("/postagem/:id", async (req, res) => {
    const { id } = req.params;
    const postagem = await Postagem.findById(id).populate("autor", ["nome", "foto"]);
    res.json(postagem);
});

app.put("/postagem", upload.single("imagem"), async (req, res) => {
    let novaImagem = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const partes = originalname.split(".");
        const extensao = partes[partes.length - 1];
        novaImagem = path + "." + extensao;
        fs.renameSync(path, novaImagem);
    }

    const { token } = req.cookies;

    if (!token) {
        res.status(401).json({ message: 'Usuário não autenticado!' });
    }

    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;

        const { id, titulo, descricao, conteudo } = req.body;

        const postagem = await Postagem.findById(id);

        const usuario = JSON.stringify(postagem.autor) === JSON.stringify(info.id);

        if (!usuario) {
            res.status(401).json({ message: 'Usuário não autorizado!' });
        }

        await postagem.updateOne({
            titulo,
            descricao,
            imagem: novaImagem ? novaImagem : postagem.imagem,
            conteudo
        });

        res.json(postagem);

    });
});

app.post('/logout', (req, res) => {
    res.clearCookie('token').json('Usuário deslogado com sucesso!');
});

app.listen(4000, () => {
    console.log('Listening');
});



// if (!token) {
//     res.status(401).json({ message: 'Usuário não autenticado!' });
// }

// jwt.verify(token, secret, async (err, decoded) => {
//     if (err) throw err;
//     const usuarioDoc = await Usuario.findById(decoded.id);

//     const foto = fs.readFileSync(path.join(__dirname, usuarioDoc.foto));
//     const fotoBase64 = foto.toString('base64');

//     res.json({
//         nome: usuarioDoc.nome,
//         email: usuarioDoc.email,
//         foto: `data:image/png;base64,${fotoBase64}`
//     });
// });
