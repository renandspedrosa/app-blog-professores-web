import { Lock } from 'lucide-react';
import { Button } from '@/components/Form';
import { Link } from 'react-router-dom';

const NoPermission = () => {
  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100 text-gray-800 text-center">
      <div className="absolute inset-0 top-36 bg-gray-900 opacity-40 backdrop-blur-sm"></div>
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <Lock className="text-red-500 text-6xl mb-4" />
        <h2 className="text-4xl font-semibold text-red-600 mb-4">Acesso Negado</h2>
        <p className="text-lg text-gray-600 mb-6">
          Você não tem permissão para acessar esta página.
        </p>
        <Link to={'/'}>
          <Button color="red">
            Voltar à Página Inicial
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NoPermission;