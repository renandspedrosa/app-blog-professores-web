// PostDetails.jsx
import { useLocation } from 'react-router-dom'
import { Eye, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { NoComment, Comment } from '../../components/Comment'
import usePostComments from '../../hooks/usePostComments'

const PostDetails = () => {
  const location = useLocation()
  const { post } = location.state || {}
  const [hoveredTag, setHoveredTag] = useState(null)
  const { comments, loading, error } = usePostComments(post?.id)

  if (!post) {
    return <div>Post não encontrado</div>
  }

  const {
    path_img: image,
    title,
    tags,
    content,
    teacher: {
      user: { name: teacherName },
    },
  } = post
  const hasImage = !!image

  const handleMouseEnter = (tag) => {
    setHoveredTag(tag)
    console.log(`Hovered over: ${tag.name}`)
  }

  const handleMouseLeave = () => {
    setHoveredTag(null)
  }

  console.log('Comments:', comments)

  return (
    <>
      <div className={`flex`} style={{ height: '80vh' }}>
        <div
          className='
          bg-white
          border-2 
        border-gray-200 
        border-opacity-60 
        rounded-lg 
        flex  
        h-full 
        w-full
       flex-col
       divide-y-2
       lg:flex-row
       lg:divide-x-2
       lg:divide-y-0
       '
        >
          <div className='h-full lg:w-2/3 p-6 overflow-auto flex flex-col justify-between'>
            <div className='flex flex-row justify-between'>
              <div className='mb-3'>
                <h1 className='title-font text-lg font-medium text-gray-900'>
                  {title}
                </h1>
                <h2 className='tracking-widest text-xs text-transform: capitalize title-font font-small text-gray-400 mb-1'>
                  {teacherName}
                </h2>
              </div>
              <div className='flex items-center'>
                <span className='text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200'>
                  <Eye size={18} strokeWidth={1.6} className='mr-1' />0{' '}
                  {/*post.views*/}
                </span>
                <span className='text-gray-400 inline-flex items-center leading-none text-sm'>
                  <MessageCircle
                    size={15.5}
                    strokeWidth={2.1}
                    className='mr-1'
                  />
                  0 {/*post.comments*/}
                </span>
              </div>
            </div>

            {hasImage ? (
              <>
                <img
                  className='md:h-36 relative w-full object-cover object-center flex-shrink-0 flex-1'
                  src={image}
                  alt={title}
                  style={{ maxHeight: '33%' }}
                />
                <p
                  className='leading-relaxed mb-3 flex-grow overflow-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-gray-50
  dark:[&::-webkit-scrollbar-thumb]:bg-gray-400'
                >
                  {content}
                </p>
              </>
            ) : (
              <>
                <p
                  className='leading-relaxed mb-3 flex-grow overflow-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-gray-50
  dark:[&::-webkit-scrollbar-thumb]:bg-gray-400'
                >
                  {content}
                </p>
              </>
            )}

            <div>
              <div className='w-full flex flex-wrap gap-2 mb-1'>
                {tags.map((tag) => (
                  <span
                    key={tag.name}
                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset cursor-pointer ${
                      hoveredTag === tag
                        ? 'bg-blue-100 text-blue-900 ring-blue-900/10'
                        : 'bg-blue-50 text-blue-700 ring-blue-700/10'
                    }`}
                    onMouseEnter={() => handleMouseEnter(tag)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {tag.name.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className='flex flex-col p-6 h-1/2 lg:h-full lg:w-1/3 justify-between'>
            <div>
              <h2 className='ml-2 title-font text-lg font-medium text-gray-900 mb-3'>
                Comentários
              </h2>
            </div>
            <div
              className='flex-1 overflow-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-gray-50
  dark:[&::-webkit-scrollbar-thumb]:bg-gray-400'
            >
              {loading ? (
                <div>Carregando...</div>
              ) : error ? (
                <div>Erro ao carregar comentários</div>
              ) : comments.length === 0 ? (
                <NoComment />
              ) : (
                comments.map((comment, index) => (
                  <Comment comment={comment} key={index} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostDetails
