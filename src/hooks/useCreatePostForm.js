import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '@/services/post'; // Serviço de criação de post
import errorsMessage from '@/utils/messageError';
import { toast } from 'react-toastify';

const useCreatePostForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formPost, setFormPost] = useState({
        postType: '1',
        title: '',
        content: ''
    });

    const handleChange = (field, value) => {
        setFormPost(prevState => ({
            ...prevState,
            [field]: value,
        }));
    };

    const handleCreatePost = async (values) => {
        try {
            setLoading(true);
            await createPost(values); // Envia os dados ao serviço de criação de post

            setLoading(false);
            navigate('/posts', { replace: true }); // Redireciona para a lista de posts
            toast.success('Post criado com sucesso!');
        } catch (error) {
            setLoading(false);
            errorsMessage(error, toast); // Exibe mensagem de erro
        }
    };

    return {
        loading,
        formPost,
        handleChange,
        handleCreatePost,
    };
};

export default useCreatePostForm;
