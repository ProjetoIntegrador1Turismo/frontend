import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const InterestPointCard = ({
  id,
  imageCoverUrl,
  name,
  type
}: {
  id: number;
  imageCoverUrl: string;
  name: string;
  type: 'tour' | 'itinerary';
}) => {
  return (
    <Link href={`/${type}/${id}`}>
      <div className='w-[300px]'>
        <Image
          className='w-[300px] h-[200px] rounded-t-xl object-cover'
          src={imageCoverUrl}
          alt={name}
          width={300}
          height={300}
        />
        <div className='bg-gradient-to-r from-tl-red to-tl-purple h-fit rounded-b-xl flex items-center justify-center'>
          <h1 className='text-white text-2xl font-bold p-3 truncate'>{name}</h1>
        </div>
      </div>
    </Link>
  );
};

export default InterestPointCard;
