import { Pencil } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
const InterestPointEditCard = ({
  name,
  imageCoverUrl,
  id
}: {
  id: number;
  name: string;
  imageCoverUrl: string;
}) => {
  return (
    <Link href={`/tour/${id}`}>
      <div className='relative h-[150px] max-w-[250px]'>
        <Image
          className='w-[300px] h-[100px] rounded-t-xl object-cover'
          src={imageCoverUrl}
          alt={name}
          width={300}
          height={300}
        />
        <div className='absolute top-2 right-2 p-2 rounded-md shadow-md shadow-gray-500 bg-white hover:bg-gray-300 transition-colors'>
          <Link href={`/admin/interestpoint/edit/${id}`}>
            <Pencil height={15} width={15} color='black' />
          </Link>
        </div>
        <div className='bg-gradient-to-r from-tl-red to-tl-purple rounded-b-xl flex items-center justify-center'>
          <h1 className='text-white text-xl font-bold p-3 truncate max-w-[300px]'>{name}</h1>
        </div>
      </div>
    </Link>
  );
};

export default InterestPointEditCard;
