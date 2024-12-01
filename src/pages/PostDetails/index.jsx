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
      <div className={`bg-black flex`} style={{ height: '80vh' }}>
        <div
          className='
        bg-orange-700 border-2 
        border-gray-200 
        border-opacity-60 
        rounded-lg 
        flex  
        h-full 
        w-full
       flex-col
       lg:flex-row

        '
        >
          {/* <PostImage image={image} title={title} /> */}
          <div className='bg-pink-700 flex-1 p-6'>
            POSTCARD
            {/* <PostHeader title={title} teacherName={teacherName} />
            <PostContent content={content} hasImage={hasImage} />
            <PostTags tags={tags} />
            <PostActions /> */}
          </div>
          <div className='bg-green-700 flex-1 p-6'>COMENTARIOS</div>
        </div>
      </div>
    </>
  )
}

export default PostDetails
