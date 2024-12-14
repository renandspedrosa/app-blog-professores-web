import { useEffect, useState } from 'react'
import { getPosts, postViewed } from '@/services/post'

const usePosts = (initialPage = 1, postsPerPage = 6) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [hasMorePosts, setHasMorePosts] = useState(false)

  const handleSearchPosts = async () => {
    try {
      setLoading(true)
      const search = searchTerm || ''
      const { data } = await getPosts(currentPage, postsPerPage, search)

      setPosts(data)

      const nextPage = currentPage + 1
      const { data: nextPageData } = await getPosts(
        nextPage,
        postsPerPage,
        search,
      )

      setHasMorePosts(nextPageData.length > 0)
    } catch (error) {
      console.error('Erro ao buscar posts:', error)
      setError('Ocorreu um erro ao carregar os posts.')
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const handlePostViewed = async (post_id) => {
    try {
      await postViewed(post_id)
    } catch (error) {
      console.error('Erro ao registrar visualização do post:', error)
    }
  }

  useEffect(() => {
    handleSearchPosts()
  }, [currentPage])

  const handleNextPage = () => {
    if (hasMorePosts) {
      setCurrentPage((prevPage) => prevPage + 1)
    }
  }

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
  }

  return {
    posts,
    loading,
    error,
    searchTerm,
    handlePostViewed,
    setSearchTerm,
    currentPage,
    handleNextPage,
    handlePrevPage,
    handleSearchPosts,
    isNextDisabled: !hasMorePosts,
    isPrevDisabled: currentPage === 1,
  }
}

export default usePosts
