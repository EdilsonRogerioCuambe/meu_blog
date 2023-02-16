import React, { useState, useContext } from 'react';
import { 
    Navigate,
} from 'react-router-dom';
import { userContext } from '../userContext';

const LoginPage = () => {

    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [rediciona, setRediciona] = useState(false);
    const { setUsuarioInfo } = useContext(userContext);

    const login = async (e) => {
        e.preventDefault();

        const body = JSON.stringify({
            nome,
            senha,
        });

        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body,
            credentials: 'include',
        });

        if (response.ok) {
            response.json().then((usuarioInfo) => {
                setUsuarioInfo(usuarioInfo);
                setRediciona(true);
            });
        } else {
            alert('Erro ao fazer login!');
        }
    }

    if (rediciona) {
        return <Navigate to='/' />
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-slate-700 rounded-lg shadow-lg p-10 mb-24">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <form
                    onSubmit={login}
                    encType='multipart/form-data'
                >
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Nome de usuário
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="nome"
                            type="text"
                            placeholder="Nome de usuário"
                            value={nome}
                            onChange={(e) => { setNome(e.target.value) }}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Senha
                        </label>
                        <input
                            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Sua senha"
                            value={senha}
                            onChange={(e) => { setSenha(e.target.value) }}
                        />
                        <p className="text-red-500 text-xs italic">Please choose a password.</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-400 hover:scale-110 transition duration-200 ease-in-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign In
                        </button>
                        <a
                            className="inline-block ml-3 align-baseline font-bold text-sm text-green-500 hover:text-purple-400"
                            href="#"
                        >
                            Esqueceu a sua senha?
                        </a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;