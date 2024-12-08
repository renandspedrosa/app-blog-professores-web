const Form = ({ children, ...props }) => {
    return (
        <form 
            {...props}
            className={`bg-white rounded-lg p-12 flex flex-col md:ml-auto w-full md:mt-0 ${props.styles}`} >
          <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">{props.title}</h2>
          {children}
        </form>
    )
}
export default Form;