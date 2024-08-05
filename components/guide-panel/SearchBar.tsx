interface SearchBarProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
    return (
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search"
        className="px-4 py-2 border rounded-md w-full md:w-64 shadow-sm"
      />
    );
  };
  
  export default SearchBar;
  