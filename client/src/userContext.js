import { createContext, useState } from 'react';

export const userContext = createContext({});

const UserContextProvider = ({ children }) => {

    const [usuarioInfo, setUsuarioInfo] = useState({});

    return (
        <userContext.Provider value={{ usuarioInfo, setUsuarioInfo }}>
            {children}
        </userContext.Provider>
    );
};

export default UserContextProvider;
