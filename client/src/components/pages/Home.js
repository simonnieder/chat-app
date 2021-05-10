import { useContext, useEffect } from "react";
import { Redirect, useParams } from "react-router";
import { SocketContext } from "../../Context/SocketContext";
import { UserContext } from "../../Context/UserContext";
import Chat from "../Chat"
import ChatTopBar from "../ChatTopBar"
import Sidebar from "../Sidebar"
import {BsArrowLeft} from "react-icons/bs"
const Home = ({ match }) => {
    const id = match.params.id;
    const [user] = useContext(UserContext);
    const socket = useContext(SocketContext);

    useEffect(()=>{
        if(!user) return;
        socket.emit("login", user);
    },[user]);

    if(!user){
        return <Redirect to="/login"></Redirect>
    }
    return (
        <div className="flex h-screen max-h-screen bg-blue-gray-50">
            <Sidebar id={id}></Sidebar>

            {id ?
            <div className="flex flex-col w-full items-center"> 
                <ChatTopBar id={id}></ChatTopBar>
                <Chat id={id}></Chat> 
            </div>:
            <div className="flex flex-col justify-center items-center w-full">
                <h1 className="text-2xl md:text-4xl font-roboto font-medium text-blue-gray-700 text-center mb-5">Click on a user to start chatting</h1>
                <BsArrowLeft className="text-6xl font-bold text-blue-gray-700"></BsArrowLeft>
            </div>
            }
        </div>
    )
}

export default Home
