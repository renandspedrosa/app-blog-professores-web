import * as Yup from 'yup';

const schema = Yup.object({
    title: Yup.string()
        .required('O título é obrigatório')
        .max(100, 'O título pode ter no máximo 100 caracteres'),
    content: Yup.string()
        .required('O conteúdo é obrigatório')
        .min(10, 'O conteúdo deve ter no mínimo 10 caracteres'),
    attachment: Yup.mixed()
        .nullable() // Permite que o campo seja opcional
        .test(
            'fileType',
            'O arquivo deve ser uma imagem (jpg, jpeg, png, gif)',
            (value) => {
                if (!value) return true;
                return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
            }
        )
        .test(
            'fileSize',
            'O arquivo não pode exceder 5MB',
            (value) => {
                if (!value) return true;
                return value.size <= 5 * 1024 * 1024;
            }
        ),
});

export default schema;
