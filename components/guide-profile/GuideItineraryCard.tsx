import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const GuideItineraryCard = ({
  id,
  imageCoverUrl,
  name,
}: {
  id: number;
  imageCoverUrl: string;
  name: string;
}) => {
  return (
    <Link href={`/itinerary/${id}`}>
      <div className='w-[250px]'>
        <Image
          className='w-[250px] h-[150px] rounded-t-xl object-cover'
          src={imageCoverUrl}
          alt={name}
          width={300}
          height={300}
        />
        <div className='bg-gradient-to-r from-tl-red to-tl-purple h-fit rounded-b-xl flex items-center justify-center'>
          <h1 className='text-white text-md font-bold p-3 truncate'>{name}</h1>
        </div>
      </div>
    </Link>
  );
};

export default GuideItineraryCard;
