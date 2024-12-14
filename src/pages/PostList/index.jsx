import PostCard from '@/components/PostCard/PostCard'
import { useNavigate } from 'react-router-dom'
import { SearchBar } from '@/components/SearchBar'
import { Pagination } from '@/components/Pagination'
import Load from '@/components/Load'
import usePosts from '@/hooks/usePostList'

const PostList = () => {
  const navigate = useNavigate()

  const {
    posts,
    loading,
    error,
    searchTerm,
    handlePostViewed,
    setSearchTerm,
    handleSearchPosts,
    currentPage,
    handleNextPage,
    handlePrevPage,
    isNextDisabled,
    isPrevDisabled,
    tags,
    setTags,
  } = usePosts()

  const handleReadMore = (post) => {
    handlePostViewed(post.id)
    navigate(`/posts/${post.id}`, { state: { post } })
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
        tagsSearch={tags}
        setTags={setTags}
      />
      <div className='container px-5 py-8 mx-auto'>
        <div className='flex flex-wrap -m-4'>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              handleReadMore={handleReadMore}
            />
          ))}
        </div>
        <Pagination
          goToPrevPage={handlePrevPage}
          isPrevDisabled={isPrevDisabled}
          currentPage={currentPage}
          isNextDisabled={isNextDisabled}
          goToNextPage={handleNextPage}
        />
      </div>
    </section>
  )
}

export default PostList
