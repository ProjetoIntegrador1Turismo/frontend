'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import { XIcon } from 'lucide-react';
import { Button } from '../ui/button';

const SearchBar = ({
  route
}: {
  route: 'event' | 'experience' | 'touristpoint' | 'hotel' | 'restaurant' | 'itinerary';
}) => {
  const [text, setText] = useState('');
  const router = useRouter();
  const [query] = useDebounce(text, 500);

  useEffect(() => {
    if (!query) {
      router.push(`/categories/${route}`);
    }
    if (query) {
      router.push(`?query=${query}`);
    }
  }, [query, router]);

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
