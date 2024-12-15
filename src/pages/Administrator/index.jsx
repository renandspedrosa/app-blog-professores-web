import DataTable from 'react-data-table-component';
import Load from '@/components/Load';
import usePosts from '@/hooks/usePostList';
import { Pagination } from '@/components/Pagination';
import { ButtonEditar, ButtonExcluir } from '@/components/Buttons';
import checkPermission from '@/utils/checkPermission';
import Confirm from '@/components/Confirm';
import useDeletePost from '@/hooks/useDeletePost';
import Modal from '@/components/Modal';
import { Input, FormError } from '@/components/Form';
import { useState } from 'react';
import { useFormik } from 'formik';
import { getPostById, updatePost } from '@/services/post';
import Select from 'react-select';
import useTags from '@/hooks/useTagList';
import { SearchBar } from '@/components/SearchBar';
import formatDate from '@/utils/formatDate';

const host = import.meta.env.VITE_API_HOST || 'http://localhost:3000'

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
        name: 'Categoria',
        selector: row => row.tags.map(tag => tag.name).join(', '),
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

    const [postToEdit, setPostToEdit] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [titleModal, setTitleModal] = useState('');

    const { tags:tagList,  loading: tagsLoading, error: tagsError } = useTags();

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
        Confirm('Confirmação', 'Tem certeza que deseja excluir essa postagem?', () => {
            handleDeletePost(idPost, handleSearchPosts);
        });
    };

    const openModalEditar = async (postId) => {
        setTitleModal('Editar Post');
        const post = await getPostById(postId);
        setPostToEdit({
            ...post,
            selectedTags: post.tags?.map(tag => ({ value: tag.id, label: tag.name })) || [],
        });
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setPostToEdit(null);
    };

    const formik = useFormik({
        initialValues: {
            title: postToEdit?.title || '',
            content: postToEdit?.content || '',
            attachment: postToEdit?.path_img || null,
            selectedTags: postToEdit?.selectedTags || [],
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                formData.append('title', values.title);
                formData.append('content', values.content);
                values.selectedTags.forEach((tag, index) => {
                    formData.append(`tags[${index}][id]`, tag.value);
                    formData.append(`tags[${index}][name]`, tag.label);
                });
                if (values.attachmentImg && values.attachmentImg !== postToEdit?.path_img) {
                    formData.append('attachment', values.attachmentImg);
                }
                console.log('formData', formData);

                await updatePost(postToEdit.id, formData);
                handleSearchPosts();
                closeModal();
            } catch (error) {
                console.error('Erro ao editar o post:', error);
            }
        },
    });



    if (loading || deleteLoading) {
        return <Load />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const postsWithActions = posts.map((post) => ({
        ...post,
        acao: (
            <div className="flex items-center space-x-2">
                <ButtonEditar onClick={() => openModalEditar(post.id)} />
                <ButtonExcluir onClick={() => handleDelete(post.id)} />
            </div>
        ),
    }));

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
                data={postsWithActions}
            />
            <Pagination
                goToPrevPage={handlePrevPage}
                isPrevDisabled={isPrevDisabled}
                currentPage={currentPage}
                isNextDisabled={isNextDisabled}
                goToNextPage={handleNextPage}
            />

            <Modal isOpen={isModalOpen} onClose={closeModal} title={titleModal} onConfirm={formik.handleSubmit}>
                {postToEdit?.path_img && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-900">
                            Imagem Atual
                        </label>
                        <img
                            src={host+'/'+postToEdit.path_img}
                            alt="Imagem do Post"
                            className="mt-2 max-w-full h-auto rounded"
                            style={{ maxHeight: '300px' }}
                        />
                    </div>
                )}

                <Input
                    label="Título"
                    type="text"
                    required
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                />
                <FormError error={formik.touched.title && formik.errors.title} />

                <Input
                    label="Conteúdo"
                    type="text"
                    required
                    name="content"
                    value={formik.values.content}
                    onChange={formik.handleChange}
                />
                <FormError error={formik.touched.content && formik.errors.content} />

                <label htmlFor="tags" className="block text-sm font-medium text-gray-900">
                    Tags
                </label>
                <Select
                    id="tags"
                    name="tags"
                    options={tagList.map((tag) => ({ value: tag.id, label: tag.name }))}
                    isMulti
                    isLoading={tagsLoading}
                    value={formik.values.selectedTags}
                    onChange={(selectedOptions) =>
                        formik.setFieldValue('selectedTags', selectedOptions)
                    }
                    placeholder="Selecione tags..."
                />
                {tagsError && <p className="text-red-600 text-sm mt-2">{tagsError}</p>}
                <FormError error={formik.touched.selectedTags && formik.errors.selectedTags} />

                <label htmlFor="attachmentImg" className="block text-sm font-medium text-gray-900 mt-4">
                    Anexo
                </label>
                <input
                    id="attachmentImg"
                    name="attachmentImg"
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                        formik.setFieldValue('attachmentImg', event.currentTarget.files[0])
                    }
                    onBlur={formik.handleBlur}
                />
            </Modal>
        </>
    );
};

export default Administrator;
