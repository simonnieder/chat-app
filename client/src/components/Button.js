import { motion } from "framer-motion";
import Loader from "./Loader";
const Button = ({children, onClick, full, submit, primary, outlined, loading, disabled}) => {
    return (
        <motion.button submit={submit} whileTap={{scale: 0.95}} onClick={onClick} className=
        {`${full && "w-full"} 
        transition-colors
        relative
        font-semibold 
        h-9 px-5
        focus:outline-none
        focus:ring
        ring-primary-blue
        ring-opacity-70
        text-base 
        font-inter
        uppercase
        rounded-lg
        ${outlined ? (primary ? "border-2 border-primary-blue text-primary-blue  ": "border-2 border-gray-600 text-gray-600" ): (primary ? "bg-primary-blue": "bg-gray-600" )}
        ${loading | disabled && "pointer-events-none opacity-80"}
        hover:bg-opacity-90 
        text-white  
        `}>
            <div className={`${loading && "opacity-0"} flex items-center justify-center` }>{children}</div>
            {loading&&<Loader></Loader>}
        </motion.button>
    )
}

export default Button
