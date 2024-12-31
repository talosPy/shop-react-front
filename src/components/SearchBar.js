function SearchBar({ search, setSearch }) {
    function handleSearch(event) {
      setSearch(event.target.value);
    }
  
    return (
      <input
        type="text"
        placeholder="Search for a product..."
        value={search}
        onChange={handleSearch}
        className="form-control"
      />
    );
  }
  
  export default SearchBar;
  