import Avatar from "./Avatar"
import User from "./User"

const ChatTopBar = ({id}) => {
    return (
        <div className="w-full  border-b border-gray-200 h-20 flex items-center px-5">
                <Avatar username={id}></Avatar>
                <span className=" text-gray-700 font-roboto font-medium text-3xl ml-3">{id}</span>
        </div>
    )
}

export default ChatTopBar
