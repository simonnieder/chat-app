import Avatar from "./Avatar"
import {Link, useHistory} from "react-router-dom"
const User = ({user, online, active}) => {
    return (
        <Link to={`/${user.username}`} className={`flex items-center py-2 transition-colors duration-300  ${active ? "bg-blue-gray-700 bg-opacity-10": "hover:bg-blue-gray-700 hover:bg-opacity-5" } p-3 rounded-lg`}>
            <Avatar username={user.username}></Avatar>
            <div className="ml-2 flex flex-col overflow-hidden truncate">
                <span className=" text-blue-gray-800 font-roboto font-medium text-xl">{user.username}</span>
                <span className=" text-blue-gray-700 text-opacity-60 font-roboto text-md">{user.content}</span>
            </div>

        </Link>
    )
}

export default User