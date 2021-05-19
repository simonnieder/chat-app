import { AnimateSharedLayout } from "framer-motion"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../Context/UserContext"
import Avatar from "./Avatar"
import Button from "./Button"
import Conversations from "./Conversations"
import Input from "./Input"
import TabSwitcher from "./TabButton"
import Users from "./Users"
const Sidebar = ({id, isBigScreen, refresh}) => {
    const [mode, setMode] = useState("conversations");
    const [search, setSearch] = useState("");
    const [user, setUser] = useContext(UserContext);
    const logout = ()=>{
        document.cookie = "connect.sid = ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
        setUser(undefined);
    }

    useEffect(() => {
        setSearch("")
    }, [mode, refresh])
    return (
        <div className={`${isBigScreen && "max-w-xs"} w-full bg-blue-gray-500 bg-opacity-10 space-y-2 flex flex-col`}>
            <div className="flex items-center justify-between h-20 px-5 border-b border-gray-300 flex-shrink-0">
                <div className="flex items-center">
                    <Avatar username={user}></Avatar>
                    <span className=" text-gray-700 font-roboto font-medium text-3xl ml-3">{user}</span>
                </div>
            </div>
            <div className="space-y-3 flex flex-col min-h-0 p-5 h-full">
                <AnimateSharedLayout>
                    <div className="flex items-center justify-center bg-blue-gray-700 bg-opacity-10 rounded-xl p-1">                
                        <TabSwitcher mode={"conversations"} currentMode={mode} onClick={()=>setMode("conversations")}></TabSwitcher>
                        <TabSwitcher mode={"users"} currentMode={mode} onClick={()=>setMode("users")}></TabSwitcher>
                    </div>
                </AnimateSharedLayout>

                <Input put search value={search} onChange={setSearch} placeholder={mode === "conversations" ? "Search for conversations" : "Search for users"}></Input>
                <div className="overflow-y-auto flex-1 scroll">
                    {mode === "conversations" ? 
                    <Conversations id={id} search={search}></Conversations>: 
                    <Users id={id} search={search}></Users>}
                </div>
                <div className="">
                     <Button outlined full onClick={logout}>logout</Button>
                </div>
            </div>
        </div>
    )
};

export default Sidebar
   