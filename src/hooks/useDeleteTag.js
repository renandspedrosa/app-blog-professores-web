import { useState } from 'react';
import { deleteTag } from '@/services/tag';
import errorsMessage from '@/utils/messageError';
import { toast } from 'react-toastify';
const useDeleteTag = () => {
    const [loading, setLoading] = useState(false);
    const handleDeleteTag = async (tagId, callback) => {
        try {
            setLoading(true);
            await deleteTag(tagId);
            setLoading(false);
            toast.success('Categoria deletada com sucesso!');
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
        handleDeleteTag,
    };
};
export default useDeleteTag;