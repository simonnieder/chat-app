const Loader = ({className = "text-blue-gray-200 h-6 w-6"}) => {
    return (
        <svg className={`${className} absolute transform inset-1/2 -translate-x-1/2 -translate-y-1/2`} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle className="stroke-current text-transparent" cx="25" cy="25" r="22.5" stroke-width="5"/>
            <path className={`animate-spin origin-center stroke-current ${color}`} d="M13.7242 44.4707C10.3075 42.492 7.47162 39.6491 5.50142 36.2274C3.53122 32.8058 2.49609 28.926 2.50001 24.9777C2.50393 21.0294 3.54675 17.1516 5.52373 13.7339C7.50072 10.3162 10.3422 7.47889 13.7629 5.50699C17.1835 3.5351 21.0628 2.49804 25.0112 2.5C28.9595 2.50196 32.8378 3.54286 36.2564 5.51815C39.6751 7.49344 42.5138 10.3336 44.4874 13.7532C46.461 17.1729 47.5 21.0517 47.5 25" stroke-width="5" stroke-linecap="round"/>
        </svg>
    )
}
export default Loader