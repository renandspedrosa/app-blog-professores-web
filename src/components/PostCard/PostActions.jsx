import { Eye, MessageCircle } from 'lucide-react'

const PostActions = ({ commentCount, viewedCount }) => {
  // const [commentsCount, setCommentsCount] = useState(0)

  return (
    <div className='flex flex-auto flex-row items-center max-h-fit justify-end'>
      <span className='text-gray-400 mr-3 items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200 flex'>
        <Eye size={18} strokeWidth={1.6} className='mr-1' />
        {viewedCount}
      </span>
      <span className='text-gray-400  items-center leading-none text-sm flex'>
        <MessageCircle size={15.5} strokeWidth={2.1} className='mr-1' />
        {commentCount}{' '}
      </span>
    </div>
  )
}

export default PostActions
