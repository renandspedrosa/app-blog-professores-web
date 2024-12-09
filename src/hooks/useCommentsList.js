import { useState, useEffect } from 'react'
import { getPostComments } from '../services/comments'

const useCommentsList = (postId) => {
  const [commentsList, setCommentsList] = useState([])
  const [loadingCommentsList, setLoadingCommentsList] = useState(true)
  const [errorCommentsList, setErrorCommentsList] = useState(null)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoadingCommentsList(true)
        const { data } = await getPostComments(postId)
        setCommentsList(data)
      } catch (error) {
        console.log(error)
        setErrorCommentsList('Erro ao carregar comentários')
      } finally {
        setLoadingCommentsList(false)
      }
    }

    if (postId) {
      fetchComments()
    }
  }, [postId])

  return {
    commentsList,
    setCommentsList,
    loadingCommentsList,
    errorCommentsList,
  }
}

export default useCommentsList
