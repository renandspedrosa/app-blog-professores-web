const Comment = ({ comment, index }) => {
  const formattedDate = (commentCreatedAt) => {
    const date = new Date(commentCreatedAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    return date
  }

  return (
    <>
      <div
        className='rounded-lg rounded-t-lg border border-gray-200 m-4'
        key={index}
      >
        <article className='p-4 text-base bg-white rounded-lg mr-1'>
          <footer className='flex justify-between items-center mb-2'>
            <div className='flex items-center justify-between w-full'>
              <p className='inline-flex text-gray-400 items-center text-xs flex-4/5'>
                SUBSTITUIR O USER ID PELO NOME DO USUÁRIO: {comment.user_id}
              </p>
              <p className='text-gray-400 flex-1/5 text-xs'>
                <time
                  dateTime={formattedDate(comment.created_at)}
                  title={formattedDate(comment.created_at)}
                >
                  {formattedDate(comment.created_at)}
                </time>
              </p>
            </div>

            <div
              id='dropdownComment1'
              className='hidden z-10 w-36 bg-white rounded'
            ></div>
          </footer>
          <div className='flex text-gray-600 items-center mt-4 space-x-4'>
            <p className=''>{comment.content}</p>
          </div>
        </article>
      </div>
    </>
  )
}

export default Comment
