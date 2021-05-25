import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { SocketContext } from "../Context/SocketContext";
import { UserContext } from "../Context/UserContext";
import User from "./User";
const { REACT_APP_API_ENDPOINT } = process.env;
const Users = ({id, search}) => {
    const [user] = useContext(UserContext);
    const [users, setUsers] = useState();
    const [defaultUsers, setDefaultUsers] = useState();
    const socket = useContext(SocketContext);

    useEffect(()=>{
        axios.get(`${REACT_APP_API_ENDPOINT}/user/userlist/${user.username}`).then((res)=>{
            setUsers(res.data)
            setDefaultUsers(res.data)
        })
    },[])

    useEffect(()=>{
        if(!socket) return;
        socket.on("user-state-change", (user)=>{
            setUsers((users)=>{
                if(!users)return [];
                const currentUser = users.find((u)=>u.username===user.username);
                const returnUsers = users.filter((u)=>u.username !== user.username);
                return [{...currentUser, online: user.online},...returnUsers];
            })
            setDefaultUsers((users)=>{
                if(!users)return [];
                const currentUser = users.find((u)=>u.username===user.username);
                const returnUsers = users.filter((u)=>u.username !== user.username);
                return [{...currentUser, online: user.online},...returnUsers];
            })
        });
        return () =>{
            socket.off("user-state-change");
        }
    },[socket]);

    useEffect(()=>{
        if(!defaultUsers) return;

        setUsers(defaultUsers.filter((user)=> user.username.toLowerCase().includes(search.toLowerCase())))
    },[search])
    return (
        <div className="space-y-1 scroll pb-1" >
            {users?.length ? users.map((user)=> <User key={user.id} online={user.online} active={id === user.username} user={user}></User>): <p className="text-center text-blue-gray-700 font-roboto font-medium text-md ">No users found!</p>}
        </div>  
    )
}

export default Users
