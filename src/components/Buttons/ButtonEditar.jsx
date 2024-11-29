import { Edit } from 'lucide-react';

function ButtonEditar(props) {
  return (
      <button 
            {...props}
            className="text-white bg-blue-500 hover:bg-blue-600 focus:outline-none rounded-full p-1.5 text-sm transition-transform transform hover:scale-105"
            aria-label="Edit"
      >
          <Edit className="w-4 h-4" />
      </button>
  );
}

export default ButtonEditar;
