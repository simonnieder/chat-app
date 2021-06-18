import TextareaAutosize from "react-textarea-autosize";
const Input = ({
  value,
  onChange,
  placeholder,
  title,
  full,
  type = "text",
  error,
  required,
  search,
  maxRows,
  onSubmit,
}) => {
  return (
    <div className={`${full ? "w-full" : "max-w-sm w-full"} flex flex-col`}>
      <label className="font-roboto font-bold text-sm text-neutrals-300">
        {title}
      </label>
      <div className="relative focus-within:text-primary-blue text-blue-gray-500">
        {maxRows ? (
          <TextareaAutosize
            onKeyDown={onSubmit}
            autoFocus
            minRows={1}
            maxRows={maxRows}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`resize-none w-full rounded-lg outline-none text-blue-gray-700 bg-blue-gray-500 placeholder-blue-gray-800 placeholder-opacity-50 bg-opacity-10 py-1  border-2 ${
              error
                ? "border-red-500"
                : "border-transparent focus:border-primary-blue"
            }  focus:bg-blue-gray-50 font-roboto ${
              search ? "pl-9 pr-3" : "px-3"
            }`}
          ></TextareaAutosize>
        ) : (
          <input
            required={required}
            type={type}
            className={`w-full rounded-lg outline-none text-blue-gray-700 bg-blue-gray-500 placeholder-blue-gray-800 placeholder-opacity-50 bg-opacity-10 py-1  border-2 ${
              error
                ? "border-red-500"
                : "border-transparent focus:border-primary-blue"
            }  focus:bg-blue-gray-50 font-roboto ${
              search ? "pl-9 pr-3" : "px-3"
            }`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
          ></input>
        )}
        {search && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute transform -translate-y-1/2 h-5 w-5 top-1/2 left-3 currentColor"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        )}
      </div>
      <p className="font-roboto font-normal text-red-500 text-sm">{error}</p>
    </div>
  );
};
export default Input;
