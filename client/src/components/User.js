import Avatar from "./Avatar"
import {Link, useHistory} from "react-router-dom"
const User = ({user, online, active}) => {
    return (
        <Link to={`/${user.username}`} className={`m-1 flex items-center py-2 transition-colors duration-300  ${active ? "bg-blue-gray-700 bg-opacity-10": "hover:bg-blue-gray-700 hover:bg-opacity-5 " } p-3 rounded-lg focus:outline-none focus:ring ring-primary-blue ring-opacity-70  `}>
            <Avatar username={user.username} online={online} status active={active}></Avatar>
            <div className="ml-2 flex flex-col overflow-hidden">
                <span className=" text-blue-gray-800 font-roboto font-medium text-xl truncate">{user.username}</span>
                <span className=" text-blue-gray-700 text-opacity-60 font-roboto text-md truncate">{user.content}</span>
            </div>
        </Link>
    )
}

export default User