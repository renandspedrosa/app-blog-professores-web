import DataTable from 'react-data-table-component';
import Load from '@/components/Load';
import usePosts from '@/hooks/usePostList';
import { Pagination }from '@/components/Pagination';
import { ButtonEditar, ButtonExcluir }from '@/components/Buttons';
import checkPermission from '@/utils/checkPermission';
import Confirm from '@/components/Confirm';
import useDeletePost from '@/hooks/useDeletePost';
import { SearchBar } from '@/components/SearchBar';
import formatDate from '@/utils/formatDate';

const columns = [
    {
        name: 'Título',
        selector: row => row.title.length > 50 ? `${row.title.substring(0, 20)}...` : row.title,
    },
    {
        name: 'Conteúdo',
        selector: row => row.content.length > 100 ? `${row.content.substring(0, 25)}...` : row.content,
    },
	{
		name: 'Data da Postagem',
		selector: row => formatDate(row.created_at),
	},
	{
		name: 'Autor',
		selector: row => row.teacher.user.name,
	},
	{
		name: '',
		selector: row => row.acao,
        right: "true",
	},
];

const Administrator = () => {
    const permissionComponent = checkPermission();
    if (permissionComponent) {
        return permissionComponent; 
    }

    const {
    posts,
    loading,
    error,
    currentPage,
    handleNextPage,
    handlePrevPage,
    isNextDisabled,
    isPrevDisabled,
    handleSearchPosts,
    searchTerm,
    setSearchTerm,
    tags,
    setTags,
    } = usePosts();

    const { loading: deleteLoading, handleDeletePost } = useDeletePost();
    const handleDelete = (idPost) => {
        Confirm(
            'Confirmação',
            'Tem certeza que deseja excluir essa postagem?',
            () => {
                handleDeletePost(idPost,handleSearchPosts);
            }
        );
    };
    
    if (loading || deleteLoading) {
        return <Load />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    posts.map((post) => {
        post.acao = (
            <div className="flex items-center space-x-2">
                <ButtonEditar/>
                <ButtonExcluir onClick={() => handleDelete(post.id)}/>
            </div>
        );
    });

    return (
        <>
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                tagsSearch={tags}
                setTags={setTags}
                onSearch={handleSearchPosts}
            />
            <DataTable
                columns={columns}
                data={posts}
            />
            <Pagination
                goToPrevPage={handlePrevPage}
                isPrevDisabled={isPrevDisabled}
                currentPage={currentPage}
                isNextDisabled={isNextDisabled}
                goToNextPage={handleNextPage}
            />
        </>
  );
};

export default Administrator;
