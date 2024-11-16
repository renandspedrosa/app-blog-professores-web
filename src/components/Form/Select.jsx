const Select = (props) => {
    return (
            <>
            <label className="block text-sm/6 font-medium text-gray-900">{props.label}</label>
            <div className="mt-2">
                <select
                    {...props}
                    className="block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 sm:max-w-xs"
                    >
                    {props.options.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
            </>
    )
}
export default Select;