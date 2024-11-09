
import Input from './Input';
import Button from './Button';
import { handleKeyPress, handleSearchClick } from './functions';

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {

  return (
    <div className="flex border border-slate-300 rounded-md mb-4">
        <Input 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          onKeyDown={(e) => handleKeyPress(e, onSearch, searchTerm)}
        />
        <Button handleClick={() => handleSearchClick(onSearch, searchTerm)} />
    </div>
  )
}

export default SearchBar;