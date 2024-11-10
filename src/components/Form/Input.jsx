const Input = (props) => {
    return (
            <>
            <label className="block text-sm/6 font-medium text-gray-900">{props.label}</label>
            <div className="mt-2">
                <input 
                {...props}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
            </div>
            </>
    )
}
export default Input;