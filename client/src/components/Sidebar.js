import { useContext, useEffect, useState } from "react"
import { UserContext } from "../Context/UserContext"
import Avatar from "./Avatar"
import Button from "./Button"
import Conversations from "./Conversations"
import Input from "./Input"
import TabSwitcher from "./TabButton"
import User from "./User"
import Users from "./Users"
const Sidebar = ({id}) => {
    const [mode, setMode] = useState("conversations");
    const [search, setSearch] = useState("");
    const [user, setUser] = useContext(UserContext);
    const logout = ()=>{
        document.cookie = "connect.sid = ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
        setUser(undefined);
    }

    useEffect(() => {
        setSearch("")
    }, [mode])
    return (
        <div className="max-w-sm w-full bg-gray-200 space-y-2 relative">
            <div className="flex items-center justify-between h-20 px-5 border-b border-gray-300">
                <div className="flex items-center">
                    <Avatar username={user}></Avatar>
                    <span className=" text-gray-700 font-roboto font-medium text-3xl ml-3">{user}</span>
                </div>
                <Button outlined onClick={logout}>logout</Button>
            </div>
            <div className="space-y-3 p-5 flex flex-col">
                <div className="flex items-center justify-center space-x-2">                
                    <TabSwitcher mode={"conversations"} currentMode={mode} onClick={()=>setMode("conversations")}></TabSwitcher>
                    <TabSwitcher mode={"users"} currentMode={mode} onClick={()=>setMode("users")}></TabSwitcher>
                </div>
                <Input value={search} onChange={setSearch} placeholder={mode === "conversations" ? "Search for conversations" : "Search for users"}></Input>
                <div>
                    {mode === "conversations" ? 
                    <Conversations id={id} search={search}></Conversations>: 
                    <Users id={id} search={search}></Users>}
                </div>
            </div>
        	

        </div>
    )
}

export default Sidebar
   