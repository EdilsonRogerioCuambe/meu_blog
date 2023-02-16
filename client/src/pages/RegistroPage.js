import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const RegistroPage = () => {

    const [foto, setFoto] = useState();
    const [preview, setPreview] = useState();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [redirecionar, setRedirecionar] = useState(false);

    useEffect(() => {
        if (!foto) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(foto)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [foto])

    const fotoSelecionada = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setFoto(undefined)
            return
        }

        setFoto(event.target.files[0])
    }

    const registro = async (event) => {

        const formData = new FormData();

        formData.append('nome', nome);
        formData.append('email', email);
        formData.append('senha', senha);
        formData.append('foto', foto);

        event.preventDefault();

        const response = await fetch('http://localhost:4000/registro', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            setRedirecionar(true);
        } else {
            alert(data.error);
        }
    }

    if (redirecionar) {
        return <Navigate to="/login" />
    }

    return (
        <div className="flex justify-center items-center h-full mb-16 font-mono">
            <div className="bg-slate-700 rounded-lg shadow-xl mt-16 p-10">
                <h1 className="text-2xl font-bold mb-4">Registro</h1>

                <form
                    onSubmit={registro}
                    encType='multipart/form-data'
                >
                    {
                        foto && (
                            <img
                                value={foto}
                                src={preview}
                                alt="Foto de perfil"
                                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                            />
                        )
                    }
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                            Foto de perfil
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="foto"
                            type="file"
                            onChange={fotoSelecionada}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                            Nome de usuário
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="nome"
                            type="text"
                            placeholder="Seu nome de usuário"
                            value={nome}
                            onChange={event => setNome(event.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Seu Email"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                            Senha
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Sua senha"
                            value={senha}
                            onChange={event => setSenha(event.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-400 hover:scale-110 transition duration-200 ease-in-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Registrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegistroPage;