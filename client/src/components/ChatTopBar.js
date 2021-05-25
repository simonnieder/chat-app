import Avatar from "./Avatar"
import {BsChevronLeft} from "react-icons/bs"
import { Link } from "react-router-dom"
const ChatTopBar = ({id, isBigScreen}) => {
    return (
        <div className="w-full  border-b border-gray-200 h-20 flex items-center px-5 space-x-3">
             {!isBigScreen && <Link to="/" ><BsChevronLeft className="text-2xl font-bold text-blue-gray-700"></BsChevronLeft></Link> }
                <Avatar username={id}></Avatar>
                <span className=" text-gray-700 font-roboto font-medium text-3xl ">{id}</span>
        </div>
    )
}

export default ChatTopBar
