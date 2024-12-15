const TextArea = (props) => {
    return (
        <>
            <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-900" htmlFor={props.id || props.name}>
                    {props.label}
                </label>
            </div>
            <div className="mt-2">
                <textarea
                    {...props}
                    id={props.id || props.name}
                    name={props.name}
                    className="w-full bg-white rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-7 transition-colors duration-200 ease-in-out"
                ></textarea>
            </div>
        </>
    );
};

export default TextArea;
