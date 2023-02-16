import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { userContext } from '../userContext';
import { Link } from 'react-router-dom';

const PostagemPage = () => {

    const [postagem, setPostagem] = useState(null);

    const { id } = useParams();

    const {usuarioInfo} = useContext(userContext);

    useEffect(() => {
        fetch(`http://localhost:4000/postagem/${id}`)
            .then(response => {
                response.json().then(data => {
                    setPostagem(data);
                })
            })
    }, []);

    if (!postagem) {
        return (
            <div
                className="flex justify-center items-center h-screen text-2xl font-bold text-white"
            >Nenhuma postagem encontrada</div>
        )
    }

    const handleDelete = (id) => {
        fetch(`http://localhost:4000/postagem/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        })
            .then(response => {
                if (response.ok) {
                    window.location.href = '/';
                }
            })
    }
    

    return (
        <div className="h-full max-w-7xl mx-auto mb-10 font-mono">
            <div
                className="flex justify-center items-center"
            >
                <img src={`http://localhost:4000/${postagem.imagem}`} alt="Imagem da postagem" className="w-full object-cover h-60 mt-7 mb-3" />

            </div>
            <h1 className="text-2xl font-bold text-green-400">{postagem.titulo}</h1>
            <p className="text-md text-white">{postagem.descricao}</p>

            <div className="flex justify-between items-center mt-7">
                <div className="flex items-center">
                    <img src={`http://localhost:4000/${postagem.autor.foto}`} alt="Foto de perfil do autor" className="w-12 h-12 rounded-full object-cover" />
                    <div className="ml-4">
                        <p className="text-green-400 font-bold">Escrito por: {postagem.autor.nome}</p>
                        <p className="text-blue-400">{postagem.autor.email}</p>
                    </div>
                    {
                        usuarioInfo?.id === postagem.autor.id && (
                            <div 
                                className="flex items-center ml-4 text-md font-bold"
                                >
                                <Link to={`/postagem/editar/${postagem._id}`} className="text-orange-300 hover:text-purple-400 border-2 px-3 rounded-sm border-blue-400 mr-3">
                                    Editar
                                </Link>
                                <a onClick={() => handleDelete(postagem._id)} className="text-red-400 hover:text-purple-400 cursor-pointer pl-4 border-2 px-3 roundedsm border-blue-400">
                                    Deletar
                                </a>
                            </div>
                        )
                    }
                </div>
                <p className="text-green-400">{postagem.createdAt.split('T')[0].split('-').reverse().join('/')}</p>
            </div>
            <p dangerouslySetInnerHTML={{ __html: postagem.conteudo }} className="text-white text-xl mt-7"></p>
        </div>
    )
}

export default PostagemPage;