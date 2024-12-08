import { useState, useEffect } from 'react'
import { getPostById } from '../services/post'

const usePostDetails = (postId) => {
  const [postDetails, setPostDetails] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const handleGetPostDetails = async () => {
    try {
      setLoading(true)
      const data = await getPostById(postId)
      console.log(data)
      setPostDetails(data)
    } catch (error) {
      console.error('Erro ao buscar comentários:', error)
      setError('Ocorreu um erro ao carregar os detalhes da postagem.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleGetPostDetails()
  }, [postId])

  return { postDetails, handleGetPostDetails, loading, error }
}

export default usePostDetails
