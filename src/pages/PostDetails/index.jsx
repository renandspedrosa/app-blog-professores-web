import { useParams } from 'react-router-dom'
import { CommentsSection } from '../../components/Comment'
import useCreateComment from '@/hooks/useCreateComment'
import { PostCardDetails } from '../../components/PostDetails'
import useCommentsList from '../../hooks/useCommentsList'
import Load from '@/components/Load'
import { useEffect } from 'react'

const PostDetails = () => {
  const { id: postId } = useParams()
  const {
    loadingCommentsList,
    commentsList,
    setCommentsList,
    handleSearchComments,
  } = useCommentsList(postId)
  const { loadingComment } = useCreateComment()

  useEffect(() => {
    handleSearchComments()
  }, [postId])

  if (loadingCommentsList || loadingComment) {
    return <Load />
  }

  return (
    <>
      <div className={`flex`}>
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
          <PostCardDetails commentsList={commentsList} />
          <CommentsSection
            commentsList={commentsList}
            setCommentsList={setCommentsList}
            handleSearchComments={handleSearchComments}
          />
        </div>
      </div>
    </>
  )
}

export default PostDetails
