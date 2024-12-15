
import * as Yup from 'yup';

const schema = Yup.object({
    email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
})

export default schema;