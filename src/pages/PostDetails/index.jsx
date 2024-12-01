// PostDetails.jsx
import { useLocation } from 'react-router-dom'
import {
  PostActions,
  PostContent,
  PostHeader,
  PostImage,
  PostTags,
} from '../../components/PostCard'

const PostDetails = () => {
  const location = useLocation()
  const { post } = location.state

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

  return (
    <>
      <div
        className={`p-4 sm:w-1/2 md:w-1/3 w-full min-w-[300px] sm:min-w-[350px] transition-transform duration-300 `}
      >
        <div
          className='bg-white h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden flex flex-col'
          style={{ minHeight: '400px' }}
        >
          <PostImage image={image} title={title} />
          <div className='p-6 flex-1 flex flex-col'>
            <PostHeader title={title} teacherName={teacherName} />
            <PostContent content={content} hasImage={hasImage} />
            <PostTags tags={tags} />
            <PostActions />
          </div>
        </div>
      </div>
    </>
  )
}

export default PostDetails
