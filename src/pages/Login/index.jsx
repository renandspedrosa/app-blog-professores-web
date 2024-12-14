import { Link } from 'react-router-dom';
import Load from '@/components/Load';
import { Form, Input, Button } from '@/components/Form';
import useLogin from '@/hooks/useLogin';

const Login = () => {
  const { credentials, setCredentials, errorMessage, loading, handleLogin } = useLogin();

  if (loading) {
    return <Load />;
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-gray-900">Bem-vindo ao Blog dos Professores!</h1>
          <div className="leading-relaxed mt-4">
            <p>Este espaço é exclusivo para os professores compartilharem suas ideias, artigos e conteúdos educacionais.</p>
            <p>Aqui você pode:</p>
            <ul className="list-disc ml-5 mt-2">
              <li>Publicar conteúdos relevantes sobre educação e temas de interesse acadêmico.</li>
              <li>Acompanhar as últimas atualizações da comunidade de professores.</li>
            </ul>
          </div>
        </div>
        <Form title={'Entre na sua conta'} onSubmit={handleLogin} styles={'lg:w-2/6 md:w-1/2 '}>
          <div className="relative mb-4">
            <Input
              label={'E-mail'}
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              type="email"
              required={true}
            />
          </div>
          <div className="relative mb-4">
            <Input
              label={'Senha'}
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required={true}
              type="password"
              title={'Esqueceu sua senha?'}
              href={'/redefinir-senha'}
            />
          </div>
          <Button title={'Entre na sua conta'} type="submit">Entrar</Button>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Não tem uma conta?{' '}
            <Link to="/criar-conta" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Registre-se agora
            </Link>
          </p>
          {errorMessage && (
            <div className="mb-4 text-red-500 text-sm">
              {errorMessage}
            </div>
          )}
        </Form>
      </div>
    </section>
  );
};

export default Login;
