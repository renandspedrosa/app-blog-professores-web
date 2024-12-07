import { useState } from 'react';
import {json, useNavigate} from 'react-router-dom';
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
            setLoading(true);

            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('content', values.content);

            values.selectedTags.forEach((tag, index) => {
                formData.append(`tags[${index}][id]`, tag.id);
                formData.append(`tags[${index}][name]`, tag.name);
            });

            if (values.attachment) {
                formData.append('attachment', values.attachment);
            }

            await createPost(formData);

            setLoading(false);
            navigate('/', {replace: true});
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
