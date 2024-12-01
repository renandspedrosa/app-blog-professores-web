import { useState } from 'react';
import { deletePost } from '@/services/post';
import errorsMessage from '@/utils/messageError';
import { toast } from 'react-toastify';
const useDeletePost = () => {
    const [loading, setLoading] = useState(false);
    const handleDeletePost = async (postId, callback) => {
        try {
            setLoading(true);
            await deletePost(postId);
            setLoading(false);
            toast.success('Postagem deletada com sucesso!');
            if (callback) {
                callback();
            }
        } catch (error) {
            setLoading(false);
            errorsMessage(error, toast);
        }
    };
    return {
        loading,
        handleDeletePost,
    };
};
export default useDeletePost;