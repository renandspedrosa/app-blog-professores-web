import { useState } from 'react'
import PostActions from './PostActions'
import PostContent from './PostContent'
import PostHeader from './PostHeader'
import PostImage from './PostImage'
import PostTags from './PostTags'
import usePosts from '@/hooks/usePostList'
import { useAuth } from '@/context/AuthContext'

const PostCard = ({ post, index, handleReadMore }) => {
  const [isHovered, setIsHovered] = useState(false)
  const { handlePostViewed } = usePosts()

  const {
    path_img: image,
    title,
    tags,
    content,
    viewedCount,
    teacher: {
      user: { name: teacherName },
    },
    // id,
  } = post

  const formattedDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const { isStudent, isAuthenticated } = useAuth()

  const handleViewed = (post) => {
    console.log('CHAMADA DO POST VIEWED')
    handlePostViewed(post.id)
  }

  const handleClick = (post) => {
    handleReadMore(post)
    if (isStudent && isAuthenticated) handleViewed(post)
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
        <div className='p-6 flex-1 flex flex-col'>
          <PostHeader title={title} teacherName={teacherName} />
          <PostContent content={content} hasImage={hasImage} />
          <PostTags tags={tags} />
          <div className='flex flex-row justify-evenly'>
            <span className='text-gray-400 inline-flex items-center lg:ml-auto md:ml-0  leading-none text-xs'>
              {formattedDate(post.created_at)}
            </span>
            <PostActions postId={post.id} viewedCount={viewedCount} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard
