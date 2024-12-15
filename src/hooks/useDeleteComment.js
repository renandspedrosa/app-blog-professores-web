import { useState } from 'react'
import { deleteComment } from '@/services/comments'
import errorsMessage from '@/utils/messageError'
import { toast } from 'react-toastify'
const useDeleteComment = () => {
  const [loadingDelete, setLoadingDelete] = useState(false)
  const handleDeleteComment = async (commentId, callBack) => {
    try {
      setLoadingDelete(true)
      await deleteComment(commentId)
      setLoadingDelete(false)
      toast.success('Comentário deletado com sucesso!')
      if (callBack) {
        callBack()
      }
    } catch (error) {
      setLoadingDelete(false)
      errorsMessage(error, toast)
    }
  }
  return {
    loadingDelete,
    handleDeleteComment,
  }
}
export default useDeleteComment
