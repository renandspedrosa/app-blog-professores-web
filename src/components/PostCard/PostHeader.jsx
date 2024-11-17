const PostHeader = ({ title, teacherName }) => (
  <div className='flex-grow'>
    <h1 className='title-font text-lg font-medium text-gray-900'>{title}</h1>
    <h2 className='tracking-widest text-xs text-transform: capitalize title-font font-small text-gray-400 mb-1'>
      {teacherName}
    </h2>
  </div>
)

export default PostHeader
