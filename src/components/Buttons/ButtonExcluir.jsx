import { Trash } from 'lucide-react';

function ButtonExcluir(props) {
  return (
      <button 
          {...props}
            className={ props.css + ` text-white bg-red-500 hover:bg-red-600 focus:outline-none rounded-full p-1.5 text-sm transition-transform transform hover:scale-105`}
            aria-label="Delete"
      >
          <Trash className="w-4 h-4" />
      </button>
  );
}

export default ButtonExcluir;
