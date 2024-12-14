import { decode } from 'jwt-js-decode'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, FormError } from '@/components/Form';
import Load from '@/components/Load';
import { useFormik } from 'formik';
import useUpdateAccountForm from '@/hooks/useUpdateAccountForm';
import schema from '@/pages/Profile/schema';

const Profile = () => {
    const token = localStorage.getItem('authToken')
    const jwt = decode(token)
    const typeUser = jwt.payload?.type
    const { loading, formUser, handleUpdateUser } = useUpdateAccountForm();
    const formik = useFormik({
        initialValues: formUser,
        validationSchema: schema,
        onSubmit: handleUpdateUser,
        enableReinitialize: true,
    });
    const userType = typeUser == 'teacher' ? 'Professor' : 'Estudante';
    const [checked, setChecked] = useState(false);

    const handleCheckboxChange = (e) => {
        setChecked(e.target.checked);
    }

    if (loading) {
        return <Load />;
    }    

    return (
        <Form title={`Informações de Cadastro do ${userType}`} onSubmit={formik.handleSubmit}>
            <div className="border-b border-gray-900/7 pb-12">
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
                    <div className="sm:col-span-3">
                        <label 
                            htmlFor='requirePassword'
                            className='text-sm/6 font-medium text-gray-900'
                        >
                            Deseja alterar a senha?
                        </label>
                        <br />
                        <input 
                            type='checkbox'
                            name='requirePassword'   
                            checked={checked}
                            onChange={handleCheckboxChange}
                        />                        
                    </div>
                </div>
                {checked && (
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                )}                                
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link to="/" className="text-sm font-semibold text-gray-900">Cancelar</Link>
                <Button type="submit" disabled={loading}>
                    {loading ? 'Atualizando...' : 'Atualizar'}
                </Button>
            </div>
        </Form>
    );
};

export default Profile;