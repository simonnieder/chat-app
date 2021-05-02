import Chat from "./Chat"
import ChatTopBar from "./ChatTopBar"

const ChatComponent = () => {
    return (
        <div className="flex flex-col  w-full items-center"> 
            <ChatTopBar></ChatTopBar>
            <Chat></Chat> 
        </div>
    )
}

export default ChatComponent
