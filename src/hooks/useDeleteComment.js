import { useState } from 'react'
import { deleteComment } from '@/services/comments'
import errorsMessage from '@/utils/messageError'
import { toast } from 'react-toastify'
const useDeleteComment = () => {
  const [loading, setLoading] = useState(false)
  const handleDeleteComment = async (commentId, callBack) => {
    try {
      setLoading(true)
      await deleteComment(commentId)
      setLoading(false)
      toast.success('Comentário deletado com sucesso!')
      if (callBack) {
        callBack()
      }
    } catch (error) {
      setLoading(false)
      errorsMessage(error, toast)
    }
  }
  return {
    loading,
    handleDeleteComment,
  }
}
export default useDeleteComment
