const Content = ({title, children, submit, styles}) => {
    // lg:w-2/6 md:w-1/2 
    return (
        <form 
            onSubmit={submit}
            className={`bg-white rounded-lg p-12 flex flex-col md:ml-auto w-full mt-10 md:mt-0 ${styles}`} >
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">{title}</h2>
          {children}
        </form>
    )
}
export default Content;