import { useContext, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import { SocketContext } from "../../Context/SocketContext";
import { UserContext } from "../../Context/UserContext";
import Chat from "../Chat"
import axios from "axios";
import ChatTopBar from "../ChatTopBar"
import Sidebar from "../Sidebar"
import {useMediaQuery} from "react-responsive"
const { REACT_APP_API_ENDPOINT } = process.env;
const Home = ({ match }) => {
    const id = match.params.id;
    const [user, setUser] = useContext(UserContext);
    const [currentChat, setCurrentChat] = useState([]);
    const socket = useContext(SocketContext);
    const [refresh, setRefresh] = useState(false);
    const isBigScreen = useMediaQuery({minWidth: 640 });

    
    useEffect(()=>{
        axios.get(`${REACT_APP_API_ENDPOINT}/chat/${user.username}/${id}`).then((res)=>{
            setCurrentChat(res.data);
        }).catch((err)=>{
            setCurrentChat([]);
        })
    },[id]);

    useEffect(()=>{
        console.log(id);
    },[id]);
    
    useEffect(()=>{
        if(!user || !socket) return;
        socket.emit("login", user.username, (error)=>{});

        socket.on("incoming-message", (message)=>{
            console.log("inc message", message);
            if(message.from === id && message.to === user.username || message.from === user.username && message.to === id){
                console.log("added msg")
                setCurrentChat((chat)=>[...chat, message]);
            }
            setRefresh((refresh)=>!refresh);
        });
        return () =>{
            socket.off("incoming-message");
        }
    },[user,socket,id]);
    
    if(!user.username && !user.loading){
        return <Redirect to="/login"></Redirect>
    }

    return (
        <div className="flex h-screen max-h-screen bg-blue-gray-50">
            {(!isBigScreen && !id) | isBigScreen ? <Sidebar isBigScreen={isBigScreen} id={id} refresh={refresh}/> : <></>}
            {id &&
            <div className="flex flex-col w-full items-center"> 
                <ChatTopBar isBigScreen={isBigScreen} id={id}></ChatTopBar>
                <Chat id={id} refresh={()=>setRefresh(!refresh)} chat={currentChat}></Chat> 
            </div>
            }
            {isBigScreen && !id && 
            <div className="flex flex-col justify-center items-center w-full">
                <h1 className="text-2xl md:text-4xl font-roboto font-medium text-blue-gray-700 text-center m-5">Click on a user to start chatting!</h1>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-20 md:w-20 text-blue-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
            </div>
            }
        </div>
    )
}

export default Home
