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
    <Link href={`/itinerary/${id}`} className='w-fit'>
      <div className='w-[200px]'>
        {imageCoverUrl ? (
          <Image
            className='w-[200px] h-[100px] rounded-t-xl object-cover'
            src={imageCoverUrl}
            alt={name}
            width={300}
            height={300}
          />
        ) : null}
        <div className='bg-gradient-to-r from-tl-red to-tl-purple h-fit rounded-b-xl flex items-center justify-between'>
          <h1 className='text-white text-md font-bold p-3 truncate'>{name}</h1>
          <Link
            href={`/guide/itinerary/edit/${id}`}
            className=' rounded-md p-1 px-2 transition-colors hover:bg-accent hover:text-accent-foreground text-white mr-2'
          >
            ✎
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default ItineraryCard;
