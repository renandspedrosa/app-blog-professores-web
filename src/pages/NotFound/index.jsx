import { AlertTriangle } from 'lucide-react';
import {ButtonPrimary} from '@/components/Buttons';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <AlertTriangle className="w-16 h-16 text-red-500 md:w-20 md:h-20" />
      <h1 className="mt-4 text-2xl font-bold text-gray-800 md:text-4xl">
        404 - Página não encontrada
      </h1>
      <p className="mt-2 text-gray-600 text-center max-w-sm md:text-lg">
        Parece que você está perdido. A página que você procura não existe.
      </p>
      <Link to={'/'}>
        <ButtonPrimary>
          Voltar ao início
        </ButtonPrimary>
      </Link>
    </div>
  );
};

export default NotFound;
