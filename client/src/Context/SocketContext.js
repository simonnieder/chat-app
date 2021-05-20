import { createContext, useContext, useEffect, useReducer, useState } from "react"
import io from "socket.io-client"
export const SocketContext = createContext();

export function useSocket() {
    return useContext(SocketContext)
}
export const SocketProvider = (props) => {
    const [socket, setSocket] = useState(undefined);
    useEffect(() => {
        const newSocket = io(
            'http://localhost:5000',
          )
          setSocket(newSocket)
          return () => newSocket.close()
      }, [])
    

    return (
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
    )
}
