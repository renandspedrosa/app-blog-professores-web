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
        console.log('Valores recebidos pelo Formik:', values);

        try {
            setLoading(true);

            // // Cria uma instância de FormData
            // const formData = new FormData();
            // formData.append('title', values.title);
            // formData.append('content', values.content);
            //
            // // Se houver um arquivo de anexo, adicione ao FormData
            // if (values.attachment) {
            //     formData.append('attachment', values.attachment);
            // }
            //
            // // Log do FormData para debug
            // for (const [key, value] of formData.entries()) {
            //     console.log(`${key}:`, value);
            // }

            await createPost(values);

            setLoading(false);
            navigate('/', { replace: true });
            toast.success('Post criado com sucesso!');
        } catch (error) {
            setLoading(false);
            errorsMessage(error, toast);
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
