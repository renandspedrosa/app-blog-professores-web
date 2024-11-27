import { useEffect, useState } from 'react'
import { getPosts } from '@/services/post'

const usePosts = (initialPage = 1, postsPerPage = 6) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(initialPage)

  const handleSearchPosts = async () => {
    try {
      setLoading(true)
      const search = searchTerm || ''
      const { data } = await getPosts(currentPage, postsPerPage, search)
      setPosts(data)
    } catch (error) {
      console.error('Erro ao buscar posts:', error)
      setError('Ocorreu um erro ao carregar os posts.')
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleSearchPosts()
  }, [currentPage])

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
  }

  return {
    posts,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    currentPage,
    handleNextPage,
    handlePrevPage,
    handleSearchPosts,
    isNextDisabled: Math.ceil(posts.length / postsPerPage) < currentPage,
    isPrevDisabled: currentPage === 1,
  }
}

export default usePosts
