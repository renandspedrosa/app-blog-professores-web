import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '@/services/post';
import errorsMessage from '@/utils/messageError';
import { toast } from 'react-toastify';

const useCreatePostForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formPost, setFormPost] = useState({
        postType: '1',
        title: '',
        content: '',
        attachment: null,
    });

    const handleChange = (field, value) => {
        setFormPost((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const handleFileChange = (file) => {
        setFormPost((prevState) => ({
            ...prevState,
            attachment: file,
        }));
    };

    const handleCreatePost = async (values) => {
            try {
            setLoading(true);  // Ativa o carregamento

            // Cria uma instância de FormData
            const formData = new FormData();
            formData.append('title', values.title);  // Adiciona o título
            formData.append('content', values.content);  // Adiciona o conteúdo
            formData.append('teacher_id', 156);  // Adiciona o conteúdo

            if (values.attachment) {
                formData.append('attachment', values.attachment);  // Adiciona o arquivo
            } else {

            }


            await createPost(formData);

            setLoading(false);  // Desativa o carregamento
            navigate('/', { replace: true });  // Redireciona para a página inicial
            toast.success('Post criado com sucesso!');  // Exibe uma mensagem de sucesso

        } catch (error) {
            setLoading(false);  // Desativa o carregamento em caso de erro
            errorsMessage(error, toast);  // Exibe a mensagem de erro
        }
    };



    return {
        loading,
        formPost,
        handleChange,
        handleFileChange,
        handleCreatePost,
    };
};

export default useCreatePostForm;
