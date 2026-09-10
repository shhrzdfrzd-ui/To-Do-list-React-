function SearchBar({ searchText, onSearchChange }) {
  return (
    <label className="search-wrapper">
      <span className="sr-only">Search tasks</span>
      <input
        type="search"
        placeholder="Search tasks..."
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </label>
  )
}

export default SearchBar
