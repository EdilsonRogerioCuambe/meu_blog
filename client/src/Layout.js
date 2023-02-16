import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div
            className='bg-slate-600 mx-auto font-mono h-full'
        >
            <main className='p-4 m-auto max-w-7xl text-white'>
                <Header />
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout