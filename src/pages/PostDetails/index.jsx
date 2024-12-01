// PostDetails.jsx
import { useLocation } from 'react-router-dom'
import {
  PostActions,
  PostContent,
  PostHeader,
  PostImage,
  PostTags,
} from '../../components/PostCard'
import { NoComment, Comment } from '../../components/PostDetails'

const comments = [
  {
    user: 'João',
    content: 'Ótimo post!',
  },
  {
    user: 'Maria',
    content: 'Adorei o conteúdo!',
  },
  {
    user: 'Ana',
    content: 'Muito bom!',
  },
  {
    user: 'João',
    content: 'Ótimo post!',
  },
  {
    user: 'Maria',
    content: 'Adorei o conteúdo!',
  },
  {
    user: 'Ana',
    content: 'Muito bom!',
  },
  {
    user: 'João',
    content: 'Ótimo post!',
  },
  {
    user: 'Maria',
    content: 'Adorei o conteúdo!',
  },
  {
    user: 'Ana',
    content: 'Muito bom!',
  },
  {
    user: 'João',
    content: 'Ótimo post!',
  },
  {
    user: 'Maria',
    content: 'Adorei o conteúdo!',
  },
  {
    user: 'Ana',
    content: 'Muito bom!',
  },
]

// const comments = []

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
          <div className='bg-pink-700 h-1/2 lg:h-full lg:w-1/2 p-6 overflow-auto justify-between'>
            <PostImage image={image} title={title} />
            <PostHeader title={title} teacherName={teacherName} />
            <PostContent content={content} hasImage={hasImage} />
            <PostTags tags={tags} />
            <PostActions />
          </div>
          <div className='bg-green-700 h-1/2 lg:h-full lg:w-1/2 p-6 overflow-auto'>
            <h2 className='text-xl font-bold mb-4'>Comentários</h2>
            {comments.length === 0 ? (
              <NoComment />
            ) : (
              comments.map((comment, index) => (
                <Comment comment={comment} key={index} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default PostDetails
