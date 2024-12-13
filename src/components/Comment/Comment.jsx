import { Menu, MenuButton } from '@headlessui/react'
import { Trash2 } from 'lucide-react'
import Confirm from '@/components/Confirm'
import useDeleteComment from '../../hooks/useDeleteComment'
import useCommentsList from '../../hooks/useCommentsList'

const Comment = ({ comment, index }) => {
  const { loading, handleDeleteComment } = useDeleteComment()
  const { handleSearchComments } = useCommentsList()
  console.log(comment)
  if (!comment || !comment.user_id) {
    return null // Retorne null se os dados do comentário estiverem ausentes
  }
  const formattedDate = (commentCreatedAt) => {
    const date = new Date(commentCreatedAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    return date
  }

  const handleDelete = (commentId) => {
    Confirm(
      'Confirmação',
      'Tem certeza que deseja excluir esse comentário?',
      () => {
        handleDeleteComment(commentId, handleSearchComments)
      },
    )
  }

  return (
    <>
      <div
        className='rounded-lg rounded-t-lg border border-gray-200 m-4'
        key={index}
      >
        <article className='p-4 text-base bg-white rounded-lg mr-1'>
          <div className='flex items-center justify-between w-full'>
            <p className='inline-flex text-gray-400 items-center text-xs flex-4/5'>
              {comment.user_id}
            </p>
            <p className='text-gray-400 flex-1/5 text-xs px-2'>
              <time
                dateTime={formattedDate(comment.created_at)}
                title={formattedDate(comment.created_at)}
              >
                {formattedDate(comment.created_at)}
              </time>
            </p>
          </div>
          <div className='flex text-gray-600 items-center mt-4 space-x-4'>
            <p>{comment.content}</p>
          </div>
          <div className='flex w-full justify-end'>
            <Menu as='div'>
              <MenuButton
                className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                onClick={() => handleDelete(comment.id)}
              >
                <Trash2 size={16} strokeWidth={0.75} />
              </MenuButton>
            </Menu>
          </div>
        </article>
      </div>
    </>
  )
}

export default Comment
