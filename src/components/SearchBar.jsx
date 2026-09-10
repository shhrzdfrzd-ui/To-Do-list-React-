function SearchBar({ searchText, onSearchChange }) {
  return (
    <input
      type="text"
      placeholder="Search tasks..."
      value={searchText}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  )
}

export default SearchBar