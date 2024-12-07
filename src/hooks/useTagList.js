import { useEffect, useState } from 'react'
import { getTags } from '@/services/tag'

const useTags = (initialPage = 1, tagsPerPage = 6) => {
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(initialPage)

  const handleSearchTags = async () => {
    try {
      setLoading(true)
      const search = searchTerm || ''
      const { data } = await getTags(currentPage, tagsPerPage, search)
      setTags(data)
    } catch (error) {
      console.error('Erro ao buscar tags:', error)
      setError('Ocorreu um erro ao carregar os tags.')
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleSearchTags()
  }, [currentPage])

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
  }

  return {
    tags,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    currentPage,
    handleNextPage,
    handlePrevPage,
    handleSearchTags,
    isNextDisabled: Math.ceil(tags.length / tagsPerPage) < currentPage,
    isPrevDisabled: currentPage === 1,
  }
}

export default useTags
