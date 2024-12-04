import { useState } from 'react';
import { updateTag } from '@/services/tag';
import errorsMessage from '@/utils/messageError';
import { toast } from 'react-toastify';

const useUpdateTag = () => {
    const [loadingUpdate, setLoadingUpdate] = useState(false);

    const handleUpdateTag = async (values, onAction, onSuccess) => {
        try {
            if (onAction) {
                onAction();
            }
            setLoadingUpdate(true);
            await updateTag(values);
            setLoadingUpdate(false);
            if (onSuccess) {
                onSuccess();
            }
            toast.success('Categoria atualizada com sucesso!');
        } catch (error) {
            setLoadingUpdate(false);
            errorsMessage(error, toast);
        }
    };

    return {
        loadingUpdate,
        handleUpdateTag,
    };
}

export default useUpdateTag;