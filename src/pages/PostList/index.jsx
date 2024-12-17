import PostCard from '@/components/PostCard/PostCard'
import { SearchBar } from '@/components/SearchBar'
import { Pagination } from '@/components/Pagination'
import Load from '@/components/Load'
import usePosts from '@/hooks/usePostList'
import NoPosts from '@/components/NoPosts'

const PostList = () => {
  const {
    posts,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    handleSearchPosts,
    currentPage,
    handleNextPage,
    handlePrevPage,
    isNextDisabled,
    isPrevDisabled,
    handlePostViewed,
    tags,
    setTags,
  } = usePosts()

  if (loading) {
    return <Load />
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <section className='text-gray-600 body-font'>
      {posts.length > 0 ? (
        <>
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
                  handlePostViewed={handlePostViewed}
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
        </>
      ) : (
        <NoPosts />
      )}
    </section>
  )
}

export default PostList
