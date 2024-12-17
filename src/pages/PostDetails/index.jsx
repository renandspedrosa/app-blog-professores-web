import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CommentsSection } from '../../components/Comment'
import { PostCardDetails } from '../../components/PostDetails'
import useCommentsList from '../../hooks/useCommentsList'
import useCreateComment from '@/hooks/useCreateComment'
import Load from '@/components/Load'

const PostDetails = () => {
  const { id: postId } = useParams()

  const {
    loadingCommentsList,
    commentsList,
    setCommentsList,
    handleSearchComments,
  } = useCommentsList(postId)

  const { loadingComment } = useCreateComment()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true)
      await handleSearchComments()
      setIsLoading(false)
    }

    if (postId) {
      fetchComments()
    }
  }, [postId, handleSearchComments])

  if (loadingCommentsList || loadingComment || isLoading) {
    return <Load />
  }

  return (
    <div className="flex">
      <div
        className="
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
        "
      >
        {/* Detalhes do post */}
        <PostCardDetails
          commentsList={commentsList}
          setCommentsList={setCommentsList}
          handleSearchComments={handleSearchComments}
        />

        {/* Seção de comentários */}
        <CommentsSection
          commentsList={commentsList}
          setCommentsList={setCommentsList}
          handleSearchComments={handleSearchComments}
        />
      </div>
    </div>
  )
}

export default PostDetails
