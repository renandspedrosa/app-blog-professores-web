import { useEffect, useState } from 'react'
import { getPostComments } from '../services/comments'

const useCommentsList = (postId) => {
  const [commentsList, setComments] = useState([])
  const [loadingCommentsList, setLoading] = useState(true)
  const [errorCommentsList, setError] = useState(null)

  const handleComments = async () => {
    try {
      setLoading(true)
      const { data } = await getPostComments(postId)
      setComments(data)
    } catch (error) {
      console.log('Erro ao buscar comentários:', error)
      setError('Ocorreu um erro ao carregar os comentários.')
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleComments()
  }, [postId])

  return { commentsList, loadingCommentsList, errorCommentsList }
}

export default useCommentsList
