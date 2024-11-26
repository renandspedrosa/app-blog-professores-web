import * as Yup from 'yup';

const schema = Yup.object({
    title: Yup.string()
        .required('O título é obrigatório')
        .max(100, 'O título pode ter no máximo 100 caracteres'),
    content: Yup.string()
        .required('O conteúdo é obrigatório')
        .min(10, 'O conteúdo deve ter no mínimo 10 caracteres'),
});

export default schema;
