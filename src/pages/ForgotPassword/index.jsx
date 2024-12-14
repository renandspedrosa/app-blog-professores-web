import { Form, Input, Button, FormError } from '@/components/Form';
import { useFormik } from 'formik';
import Load from '@/components/Load';
import schema  from './schema';
import useResetPassword from '@/hooks/useResetPassword';

const ForgotPassword = () => {
    const { loading, sendEmail, error } = useResetPassword();

    const formik = useFormik({
        initialValues: { email: '' },
        validationSchema:schema,
        onSubmit: (values) => {
            sendEmail(values);
        }
    });    

    if (loading) {
        return <Load />;
    }

    return (
        <Form onSubmit={formik.handleSubmit}>
            <div className="mt-0 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                    <Input
                        label="E-mail"
                        type="email"
                        required
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && formik.errors.email}
                    />
                    <FormError error={formik.touched.email && formik.errors.email || error} />
                </div>
                <div className="sm:col-span-2 pt-8">
                    <Button type="submit" disabled={loading}>Recuperar senha</Button>
                </div>
            </div>
        </Form>
    )

}

export default ForgotPassword;