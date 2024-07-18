import React, { createContext, useMemo, useContext } from "react";
import { io } from "socket.io-client"

const SocketContext = createContext(null);

export const useSocketContext = () => {
    const context = useContext(SocketContext);
    if (context === undefined) {
        throw new Error('useSocketContext must be used within a SocketContextProvider');
    }
    return context;
}

export const SocketContextProvider = (props) => {
    const socket = useMemo(() => 
        io(`http://localhost:8001`), []);
    console.log(socket);
    return (
        <SocketContext.Provider value={{socket}}>
            {props.children}
        </SocketContext.Provider>
    )
}
