import { useState, useEffect } from 'react'
import { getPostComments } from '@/services/comments'

const usePostComments = (postId) => {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const handleSearchComments = async () => {
    try {
      setLoading(true)
      const { data } = await getPostComments(postId)
      setComments(data)
    } catch (error) {
      console.error('Erro ao buscar comentários:', error)
      setError('Ocorreu um erro ao carregar os comentários.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleSearchComments()
  }, [postId])

  return { comments, handleSearchComments, loading, error }
}

export default usePostComments
