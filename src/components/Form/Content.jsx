const Content = ({title, children, submit}) => {
    return (
        <form 
            onSubmit={submit}
            className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0" >
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">{title}</h2>
          {children}
        </form>
    )
}
export default Content;