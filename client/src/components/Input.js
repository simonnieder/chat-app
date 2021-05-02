const Input = ({value, onChange, placeholder, title, full, type="text"}) => {
    return (
        <div className={`${full ? "w-full" : "max-w-sm w-full"} flex flex-col`}>
            <label className="font-roboto font-medium text-sm text-neutrals-300">{title}</label>
            <input type={type} className="w-full rounded-lg outline-none text-neutrals-300 bg-black bg-opacity-5 py-1 px-3 border-2 border-transparent focus:border-primary-blue focus:bg-white font-roboto" value={value} onChange={(e)=>onChange(e.target.value)} placeholder={placeholder}></input>
        </div>
    ) 
}
export default Input;
