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
      <div className='w-[200px]'>
        <Image
          className='w-[300px] h-[100px] rounded-t-xl object-cover'
          src={imageCoverUrl}
          alt={name}
          width={300}
          height={300}
        />
        <div className='bg-gradient-to-r from-tl-red to-tl-purple rounded-b-xl flex items-center justify-center'>
          <h1 className='text-white text-xl font-bold p-3 truncate max-w-[300px]'>{name}</h1>
          <Link
            href={`/admin/interestpoint/edit/${id}`}
            className=' rounded-md p-1 px-2 transition-colors hover:bg-accent hover:text-accent-foreground text-white mr-2'
          >
            ✎
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default InterestPointEditCard;
