import PostActions from './PostActions'
import PostContent from './PostContent'
import PostHeader from './PostHeader'
import PostImage from './PostImage'
import PostTags from './PostTags'

const PostCard = ({ post, index, handleReadMore }) => {
  const {
    path_img: image,
    title,
    tags,
    content,
    teacher: {
      user: { name: teacherName },
    },
    id,
  } = post

  return (
    <div
      className='p-4 sm:w-1/2 md:w-1/3 w-full min-w-[300px] sm:min-w-[350px]'
      key={index}
    >
      <div
        className='bg-white h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden flex flex-col'
        style={{ minHeight: '400px' }}
      >
        <PostImage image={image} title={title} />
        <div className='p-6 flex-1 flex flex-col'>
          <PostHeader title={title} teacherName={teacherName} />
          <PostContent content={content} />
          <PostTags tags={tags} />
          <PostActions id={id} handleReadMore={handleReadMore} />
        </div>
      </div>
    </div>
  )
}

export default PostCard
