const TabSwitcher = ({onClick, mode, currentMode}) => {
    return (
        <button onClick={onClick} className={`flex  items-center justify-center font-roboto ${currentMode === mode ?"text-primary-blue font-medium bg-blue-gray-50" : "text-gray-700"} w-full cursor-pointer font-semibold select-none h-9 px-5 rounded-lg text-center focus:outline-none focus:ring ring-primary-blue ring-opacity-70`}>{mode}</button>
    )
}
export default TabSwitcher
