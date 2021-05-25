import  {motion} from "framer-motion"
const Message = ({children, ownMessage, message}) => {

    let animate = "-100%";
    if(ownMessage) animate = "100%";
    return (
        <div initial={{x: animate}} animate={{x: "0"}} className={`${ownMessage && "bg-primary-blue text-white rounded-br-none self-end"} ${!ownMessage && " bg-blue-gray-500 bg-opacity-10 text-black rounded-bl-none"} break-all flex flex-col relative max-w-4/5 fit-content  px-3 py-1 my-2 rounded-lg`}>
            <p className="font-roboto whitespace-pre-wrap">{children}</p>
            <div className={`text-xs font-inter font-medium ${ownMessage ? "text-gray-700" : " text-gray-500"} `}>{new Date(message.timestamp).toLocaleString()}</div>
        </div>  
    )
}
export default Message