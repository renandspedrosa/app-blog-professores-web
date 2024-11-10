import { Search } from 'lucide-react';

const Button = ({ onClick }) => {
  return (
    <button
      className="bg-gray-400 text-white px-4 py-2 rounded-r-md flex items-center"
      type="button"
      onClick={onClick}
    >
      <Search className="w-4 h-4" />
    </button>
  )
}

export default Button;