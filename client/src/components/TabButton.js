const TabSwitcher = ({onClick, mode, currentMode,}) => {
    return (
        <span onClick={onClick} className={`font-roboto ${currentMode === mode ?"text-primary-blue font-semibold bg-black bg-opacity-5" : "text-gray-700"} cursor-pointer font-semibold select-none py-2 px-5 rounded-lg`}>{mode}</span>
    )
}

export default TabSwitcher
