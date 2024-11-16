const Form = ({title, children, submit, styles}) => {
    return (
        <form 
            onSubmit={submit}
            className={`bg-white rounded-lg p-12 flex flex-col md:ml-auto w-full mt-10 md:mt-0 ${styles}`} >
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">{title}</h2>
          {children}
        </form>
    )
}
export default Form;