import DataTable from 'react-data-table-component';
import Load from '@/components/Load';
import useTags from '@/hooks/useTagList';
import { Pagination }from '@/components/Pagination';
import { ButtonEditar, ButtonExcluir, ButtonSecondary }from '@/components/Buttons';
import checkPermission from '@/utils/checkPermission';
import Confirm from '@/components/Confirm';
import useDeleteTag from '@/hooks/useDeleteTag';
import Modal from '@/components/Modal';
import { useState } from 'react';
import { useFormik } from 'formik';
import schema  from '@/pages/Tag/schema';
import { Input, FormError } from '@/components/Form';
import useCreateTag from '@/hooks/useCreateTag';

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
  
  const { loadingCreate, formTag, handleCreateTag } = useCreateTag();

  const formik = useFormik({
    initialValues: formTag,
    validationSchema:schema,
    onSubmit: (values) => handleCreateTag(values, closeModal,handleSearchTags),
  });    

  const [isModalOpen, setModalOpen] = useState(false);
  const [titleModal, setTitleModal] = useState('');

  const openModalAdicionar = () => {
      setTitleModal('Adicionar Categoria');
      formik.setFieldValue('name', '');
      formik.setFieldTouched('name', false);
      setModalOpen(true);
  }

  const closeModal = () => setModalOpen(false);

  const {
  tags,
  error,
  loading,
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
  
  if (loading || deleteLoading || loadingCreate) {
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
        <div className='mb-4'>
          <ButtonSecondary onClick={openModalAdicionar}>Adicionar Categoria</ButtonSecondary>
        </div>
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
        
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={titleModal}
          onConfirm={formik.handleSubmit}
        >
          <Input
                label="Descrição"
                type="text"
                required
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
            />
            <FormError error={formik.touched.name && formik.errors.name} />
        </Modal>
      </>
  );
};

export default Tag;
