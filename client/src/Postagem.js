import React from 'react';
import info from "./assets/info-1.jpg";
import { Link } from 'react-router-dom';

const Postagem = ({
    titulo,
    descricao,
    imagem,
    createdAt,
    autor,
    _id
}) => {
    return (
        <div
            // className="bg-white shadow-md rounded-md overflow-hidden max-w-sm mx-auto my-4"
            className="group object-cover rounded-md shadow-md max-w-sm mx-auto bg-slate-700 hover:shadow-3xl transition duration-200 transform hover:scale-105 ease-out cursor-pointer"
        >
            <Link to={`/postagem/${_id}`}>
                <div className="p-3">
                    <img
                        src={`http://localhost:4000/${imagem}`}
                        alt="Imagem do post"
                        className="w-full h-64 object-cover rounded-md"
                    />
                    <div className='mt-3 mb-3 align-middle'>
                        <img
                            src={`http://localhost:4000/${autor.foto}`}
                            alt="Postado por: Fulano"
                            className="w-12 h-12 rounded-full object-cover float-left mr-2 mt-1"
                        />
                        <p className="text-sm text-green-400">Postado por: {autor.nome}</p>
                        <p className="text-sm text-blue-400">Publicado em: {createdAt}</p>
                    </div>
                    <h2 className="text-2xl font-bold text-purple-400">
                        {titulo}
                    </h2>
                    <p className="text-sm">{descricao}</p>
                </div>
            </Link>
        </div>
    )
}

export default Postagem;