import { useContext, useEffect, useState } from "react"
import Message from "./Message";

import Inputbar from "./Inputbar";
import { SocketContext } from "../Context/SocketContext";
import { UserContext } from "../Context/UserContext";
import axios from "axios";
const { REACT_APP_API_ENDPOINT } = process.env;
const Chat = ({id, refresh}) => {
    const [chat, setChat] = useState([]);
    const socket = useContext(SocketContext);
    const [user, setUser] = useContext(UserContext);
    useEffect(()=>{
        if(!socket) return;
        socket.on("incoming-message", (message)=>{
            setChat((chat)=>[...chat, message]);
            refresh();
        });
        return () =>{
            socket.off("incoming-message");
        }
    },[socket, id]);

    useEffect(()=>{
        axios.get(`${REACT_APP_API_ENDPOINT}/chat/${user}/${id}`).then((res)=>{
            setChat(res.data);
        }).catch((err)=>{
            setChat([]);
        })
    },[id])

    return (
        <div className="flex flex-col w-full max-w-3xl flex-1 min-h-0 px-1">
            <div className="overflow-auto scroll flex flex-1 flex-col-reverse overflow-x-hidden">
                {chat && chat.slice().reverse().map((message, index)=>{
                    return (<Message message={message} ownMessage={user === message.from} key={index}>{message.content}</Message>);
                })}
                {chat.length === 0 && <h1 className="text-center text-xl font-roboto text-gray-500">Type your first message!</h1>}
            </div>
            <Inputbar id={id}></Inputbar>
        </div>
    )
}

export default Chat
