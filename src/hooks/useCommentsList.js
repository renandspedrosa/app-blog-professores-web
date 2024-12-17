import { useState, useEffect, useCallback } from 'react'
import { getPostComments } from '../services/comments'

const useCommentsList = (postId) => {
  const [commentsList, setCommentsList] = useState([])
  const [loadingCommentsList, setLoadingCommentsList] = useState(true)
  const [errorCommentsList, setErrorCommentsList] = useState(null)

  const handleSearchComments = useCallback(async () => {
    if (!postId) return
    try {
      setLoadingCommentsList(true)
      const data = await getPostComments(postId)
      setCommentsList(data)
    } catch (error) {
      console.error(error)
      setErrorCommentsList('Erro ao carregar comentários')
    } finally {
      setLoadingCommentsList(false)
    }
  }, [postId])

  useEffect(() => {
    handleSearchComments()
  }, [postId, handleSearchComments])

  return {
    commentsList,
    setCommentsList,
    loadingCommentsList,
    errorCommentsList,
    handleSearchComments,
  }
}

export default useCommentsList
