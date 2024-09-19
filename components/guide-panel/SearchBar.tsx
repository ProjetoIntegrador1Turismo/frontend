import { ChangeEvent, FC } from 'react';

interface SearchBarProps {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <input
      type='text'
      value={value}
      onChange={onChange}
      placeholder='Pesquisar'
      className='px-4 py-2 border rounded-md w-full md:w-64 shadow-sm'
    />
  );
};

export default SearchBar;
