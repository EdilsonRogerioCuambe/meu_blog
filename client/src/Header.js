import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from './userContext';

const Header = () => {

    const { setUsuarioInfo, usuarioInfo } = useContext(userContext);
    const [rediciona, setRediciona] = useState(false);

    useEffect(() => {
        fetch('http://localhost:4000/perfil', {
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                setUsuarioInfo(data);
            });
    }, []);

    const logout = () => {
        fetch('http://localhost:4000/logout', {
            method: 'POST',
            credentials: 'include',
        })
        setUsuarioInfo(null);
        setRediciona(true);
    }

    if (rediciona) {
        window.location.href = '/';
    }

    const nomeUsuario = usuarioInfo?.nome;
    const fotoPerfil = usuarioInfo.foto;

    return (
        <header className='flex justify-between items-center bg-slate-700 p-4 rounded-md'>
            <Link to='/' className='text-2xl font-bold text-white hover:text-purple-400'>
                Blog
            </Link>
            <nav
                className='flex space-x-4'
            >
                {nomeUsuario && (
                    <>
                        <div className='justify-between items-center flex'>
                            <Link to="/criar-post" className="text-green-400 hover:text-purple-400">
                                Criar
                            </Link>
                            <a onClick={logout} className="text-red-400 hover:text-purple-400 cursor-pointer pl-4">
                                Sair
                            </a>
                            <Link to="/perfil" className="hover:text-purple-400 pl-4">
                                <img
                                    src={fotoPerfil}
                                    alt="Foto de Perfil"
                                    className="w-12 h-12 rounded-full hover:scale-110 transition-all duration-300 object-cover"
                                />
                            </Link>
                        </div>
                    </>
                )}

                {
                    !nomeUsuario && (
                        <>
                            <Link to="/registro" className="hover:text-purple-400">
                                Registrar
                            </Link>
                            <Link to="/login" className="hover:text-purple-400">
                                Login
                            </Link>
                        </>
                    )
                }
            </nav>
        </header>
    )
}

export default Header;