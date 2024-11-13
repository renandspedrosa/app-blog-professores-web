import { Link } from 'react-router-dom';
import { Content, Input, Button, Select } from '@/components/Form';
import Load from '@/components/Load';
import useCreateAccountForm from '@/hooks/useCreateAccountForm';

const CreateAccount = () => {
    const optionsSelect = [
        { value: '1', label: 'Professor' },
        { value: '2', label: 'Aluno' }
    ];

    const { loading, formUser, handleChange, handleCreateUser } = useCreateAccountForm();

    if (loading) {
        return <Load />;
    }

    return (
        <Content submit={handleCreateUser}>
            <div className="border-b border-gray-900/7 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <Select
                            label="Tipo de usuário"
                            options={optionsSelect}
                            required
                            value={formUser.typeUser}
                            onChange={(e) => handleChange('typeUser', e.target.value)}
                        />
                    </div>
                </div>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <Input
                            label="Nome"
                            type="text"
                            required
                            value={formUser.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-3">
                        <Input
                            label="E-mail"
                            type="email"
                            required
                            value={formUser.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                        />
                    </div>
                </div>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <Input
                            label="Senha"
                            type="password"
                            required
                            value={formUser.password}
                            onChange={(e) => handleChange('password', e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-3">
                        <Input
                            label="Confirmar senha"
                            type="password"
                            required
                            value={formUser.confirmPassword}
                            onChange={(e) => handleChange('confirmPassword', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link to="/" className="text-sm font-semibold text-gray-900">Cancel</Link>
                <Button>Salvar</Button>
            </div>
        </Content>
    );
};

export default CreateAccount;
