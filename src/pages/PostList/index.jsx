import { useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, MessageCircle } from 'lucide-react';
import { SearchBar } from '@/components/SearchBar';
import { Pagination }from '@/components/Pagination';
import Load from '@/components/Load';
import usePosts from '@/hooks/usePostList';
import checkPermission from '@/utils/checkPermission';


const PostList = () => {
  // Verifica a permissão
  const permissionComponent = checkPermission();
  if (permissionComponent) {
    return permissionComponent; 
  }
  
  const navigate = useNavigate();
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
  } = usePosts();

  const handleReadMore = (postId) => {
    navigate(`/posts/${postId}`);
  };

  if (loading) {
    return <Load />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="text-gray-600 body-font">
      <SearchBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearchPosts}         
      />
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {posts.map((post, index) => (
            <div className="p-4 sm:w-1/2 md:w-1/3 w-full min-w-[300px] sm:min-w-[350px]" key={index}>
              <div className="bg-white h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden flex flex-col" style={{ minHeight: '400px' }}>
                {post.path_img && (
                  <img
                    className="lg:h-48 md:h-36 w-full object-cover object-center flex-shrink-0"
                    src={post.path_img}
                    alt={post.title}
                    style={{ maxHeight: '300px' }}
                  />
                )}
                <div className="p-6 flex-1">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    {post.tags.map(tag => tag.name).join(', ').toUpperCase()}
                  </h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                    {post.title}
                  </h1>
                  <p className="leading-relaxed mb-3">{post.content.length > 100 ? `${post.content.substring(0, 100)} [ ... ]` : post.content}</p>
                  <div className="flex items-center flex-wrap">
                    <a className="text-indigo-600 hover:text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer" onClick={() => handleReadMore(post.id)}>
                      Leia mais
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </a>
                    <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                      <Eye size={18} strokeWidth={1.6} className="mr-1" />
                      0 {/*post.views*/}
                    </span>
                    <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                      <MessageCircle size={15.5} strokeWidth={2.1} className="mr-1" />
                      0 {/*post.comments*/}
                    </span>
                  </div>
                </div>
              </div>
            </div>
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
  );
};

export default PostList;
