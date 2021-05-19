const TabSwitcher = ({onClick, mode, currentMode}) => {
    return (
        <span onClick={onClick} className={`font-roboto ${currentMode === mode ?"text-primary-blue font-medium bg-blue-gray-50" : "text-gray-700"} w-full cursor-pointer font-semibold select-none py-2 px-5 rounded-lg text-center`}>{mode}</span>
    )
}
export default TabSwitcher
