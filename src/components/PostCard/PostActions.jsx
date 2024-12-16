import { Eye, MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getPostComments } from '../../services/comments'

const PostActions = ({ postId, viewedCount }) => {
  const [commentsCount, setCommentsCount] = useState(0)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const comments = await getPostComments(postId)
        setCommentsCount(comments.length)
      } catch (error) {
        console.error('Erro ao buscar comentários:', error)
      }
    }
    fetchComments()
  }, [postId])

  return (
    <div className='flex flex-auto items-center flex-wrap max-h-fit justify-end'>
      <span className='text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200'>
        <Eye size={18} strokeWidth={1.6} className='mr-1' />
        {viewedCount}
      </span>
      <span className='text-gray-400 inline-flex items-center leading-none text-sm'>
        <MessageCircle size={15.5} strokeWidth={2.1} className='mr-1' />
        {commentsCount}{' '}
      </span>
    </div>
  )
}

export default PostActions
