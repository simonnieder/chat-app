import React from 'react'

const Avatar = ({username}) => {
    const letter = username.toString().charAt(0).toUpperCase();
    return (
        <div className="rounded-full bg-primary-blue w-12 h-12 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-2xl font-inter font-medium">{letter}</span>
        </div>
    )
}

export default Avatar
