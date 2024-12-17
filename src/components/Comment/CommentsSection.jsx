import { Link, useParams } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useState } from 'react'
import { NoComment, Comment } from '../../components/Comment'
import useCreateComment from '@/hooks/useCreateComment'
import Button from '../../components/Form/Button'
import usePostDetails from '../../hooks/usePostDetails'
import Load from '@/components/Load'
import useCommentsList from '../../hooks/useCommentsList'
import useDeleteComment from '../../hooks/useDeleteComment'
import Confirm from '@/components/Confirm'

import { LockKeyhole } from 'lucide-react/dist/cjs/lucide-react'
import { Textarea } from '@headlessui/react'

const CommentsSection = ({
  commentsList = [],
  setCommentsList,
  handleSearchComments,
}) => {
  const { isAuthenticated } = useAuth()
  const { id: postId } = useParams()
  const { postDetails, loading, error } = usePostDetails(postId)
  const { handleSubmitComment, loadingComment } = useCreateComment()
  const [newComment, setNewComment] = useState('')

  const { loadingCommentsList, errorCommentsList } = useCommentsList(postId)
  const { loadingDelete, handleDeleteComment } = useDeleteComment()

  const handleDelete = (commentId) => {
    Confirm(
      'Confirmação',
      'Tem certeza que deseja excluir esse comentário?',
      () => {
        handleDeleteComment(commentId, handleSearchComments)
      },
    )
  }

  if (loading || loadingCommentsList || loadingComment || loadingDelete) {
    return
  }

  if (error || errorCommentsList) {
    return <p>{error}</p>
  }

  if (!postDetails) {
    return <div>Post não encontrado</div>
  }

  const post = {
    id: postDetails.id,
    title: postDetails.title,
    teacherName: postDetails.teacher.user.name,
    content: postDetails.content,
    image: postDetails.path_img,
    tags: postDetails.tags,
    date: postDetails.created_at,
    viewedCount: postDetails.viewedCount,
    commentCount: postDetails.commentCount,
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newCommentData = await handleSubmitComment(
        post.id,
        newComment,
        false,
        handleSearchComments,
      )
      setCommentsList([...commentsList, newCommentData])
      setNewComment('')
    } catch (error) {
      console.error('Erro ao enviar comentário:', error)
    }
  }

  const sortedCommentsList = [...commentsList].reverse()
  return (
    <>
      {isAuthenticated && (
        <div className='flex flex-grow flex-col p-6 lg:w-1/3'>
          <h2 className='ml-2 title-font text-lg font-medium text-gray-900 mb-3'>
            Comentários
          </h2>
          <form className='mb-2 p-4' onSubmit={handleSubmit}>
            <div className='py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200'>
              <label htmlFor='newComment' className='sr-only'>
                Seu comentário
              </label>
              <Textarea
                id='newComment'
                rows='6'
                className='px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none min-h-1/2'
                placeholder='Deixe seu comentário...'
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onSubmit={handleSubmit}
                required
              ></Textarea>
            </div>
            <div className='flex justify-end'>
              <Button type='submit'>Comentar</Button>
            </div>
          </form>
          <div
            className='overflow-auto [&::-webkit-scrollbar]:w-2
[&::-webkit-scrollbar-track]:rounded-full
[&::-webkit-scrollbar-track]:bg-gray-100
[&::-webkit-scrollbar-thumb]:rounded-full
[&::-webkit-scrollbar-thumb]:bg-gray-300
dark:[&::-webkit-scrollbar-track]:bg-gray-50
dark:[&::-webkit-scrollbar-thumb]:bg-gray-400'
          >
            {sortedCommentsList.length === 0 ? (
              <NoComment />
            ) : (
              sortedCommentsList.map((comment) => (
                <Comment
                  comment={comment}
                  key={comment.id}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        </div>
      )}
      {!isAuthenticated && (
        <div className='flex flex-grow flex-col p-6 lg:w-1/3'>
          <div className='flex justify-center items-center h-full'>
            <div className='flex flex-col items-center'>
              <p className='text-gray-400'>
                Faça o{' '}
                <Link
                  to='/login'
                  className='font-semibold text-indigo-600 hover:text-indigo-500'
                >
                  login
                </Link>{' '}
                para visualizar os comenátios
              </p>
              <a href='/login'>
                <LockKeyhole className='m-6' color='#1F2937' />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CommentsSection
