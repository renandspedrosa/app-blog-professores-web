
import * as Yup from 'yup';

const schema = Yup.object({
    password: Yup.string().required('Senha é obrigatória'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'As senhas não conferem')
        .required('Confirmação de senha é obrigatória'),
})

export default schema;