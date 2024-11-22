import { Link } from 'react-router-dom';
import { Form, Input, Button, Select, FormError } from '@/components/Form';
import Load from '@/components/Load';
import { useFormik } from 'formik';
import useCreateAccountForm from '@/hooks/useCreateAccountForm';
import schema  from '@/pages/CreateAccount/schema';

const CreateAccount = () => {
    const optionsSelect = [
        { value: '1', label: 'Professor' },
        { value: '2', label: 'Aluno' }
    ];

    const { loading, formUser, handleCreateUser } = useCreateAccountForm();

    const formik = useFormik({
        initialValues: formUser,
        validationSchema:schema,
        onSubmit: handleCreateUser,
    });    

    if (loading) {
        return <Load />;
    }

    return (
        <Form onSubmit={formik.handleSubmit}>
            <div className="border-b border-gray-900/7 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <Select
                            label="Tipo de usuário"
                            options={optionsSelect}
                            required
                            name="typeUser"
                            value={formik.values.typeUser}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.typeUser && formik.errors.typeUser}
                        />
                        <FormError error={formik.touched.typeUser && formik.errors.typeUser} />
                    </div>
                </div>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <Input
                            label="Nome"
                            type="text"
                            required
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && formik.errors.name}
                        />
                        <FormError error={formik.touched.name && formik.errors.name} />
                    </div>
                    <div className="sm:col-span-3">
                        <Input
                            label="E-mail"
                            type="email"
                            required
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && formik.errors.email}
                        />
                        <FormError error={formik.touched.email && formik.errors.email} />
                    </div>
                </div>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <Input
                            label="Senha"
                            type="password"
                            required
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && formik.errors.password}
                        />
                        <FormError error={formik.touched.password && formik.errors.password} />
                    </div>
                    <div className="sm:col-span-3">
                        <Input
                            label="Confirmar senha"
                            type="password"
                            required
                            name="confirmPassword"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        />
                        <FormError error={formik.touched.confirmPassword && formik.errors.confirmPassword} />
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link to="/" className="text-sm font-semibold text-gray-900">Cancel</Link>
                <Button type="submit" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar'}
        </Button>
            </div>
        </Form>
    );
};

export default CreateAccount;
