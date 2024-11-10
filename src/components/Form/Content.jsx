const Content = ({title, children, submit}) => {
    return (
        <form 
            onSubmit={submit}
            className="lg:w-2/6 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0" >
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">{title}</h2>
          {children}
        </form>
    )
}
export default Content;