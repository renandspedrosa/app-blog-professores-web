const Comment = ({ comment, index }) => {
  return (
    <div className='bg-blue-50 p-4 rounded-lg shadow-md m-2' key={index}>
      <div className='mb-4'>
        <p className='font-semibold'>{comment.user}</p>
        <p>{comment.content}</p>
      </div>
    </div>
  )
}

export default Comment
