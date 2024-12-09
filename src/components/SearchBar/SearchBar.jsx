import Input from './Input';
import Button from './Button';
import { handleKeyPress, handleSearchClick } from './functions';
import useTags from '@/hooks/useTagList';
import Select from 'react-select';

const SearchBar = ({ searchTerm, setSearchTerm, onSearch, tagsSearch, setTags }) => {
  const { tags, loading: tagsLoading } = useTags();

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4">
      <div className="sm:w-[32%] w-full">
        <Select
          id="tags"
          name="tags"
          options={tags.map((tag) => ({ value: tag.id, label: tag.name }))}
          isMulti
          isLoading={tagsLoading}
          placeholder="Selecione a categoria..."
          styles={{
            control: (styles) => ({
              ...styles,
              height: '2.5rem',
            }),
          }}
          onChange={(selectedOptions) => {
            const formattedTags = selectedOptions.map((option) => option.value);
            setTags(formattedTags);
          }}   
          value={tagsSearch.map((tagId) => ({ value: tagId, label: tags.find(tag => tag.id === tagId)?.name }))}
          onKeyDown={(e) => handleKeyPress(e, onSearch, searchTerm)}
        />
      </div>

      <div className="flex w-full sm:w-[68%] border border-slate-300 rounded-md">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e, onSearch, searchTerm)}
        />
        <Button onClick={() => handleSearchClick(onSearch, searchTerm)} />
      </div>
    </div>
  );
};

export default SearchBar;
