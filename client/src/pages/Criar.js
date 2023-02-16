import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./Criar.css";
import { Navigate } from 'react-router-dom';
import Editor from '../Editor';

const Criar = () => {

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [imagem, setImagem] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [preview, setPreview] = useState('');
    const [redirecionar, setRedirecionar] = useState(false);

    useEffect(() => {
        if (imagem) {
            const objectUrl = URL.createObjectURL(imagem);
            setPreview(objectUrl);
        }

        return () => URL.revokeObjectURL(preview);
    }, [imagem]);

    const imagemSelecionada = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setImagem(undefined);   
            return;
        }

        setImagem(e.target.files[0]);
    }

    const criarPostagem = async (e) => {
        e.preventDefault();

        const data = new FormData();

        data.append('titulo', titulo);
        data.append('descricao', descricao);
        data.append('imagem', imagem);
        data.append('conteudo', conteudo);

        const response = await fetch('http://localhost:4000/criar-post', {
            method: 'POST',
            body: data,
            credentials: 'include'
        });
        if (response.ok) {
            setRedirecionar(true);
        }
    }

    if (redirecionar) {
        return <Navigate to="/" />
    }

    return (
        <>
            <div
                className="flex flex-col items-center justify-center w-full h-full"
                style={{

                }}
            >
                <form onSubmit={criarPostagem} className="flex flex-col items-center justify-center w-full h-full mb-10">
                    <div className="flex flex-col items-center justify-center w-full h-full">
                        <h1 className="text-3xl font-bold text-white my-3">Criar uma nova postagem</h1>
                        <div className="flex flex-col items-center justify-center w-full h-full">
                            <input
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                type="text"
                                placeholder="Título"
                                className="w-full h-10 px-2 my-2 text-black border-2 border-gray-400 rounded-md focus:outline-none focus:border-purple-500"
                            />
                            <input
                                type="text"
                                placeholder="Descrição" className="w-full h-10 px-2 my-2 text-black border-2 border-gray-400 rounded-md focus:outline-none focus:border-purple-500"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                            />
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 my-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="foto"
                                type="file"
                                onChange={(e) => setImagem(e.target.files[0])}
                            />
                            <div className="w-full">
                                <Editor 
                                    value={conteudo}
                                    onChange={setConteudo}
                                />
                            </div>
                        </div>
                    </div>
                    <button type='submit' className="w-24 h-10 px-2 my-4 text-white bg-green-500 rounded-md hover:bg-purple-600 focus:outline-none">Publicar</button>
                </form>
            </div>
        </>
    )
}

export default Criar;