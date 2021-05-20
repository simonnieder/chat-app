import { useContext, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import { SocketContext } from "../../Context/SocketContext";
import { UserContext } from "../../Context/UserContext";
import Chat from "../Chat"
import ChatTopBar from "../ChatTopBar"
import Sidebar from "../Sidebar"
import {BsArrowLeft} from "react-icons/bs"
import {useMediaQuery} from "react-responsive"
const Home = ({ match }) => {
    const id = match.params.id;
    const [user] = useContext(UserContext);
    const socket = useContext(SocketContext);
    const [refresh, setRefresh] = useState(false);
    const isBigScreen = useMediaQuery({minWidth: 640 })
    useEffect(()=>{
        if(!user) return;
        socket.emit("login", user);
    },[user]);
    
    if(!user){
        return <Redirect to="/login"></Redirect>
    }
    return (
        <div className="flex h-screen max-h-screen bg-blue-gray-50">
            {(!isBigScreen && !id) | isBigScreen ? <Sidebar isBigScreen={isBigScreen} id={id} refresh={refresh}></Sidebar> : <></>}
            {id &&
            <div className="flex flex-col w-full items-center"> 
                <ChatTopBar isBigScreen={isBigScreen} id={id}></ChatTopBar>
                <Chat id={id} refresh={()=>setRefresh(!refresh)}></Chat> 
            </div>
            }
            {isBigScreen && !id && 
            <div className="flex flex-col justify-center items-center w-full">
                <h1 className="text-2xl md:text-4xl font-roboto font-medium text-blue-gray-700 text-center m-5">Click on a user to start chatting!</h1>
                {/* <BsArrowLeft className="text-4xl md:text-6xl font-bold text-blue-gray-700"></BsArrowLeft> */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-24 md:w-24 text-blue-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
            </div>
            }
        </div>
    )
}

export default Home
