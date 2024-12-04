
import * as Yup from 'yup';

const schema = Yup.object({
    name: Yup.string().required('Nome é obrigatório'),
})

export default schema;