import Input from './Input'
import Button from './Button'
import { handleKeyPress, handleSearchClick } from './functions'
import useTags from '@/hooks/useTagList'
import Select from 'react-select'

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  onSearch,
  tagsSearch,
  setTags,
}) => {
  const { tags, loading: tagsLoading } = useTags()

  return (
    <div className='flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4'>
      <div className='sm:w-[32%] w-full'>
        <Select
          numberOfLines={1}
          ellipsizeMode='head'
          id='tags'
          name='tags'
          options={tags.map((tag) => ({ value: tag.id, label: tag.name }))}
          isMulti
          isLoading={tagsLoading}
          placeholder='Selecione a categoria...'
          styles={{
            control: (styles, { isFocused }) => ({
              ...styles,
              height: '2.6rem',
              border: isFocused ? 'none' : '1px solid #9CA3AF',
              fontSize: '0.875rem',
              outline: isFocused ? '2px solid #94a3b8' : 'none',
              borderRadius: '0.375rem',
              paddingLeft: '2.5rem',
              boxShadow: 'none',
            }),
          }}
          className='mt-0.4 overflow-hidden'
          onChange={(selectedOptions) => {
            const formattedTags = selectedOptions.map((option) => option.value)
            setTags(formattedTags)
          }}
          value={tagsSearch.map((tagId) => ({
            value: tagId,
            label: tags.find((tag) => tag.id === tagId)?.name,
          }))}
          onKeyDown={(e) => handleKeyPress(e, onSearch, searchTerm)}
        />
      </div>

      <div className='flex w-full sm:w-[68%] border border-slate-300 rounded-md'>
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e, onSearch, searchTerm)}
        />
        <Button onClick={() => handleSearchClick(onSearch, searchTerm)} />
      </div>
    </div>
  )
}

export default SearchBar
