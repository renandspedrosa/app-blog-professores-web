import { useState } from 'react'
import errorsMessage from '@/utils/messageError'
import { toast } from 'react-toastify'
import { createComment } from '../services/comments'

const useCreateComment = () => {
  const [loadingComment, setLoading] = useState(false)

  const handleSubmitComment = async (postId, comment, onAction, onSuccess) => {
    try {
      if (onAction) {
        onAction()
      }
      setLoading(true)
      await createComment(postId, comment)
      setLoading(false)
      if (onSuccess) {
        onSuccess()
      }
      toast.success('Comentário criado com sucesso!')
    } catch (error) {
      setLoading(false)
      errorsMessage(error, toast)
    }
  }
  return { loadingComment, handleSubmitComment }
}

export default useCreateComment
