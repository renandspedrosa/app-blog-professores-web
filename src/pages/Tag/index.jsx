import DataTable from 'react-data-table-component';
import Load from '@/components/Load';
import useTags from '@/hooks/useTagList';
import { Pagination }from '@/components/Pagination';
import { ButtonEditar, ButtonExcluir }from '@/components/Buttons';
import checkPermission from '@/utils/checkPermission';
import Confirm from '@/components/Confirm';
import useDeleteTag from '@/hooks/useDeleteTag';

const columns = [
    {
        name: 'Descrição',
        selector: row => row.name,
    },
    {
        name: '',
        selector: row => row.acao,
        right: "true",
    },
];

const Tag = () => {
    const permissionComponent = checkPermission();
    if (permissionComponent) {
        return permissionComponent; 
    }

    const {
    tags,
    loading,
    error,
    currentPage,
    handleNextPage,
    handlePrevPage,
    isNextDisabled,
    isPrevDisabled,
    handleSearchTags,
    } = useTags();

    const { loading: deleteLoading, handleDeleteTag } = useDeleteTag();
    const handleDelete = (idTag) => {
        Confirm(
            'Confirmação',
            'Tem certeza que deseja excluir essa categoria?',
            () => {
                handleDeleteTag(idTag,handleSearchTags);
            }
        );
    };
    
    if (loading || deleteLoading) {
        return <Load />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    tags.map((tag) => {
        tag.acao = (
            <div className="flex items-center space-x-2">
                <ButtonEditar/>
                <ButtonExcluir onClick={() => handleDelete(tag.id)}/>
            </div>
        );
    });

    return (
        <>
            <DataTable
                columns={columns}
                data={tags}
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

export default Tag;
