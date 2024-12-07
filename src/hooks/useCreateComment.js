import { useState } from 'react'
import { createComment } from '../services/comments'

const useCreateComment = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const submitComment = async (postId, comment) => {
    setLoading(true)
    setError(null)
    setSuccess(false)
    try {
      await createComment(postId, comment)
      setSuccess(true)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return { submitComment, loading, error, success }
}

export default useCreateComment
