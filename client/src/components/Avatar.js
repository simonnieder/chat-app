import React from 'react'

const Avatar = ({username="", online,status, active}) => {
    const letter = username.toString().charAt(0).toUpperCase();
    return (
        <div className="relative rounded-full bg-primary-blue w-12 h-12 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-2xl font-inter font-medium">{letter}</span>
            {status && 
            <div className={`absolute bottom-0 right-0 h-3 w-3 ${online ? "bg-green-500" : "bg-red-400"} rounded-full`}></div>
            }
        </div>
    )
}

export default Avatar
