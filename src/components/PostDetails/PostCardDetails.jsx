import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useCommentsList from '../../hooks/useCommentsList'
import usePostDetails from '../../hooks/usePostDetails'
import PostActions from '../../components/PostCard/PostActions'

const PostCardDetails = ({
  commentsList,
  setCommentsList,
  handleSearchComments,
}) => {
  const { id: postId } = useParams()
  const { postDetails, loading, error } = usePostDetails(postId)
  const [hoveredTag, setHoveredTag] = useState(null)
  const imageHost = import.meta.env.VITE_API_HOST || 'http://localhost:3000'
  const formattedDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }
  const { loadingCommentsList } = useCommentsList(postId)

  useEffect(() => {
    ;async () => {
      handleSearchComments()
      setCommentsList([...commentsList])
    },
      [commentsList]
  })

  const handleMouseEnter = (tag) => {
    setHoveredTag(tag)
  }

  const handleMouseLeave = () => {
    setHoveredTag(null)
  }

  if (loading || loadingCommentsList) {
    return
  }

  if (error) {
    return <p>{error}</p>
  }

  if (!postDetails) {
    return <div>Post não encontrado</div>
  }

  const post = {
    id: postDetails.id,
    title: postDetails.title,
    teacherName: postDetails.teacher.user.name,
    content: postDetails.content,
    image: postDetails.path_img,
    tags: postDetails.tags,
    date: postDetails.created_at,
    viewedCount: postDetails.viewedCount,
    commentCount: postDetails.commentCount,
  }

  const hasImage = !!post.image

  const image = hasImage ? `${imageHost}/${post.image}` : null

  return (
    <div className='h-full lg:w-2/3 p-6 overflow-auto flex flex-col justify-between'>
      <div className='flex flex-row justify-between'>
        <div className='mb-3'>
          <h1 className='title-font text-lg font-medium text-gray-900'>
            {post.title}
          </h1>
          <h2 className='tracking-widest text-xs text-transform: capitalize title-font font-small text-gray-400 mb-1'>
            {post.teacherName}
          </h2>
        </div>
        <PostActions
          commentCount={post.commentCount}
          viewedCount={post.viewedCount}
        />
      </div>

      {hasImage ? (
        <>
          <img
            className='md:h-36 relative w-full object-cover object-center flex-shrink-0 flex-1 rounded-lg rounded-t-lg'
            src={image}
            alt={post.title}
            style={{ maxHeight: '33%' }}
          />
          <p
            className='leading-relaxed mt-2 pt-6 mb-3 flex-grow break-words overflow-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-gray-50
  dark:[&::-webkit-scrollbar-thumb]:bg-gray-400'
          >
            {post.content}
          </p>
        </>
      ) : (
        <>
          <p
            className='leading-relaxed mb-3 flex-grow break-words overflow-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-gray-50
  dark:[&::-webkit-scrollbar-thumb]:bg-gray-400'
          >
            {post.content}
          </p>
        </>
      )}

      <div className='flex flex-col justify-between'>
        <div className='w-full flex flex-wrap gap-2 mb-1'>
          {post.tags.map((tag) => (
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
        <span className='text-gray-400 inline-flex items-center lg:ml-auto md:ml-0  leading-none text-xs mt-2'>
          {formattedDate(post.date)}
        </span>
      </div>
    </div>
  )
}

export default PostCardDetails
