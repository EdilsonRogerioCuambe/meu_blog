import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Editor from '../Editor';


const EditarPostagem = () => {

    const { id } = useParams();

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [imagem, setImagem] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [preview, setPreview] = useState('');
    const [redirecionar, setRedirecionar] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:4000/postagem/${id}`).then(response => {
            response.json().then(postagem => {
                setTitulo(postagem.titulo);
                setDescricao(postagem.descricao);
                setConteudo(postagem.conteudo);
            });
        });
    }, []);

    const atualizarPostagem = async (e) => {
        e.preventDefault();

        const data = new FormData();

        data.append('titulo', titulo);
        data.append('descricao', descricao);
        data.append('conteudo', conteudo);
        data.append('id', id);
        data.append('imagem', imagem);

        const response = await fetch(`http://localhost:4000/postagem/`, {
            method: 'PUT',
            body: data,
            credentials: 'include'
        });

        if (response.ok) {
            setRedirecionar(true);
        }
    }

    if (redirecionar) {
        return <Navigate to={`/postagem/${id}`} />
    }

    return (
        <>
            <div
                className="flex flex-col items-center justify-center w-full h-full"
                style={{

                }}
            >
                <form onSubmit={atualizarPostagem} className="flex flex-col items-center justify-center w-full h-full mb-10">
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
                                    onChange={setConteudo}
                                    value={conteudo}
                                />
                            </div>
                        </div>
                    </div>
                    <button type='submit' className="w-24 h-10 px-2 my-4 text-white bg-green-500 rounded-md hover:bg-purple-600 focus:outline-none">Atualizar</button>
                </form>
            </div>
        </>
    )
}

export default EditarPostagem;