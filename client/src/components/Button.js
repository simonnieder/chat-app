import { motion } from "framer-motion";
const Button = ({children, onClick, full, submit, primary, outlined}) => {
    return (
        <motion.button submit={submit} whileTap={{scale: 0.95}} onClick={onClick} className=
        {`${full && "w-full"} 
        transition-colors
        font-semibold h-9 px-5
        focus:outline-none
        text-base font-inter
        uppercase
        flex
        items-center
        justify-center
        rounded-lg
        ${outlined ? (primary ? "border-2 border-primary-blue text-primary-blue": "border-2 border-gray-600 text-gray-600" ): (primary ? "bg-primary-blue": "bg-gray-600" )}
        hover:bg-opacity-90 
        text-white  
        `}>
            {children}
        </motion.button>
    )
}

export default Button
