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
    const permissionComponent = checkPermission();
    if (permissionComponent) {
        return permissionComponent;
    }

    const [postToEdit, setPostToEdit] = useState(null); // Post a ser editado
    const [isModalOpen, setModalOpen] = useState(false); // Controle de visibilidade da modal
    const [titleModal, setTitleModal] = useState('');

    const {
        posts, loading, error, currentPage, handleNextPage, handlePrevPage, isNextDisabled, isPrevDisabled, handleSearchPosts
    } = usePosts();

    const { loading: deleteLoading, handleDeletePost } = useDeletePost();

    // Função para deletar o post
    const handleDelete = (idPost) => {
        Confirm('Confirmação', 'Tem certeza que deseja excluir essa postagem?', () => {
            handleDeletePost(idPost, handleSearchPosts);
        });
    };

    // Função para abrir o modal de edição
    const openModalEditar = async (postId) => {
        setTitleModal('Editar Post');
        const post = await getPostById(postId);
        setPostToEdit(post);
        setModalOpen(true);
    };

    // Função para fechar o modal
    const closeModal = () => {
        setModalOpen(false);
        setPostToEdit(null); // Limpa o post ao fechar a modal
    };

    // Formik para lidar com o formulário de edição
    const formik = useFormik({
        initialValues: {
            title: postToEdit?.title || '',
            content: postToEdit?.content || '',
        },
        enableReinitialize: true, // Reinicializa os valores sempre que postToEdit mudar
        onSubmit: async (values) => {
            try {
                await updatePost(postToEdit.id, values);
                handleSearchPosts(); // Atualiza a lista de posts após a edição
                closeModal(); // Fecha a modal
            } catch (error) {
                console.error('Erro ao editar o post:', error);
            }
        },
    });

    // Caso a página esteja carregando ou excluindo um post, exibe o componente de carregamento
    if (loading || deleteLoading) {
        return <Load />;
    }

    // Caso haja erro ao buscar os posts, exibe a mensagem de erro
    if (error) {
        return <p>{error}</p>;
    }

    // Adiciona as ações de editar e excluir aos posts
    const postsWithActions = posts.map((post) => ({
        ...post,
        acao: (
            <div className="flex items-center space-x-2">
                <ButtonEditar onClick={() => openModalEditar(post.id)} /> {/* Botão de editar */}
                <ButtonExcluir onClick={() => handleDelete(post.id)} /> {/* Botão de excluir */}
            </div>
        ),
    }));

    return (
        <>
            <DataTable columns={columns} data={postsWithActions} />

            <Pagination
                goToPrevPage={handlePrevPage}
                isPrevDisabled={isPrevDisabled}
                currentPage={currentPage}
                isNextDisabled={isNextDisabled}
                goToNextPage={handleNextPage}
            />

            {/* Modal para edição do post */}
            <Modal isOpen={isModalOpen} onClose={closeModal} title={titleModal} onConfirm={formik.handleSubmit}>
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
            </Modal>
        </>
    );
};

export default Administrator;
