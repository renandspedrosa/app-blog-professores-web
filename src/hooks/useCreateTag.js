import { useState } from 'react';
import { createTag } from '@/services/tag';
import errorsMessage from '@/utils/messageError';
import { toast } from 'react-toastify';

const useCreateTag = () => {
    const [loadingCreate, setLoadingCreate] = useState(false);

    const handleCreateTag = async (values, onAction, onSuccess) => {
        try {
            if (onAction) {
                onAction();
            }
            setLoadingCreate(true);
            await createTag(values);
            setLoadingCreate(false);
            if (onSuccess) {
                onSuccess();
            }
            toast.success('Categoria criada com sucesso!');
        } catch (error) {
            setLoadingCreate(false);
            errorsMessage(error, toast);
        }
    };

    return {
        loadingCreate,
        handleCreateTag,
    };
}

export default useCreateTag;