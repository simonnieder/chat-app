import { useContext, useState } from "react";
import {socket} from "../socket"
import Button from "./Button";
import Input from "./Input"
import {IoMdSend} from "react-icons/io";
import { UserContext } from "../Context/UserContext";
const Inputbar = ({id}) => {
    const [message, setMessage] = useState("");
    const [user] = useContext(UserContext);
    const submitForm = (e)=>{
        e.preventDefault();
        let msg = message;
        msg = msg.trim();
        if(!msg) return setMessage("");
        socket.emit("send-message", {content: message, to: id, from: user });
        setMessage("");
    }
    
    return (
        <form onSubmit={submitForm} className="w-full py-3 px-1 space-x-2 justify-center flex flex-nowrap">
          <Input full placeholder="Type your message" value={message} onChange={setMessage}></Input>
          <Button primary><span className="mr-2 hidden md:block">send</span><IoMdSend ></IoMdSend></Button>
        </form>
    )
}

export default Inputbar
