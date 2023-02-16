import React, { useEffect, useContext, useState } from 'react';
import Postagem from '../Postagem';

const HomePage = () => {

    const [postagens, setPostagens] = useState([]);

    useEffect(() => {
        const response = fetch('http://localhost:4000/postagens').then(response => {
            response.json().then(postagens => {
                setPostagens(postagens);
            });
        });
    }, []);

    return (
        <>
            <section
                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 mb-16"
            >
                {postagens.length > 0 && postagens.map(postagem => {
                    return (
                        <Postagem
                            key={postagem._id}
                            _id={postagem._id}
                            titulo={postagem.titulo}
                            descricao={postagem.descricao}
                            conteudo={postagem.conteudo}
                            imagem={postagem.imagem}
                            createdAt={postagem.createdAt.split('T')[0].split('-').reverse().join('/')}
                            autor={postagem.autor}
                        />
                    )
                })}
            </section>
        </>
    )
}

export default HomePage;