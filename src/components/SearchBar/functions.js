export const handleKeyPress = (event, onSearch, searchTerm) => {
  if (event.key === 'Enter') {
    onSearch(searchTerm)
  }
}

export const handleSearchClick = (onSearch, searchTerm) => {
  onSearch(searchTerm)
}
