import Avatar from "./Avatar"
import {Link, useHistory} from "react-router-dom"
const User = ({username, online, active}) => {
    return (
        <Link to={`/${username}`} className={`flex items-center py-2 transition-colors duration-300  ${active ? "bg-blue-400 bg-opacity-20": "hover:bg-black hover:bg-opacity-5" } p-3 rounded-lg`}>
            <Avatar username={username}></Avatar>
            <div className="ml-2 flex flex-col">
            <span className=" text-gray-800 font-roboto font-medium text-xl">{username}</span>
            {/* <span className={` ${online ? "text-green-400": "text-red-500"} font-roboto text-sm capitalize`}>{online ? "online": "offline"}</span> */}
            </div>

        </Link>
    )
}

export default User