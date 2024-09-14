import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { XIcon } from 'lucide-react';

const SearchBar = ({ setText, text }: { setText: (text: string) => void; text: string }) => {
  return (
    <div className='flex shadow-md shadow-gray-400 border border-black gap-3 rounded-full h-[50px] items-center w-[250px] p-3'>
      <MagnifyingGlassIcon width={30} height={30} />
      <Input
        className='h-1/2'
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        placeholder='Pesquise aqui'
      />
      <Button
        variant='outline'
        onClick={() => {
          setText('');
        }}
        disabled={text === ''}
        size='sm'
      >
        <XIcon color='red' />
      </Button>
    </div>
  );
};

export default SearchBar;
