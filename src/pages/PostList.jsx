import { useEffect, useState } from 'react';
import { getPosts } from '../services/postService'; // Importe a função de serviço que usamos anteriormente
import { useNavigate } from 'react-router-dom'; // Importando useNavigate
import { ArrowRight, Eye, MessageCircle } from 'lucide-react'
import Load from '../components/Load';
import InputSearch from '../components/InputSearch';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6; // Alterado para 5 posts por página

  const navigate = useNavigate(); // Usado para redirecionamento

  useEffect(() => {
    // Função para buscar os posts da API
    const fetchPosts = async (page) => {
      try {
        setLoading(true);
        const { data } = await getPosts(page, postsPerPage); // Ajuste para receber total
        setPosts(data); // Atualiza o estado com os posts retornados
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
        setError('Ocorreu um erro ao carregar os posts.');
        setLoading(false);
      }
    };

    fetchPosts(currentPage); // Chama a função de busca
  }, [currentPage]);

  const handleNextPage = async () => {
    const nextPage = currentPage + 1;
    const { data } = await getPosts(nextPage, postsPerPage); // Verifica se há posts na próxima página

    if (data.length > 0) {
      setCurrentPage(nextPage); // Apenas atualiza a página se houver posts
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1)); // Decrementa a página atual, mas garante que não seja menor que 1
  };

  const handleReadMore = (postId) => {
    navigate(`/posts/${postId}`); // Redireciona para a página detalhada do post
  };

  const isNextDisabled = posts.length < postsPerPage; // Desabilitar próximo se não houver mais posts
  const isPrevDisabled = currentPage === 1; // Desabilitar anterior se estiver na primeira página

  if (loading) {
    return <Load/>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="text-gray-600 body-font">
      <InputSearch  placeholder="Buscar por postagens" />
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {posts.map((post, index) => (
            <div className="p-4 sm:w-1/2 md:w-1/3 w-full min-w-[300px] sm:min-w-[350px]" key={index}>
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden flex flex-col" style={{ minHeight: '400px' }}>
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
                    <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer" onClick={() => handleReadMore(post.id)}>
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
        <div className="flex justify-between mt-4">
          <button 
                onClick={handlePrevPage} 
                disabled={isPrevDisabled} 
                className={`focus:outline-none font-medium rounded-lg border-0 mt-6 py-2 px-5 text-white ${isPrevDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-800'}`}>
                  Anterior
          </button>

          <div className="mt-4 text-center">
              <span>Página {currentPage}</span>
          </div>

          <button 
                disabled={isNextDisabled} 
                onClick={handleNextPage} 
                className={`focus:outline-none font-medium rounded-lg border-0 mt-6 py-2 px-5 text-white ${isNextDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-800'}`}>
                  Próxima
          </button>
        </div>
      </div>
    </section>
  );
};

export default PostList;
