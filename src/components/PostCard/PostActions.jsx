import { ArrowRight, Eye, MessageCircle } from 'lucide-react'

const PostActions = ({ id, handleReadMore }) => (
  <div className='flex items-center flex-wrap'>
    <a
      className='text-indigo-600 hover:text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer'
      onClick={() => handleReadMore(id)}
    >
      Leia mais
      <ArrowRight className='w-4 h-4 ml-1' />
    </a>
    <span className='text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200'>
      <Eye size={18} strokeWidth={1.6} className='mr-1' />0 {/*post.views*/}
    </span>
    <span className='text-gray-400 inline-flex items-center leading-none text-sm'>
      <MessageCircle size={15.5} strokeWidth={2.1} className='mr-1' />0{' '}
      {/*post.comments*/}
    </span>
  </div>
)

export default PostActions
