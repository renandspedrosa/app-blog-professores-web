import { useNavigate } from 'react-router-dom'
// import { ArrowRight, Eye, MessageCircle } from 'lucide-react'
import { SearchBar } from '@/components/SearchBar'
import Load from '@/components/Load'
import usePosts from '@/hooks/usePostList'
import PostCard from '../../components/PostCard'

const PostList = () => {
  const navigate = useNavigate()
  const {
    posts,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    currentPage,
    handleNextPage,
    handleSearchPosts,
    handlePrevPage,
    isNextDisabled,
    isPrevDisabled,
  } = usePosts()

  const handleReadMore = (postId) => {
    navigate(`/posts/${postId}`)
  }

  if (loading) {
    return <Load />
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <section className='text-gray-600 body-font'>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearchPosts}
      />
      <div className='container px-5 py-24 mx-auto'>
        <div className='flex flex-wrap -m-4'>
          {posts.map((post, index) => (
            <PostCard key={index} post={post} handleReadMore={handleReadMore} />
          ))}
        </div>
        <div className='flex justify-between mt-4'>
          <button
            onClick={handlePrevPage}
            disabled={isPrevDisabled}
            className={`focus:outline-none font-medium text-sm rounded-lg border-0 mt-6 py-2 px-5 text-white  ${
              isPrevDisabled
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-indigo-600 shadow-sm hover:bg-indigo-500'
            }`}
          >
            Anterior
          </button>

          <div className='mt-4 text-center'>
            <span>Página {currentPage}</span>
          </div>

          <button
            disabled={isNextDisabled}
            onClick={handleNextPage}
            className={`focus:outline-none font-medium text-sm rounded-lg border-0 mt-6 py-2 px-5 text-white ${
              isNextDisabled
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-indigo-600 shadow-sm hover:bg-indigo-500'
            }`}
          >
            Próxima
          </button>
        </div>
      </div>
    </section>
  )
}

export default PostList
