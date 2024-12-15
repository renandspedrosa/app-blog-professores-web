import { Form, Input, Button, FormError } from '@/components/Form';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import Load from '@/components/Load';
import schema  from './schema';
import useResetPassword from '@/hooks/useResetPassword';
import { use } from 'react';

const ResetPassword = () => {
    const { token } = useParams();
    const { loading, error, formPassword, setToken, handleResetPassword } = useResetPassword();
    useEffect(() => {
        if (token) {
            setToken(token);
        }
    }, [token, setToken]);

    const formik = useFormik({
        initialValues: formPassword,
        enableReinitialize: true,
        validationSchema:schema,
        onSubmit: handleResetPassword
    });    

    if (loading) {
        return <Load />;
    }

    return (
        <Form onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                    <Input
                        label="Senha"
                        type="password"                        
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
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    /> 
                    <FormError error={formik.touched.confirmPassword && formik.errors.confirmPassword} />
                </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link to="/" className="text-sm font-semibold text-gray-900">Cancelar</Link>
                <Button type="submit">Salvar</Button>
            </div>
        </Form>
    )

}

export default ResetPassword;