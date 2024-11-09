import { Search } from 'lucide-react';

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  }

  return (
    <div className="flex border border-slate-300 rounded-md mb-4">
        <input
          id="search"
          type="text"
          className="border-0 outline-slate-400 px-4 py-2 pl-10 pr-0 rounded-l-md w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por postagens"
          onKeyDown={handleKeyPress}
        />
        <button
          className="bg-gray-400 text-white px-4 py-2 rounded-r-md flex items-center"
          type="button"
          onClick={handleSearchClick}
        >
          <Search className="w-4 h-4" />
        </button>
    </div>
  )
}

export default SearchBar;