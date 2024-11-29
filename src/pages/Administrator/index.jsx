import DataTable from 'react-data-table-component';
import Load from '@/components/Load';
import usePosts from '@/hooks/usePostList';
import { Pagination }from '@/components/Pagination';
import { ButtonEditar, ButtonExcluir }from '@/components/Buttons';

const columns = [
	{
		name: 'Título',
		selector: row => row.title,
	},
	{
		name: 'Conteúdo',
		selector: row => row.content,
	},
	{
		name: '',
		selector: row => row.acao,
        right: true,
	},
];

const Administrator = () => {
    const {
    posts,
    loading,
    error,
    currentPage,
    handleNextPage,
    handlePrevPage,
    isNextDisabled,
    isPrevDisabled,
    } = usePosts();

    if (loading) {
        return <Load />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    posts.map((post) => {
        post.acao = (
            <div className="flex items-center space-x-2">
                <ButtonEditar/>
                <ButtonExcluir/>
            </div>
        );
    });

    return (
        <>
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
