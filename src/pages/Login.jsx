import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../axiosConfig';
import { useAuth } from '../context/AuthContext';
import Load from '../components/Load';
import FormContent  from '../components/FormContent';
import Input from '../components/FormInput';
import Button from '../components/FormButton';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // Pega a função de login do contexto
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/'; // Redireciona para a página anterior ou para o admin

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await api.post('/user/signin', credentials);
      const token = response.data.token;
      login(token); // Chama a função de login do contexto
      navigate(from, { replace: true }); // Redireciona para a página de origem
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErrorMessage('Falha no login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Load/>;
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-gray-900">Bem-vindo ao Blog dos Professores!</h1>
          <p className="leading-relaxed mt-4">
              Este espaço é exclusivo para os professores compartilharem suas ideias, artigos e conteúdos educacionais.<br /> 
              Aqui você pode:
              <ul className="list-disc ml-5 mt-2">
                <li>Publicar conteúdos relevantes sobre educação e temas de interesse acadêmico.</li>
                <li>Acompanhar as últimas atualizações da comunidade de professores.</li>
              </ul>
            </p>
        </div>
          <FormContent title={'Login'} submit={handleSubmit}>
            <div className="relative mb-4">
              <Input label={'E-mail'} value={credentials.email}  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}  type="email" required='true'/>
            </div>
            <div className="relative mb-4">
                <Input label={'Senha'} value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} required="true" type="password"  />
            </div>
            <Button>Entrar</Button>
            <p className="text-gray-500 mt-3">cadastre - se</p>
            {errorMessage && (
                <div className="mb-4 text-red-500 text-sm">
                  {errorMessage}
                </div>
              )} 
          </FormContent>
       </div>
    </section> 
  );
};

export default Login;
