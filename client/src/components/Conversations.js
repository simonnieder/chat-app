import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { SocketContext } from "../Context/SocketContext";
import { UserContext } from "../Context/UserContext";
import User from "./User";
const { REACT_APP_API_ENDPOINT } = process.env;
const Conversations = ({id, search}) => {
    const [user] = useContext(UserContext);
    const [users, setUsers] = useState();
    const socket = useContext(SocketContext);
    const [defaultUsers, setDefaultUsers] = useState();

    useEffect(()=>{
        axios.get(`${REACT_APP_API_ENDPOINT}/user/conversations/${user}`).then((res)=>{
            setDefaultUsers(res.data);  
            setUsers(res.data);
        });
    },[])

    useEffect(()=>{
        if(!socket) return;
        socket.on("user-leave", (username)=>{
        });
        return () =>{
            socket.off("user-leave");
        }
    },[socket]);

    useEffect(()=>{
        if(!defaultUsers) return;
        setUsers(defaultUsers.filter((user)=> user.username.toLowerCase().includes(search.toLowerCase())))
        console.log(users)
    },[search])

    return (
        <div className="overflow-auto flex flex-1 flex-col overflow-x-hidden pb-1">
            {users?.length > 0 ? users.sort((a,b)=> b.id - a.id).map((user)=> <User active={user.username === id} online={user.online} user={user}></User>) : <p className="text-center text-blue-gray-700 font-roboto font-medium text-md ">No users found!</p> }
        </div>
    )
}

export default Conversations
