import { Search } from 'lucide-react'

function InputSearch(props) {
    return (
      <div className="flex border border-slate-300 rounded-md">
        <input
          type="text"
          className="border-0 outline-slate-400 px-4 py-2 pl-10 pr-0 rounded-l-md w-full"
          {...props}
        />
        <button
          className="bg-gray-400 text-white px-4 py-2 rounded-r-md flex items-center"
          type="button"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>
    );
  }
  
  export default InputSearch;
  