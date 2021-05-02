import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../Context/UserContext";
import User from "./User";
const { REACT_APP_API_ENDPOINT } = process.env;
const Users = ({id, search}) => {
    const [user] = useContext(UserContext);
    const [users, setUsers] = useState();
    const [defaultUsers, setDefaultUsers] = useState();

    useEffect(()=>{
        axios.get(`${REACT_APP_API_ENDPOINT}/user/${user}`).then((res)=>{
            setUsers(res.data)
            setDefaultUsers(res.data)
        })
    },[])
    useEffect(()=>{
        if(!defaultUsers) return;
        setUsers(defaultUsers.filter((user)=> user.username.toLowerCase().includes(search.toLowerCase())))
    },[search])
    return (
        <div className="space-y-1">
            {users && users.map((user)=> <User active={id === user.username} username={user.username}></User>)}
        </div>
    )
}

export default Users
