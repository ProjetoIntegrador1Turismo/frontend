import { Pencil } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ItineraryCard = ({
  id,
  imageCoverUrl,
  name
}: {
  id: number;
  imageCoverUrl: string;
  name: string;
}) => {
  return (
    <Link href={`/itinerary/${id}`}>
      <div className='w-[200px]'>
        <Image
          className='w-[200px] h-[100px] rounded-t-xl object-cover'
          src={imageCoverUrl}
          alt={name}
          width={300}
          height={300}
        />
        <div className='bg-gradient-to-r from-tl-red to-tl-purple h-fit rounded-b-xl flex items-center justify-around'>
          <h1 className='text-white text-md font-bold p-3 truncate max-w-[19g0px]'>{name}</h1>
          <Link
            href={`/guide/itinerary/edit/${id}`}
            className=' rounded-md p-1 px-2 transition-colors hover:bg-accent hover:text-accent-foreground text-white'
          >
            ✎
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default ItineraryCard;
