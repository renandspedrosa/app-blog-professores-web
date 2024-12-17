import { useState } from 'react'
import PostActions from './PostActions'
import PostContent from './PostContent'
import PostHeader from './PostHeader'
import PostImage from './PostImage'
import PostTags from './PostTags'
// import handlePostViewed from '@/hooks/usePostList'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

const PostCard = ({ post, index, handlePostViewed }) => {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)

  const {
    path_img: image,
    title,
    tags,
    content,
    commentCount,
    viewedCount,
    teacher: {
      user: { name: teacherName },
    },
    // id,
  } = post

  const handleReadMore = (post) => {
    navigate(`/posts/${post.id}`, { state: { post } })
  }

  const formattedDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const { isStudent, isAuthenticated } = useAuth()

  const handleClick = async (post) => {
    handleReadMore(post)
    if (isStudent && isAuthenticated) await handlePostViewed(post.id)
  }

  const hasImage = !!image

  return (
    <div
      className={`p-4 sm:w-1/2 md:w-1/3 w-full min-w-[300px] sm:min-w-[350px] transition-transform duration-300 ${
        isHovered ? 'transform scale-105 cursor-pointer' : ''
      }`}
      key={index}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => handleClick(post)}
    >
      <div
        className='bg-white h-full border-2 border-gray-200 border-opacity-60 rounded-lg flex flex-col'
        style={{ minHeight: '400px', maxHeight: '500px' }}
      >
        <PostImage image={image} title={title} />
        <div
          className='p-6 flex-1 flex flex-col overflow-auto [&::-webkit-scrollbar]:w-2
                                [&::-webkit-scrollbar-track]:rounded-full
                              [&::-webkit-scrollbar-track]:bg-gray-100
                                [&::-webkit-scrollbar-thumb]:rounded-full
                              [&::-webkit-scrollbar-thumb]:bg-gray-300
                              dark:[&::-webkit-scrollbar-track]:bg-gray-50
                              dark:[&::-webkit-scrollbar-thumb]:bg-gray-400'
        >
          <PostHeader title={title} teacherName={teacherName} />
          <PostContent content={content} hasImage={hasImage} />
          <PostTags tags={tags} />
          <div className='flex flex-row justify-evenly'>
            <span className='text-gray-400 inline-flex items-center lg:ml-auto md:ml-0  leading-none text-xs'>
              {formattedDate(post.created_at)}
            </span>
            <PostActions
              postId={post.id}
              commentCount={commentCount}
              viewedCount={viewedCount}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard
