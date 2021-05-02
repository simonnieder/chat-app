import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../Context/UserContext";
import User from "./User";
const { REACT_APP_API_ENDPOINT } = process.env;
const Conversations = ({id, search}) => {
    const [user] = useContext(UserContext);
    const [users, setUsers] = useState();
    const [defaultUsers, setDefaultUsers] = useState();

    useEffect(()=>{
        axios.get(`${REACT_APP_API_ENDPOINT}/user/conversations/${user}`).then((res)=>{
            setUsers(res.data)
            setDefaultUsers(res.data)
        });
    },[])

    useEffect(()=>{
        if(!defaultUsers) return;
        setUsers(defaultUsers.filter((user)=> user.username.toLowerCase().includes(search.toLowerCase())))
    },[search])
    return (
        <div className="overflow-auto flex flex-1 flex-col overflow-x-hidden space-y-1">
            {users ? users.map((user)=> <User active={user.username === id} username={user.username}></User>) : <p>Hirtensepp</p>}
        </div>
    )
}

export default Conversations
