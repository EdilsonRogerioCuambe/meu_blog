
import './App.css';
import Layout from './Layout';
import { Routes, Route, Router } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistroPage from './pages/RegistroPage';
import UserContextProvider from './userContext';
import Criar from './pages/Criar';
import PostagemPage from './pages/PostagemPage';
import EditarPostagem from './pages/EditarPostagem';

function App() {
    return (
        <UserContextProvider>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/registro' element={<RegistroPage />} />
                    <Route path='/criar-post' element={<Criar />} />
                    <Route path="/postagem/:id" element={<PostagemPage />} />
                    <Route path="/postagem/editar/:id" element={<EditarPostagem />} />
                </Route>
            </Routes>
        </UserContextProvider>
    );
}

export default App;
