import Image from 'next/image';
import Link from 'next/link';

const ItinerarySliderCard = ({
  id,
  imageCoverUrl,
  name
}: {
  id: number;
  imageCoverUrl: string;
  name: string;
}) => {
  return (
    <Link href={`/itinerary/${id}`} className='contents'>
      <div className='w-[200px]'>
        <Image
          className='w-[200px] h-[125px] rounded-t-xl object-cover'
          src={imageCoverUrl}
          alt={name}
          width={300}
          height={300}
        />
        <div className='bg-gradient-to-r from-tl-red to-tl-purple h-fit rounded-b-xl flex items-center justify-center'>
          <h1 className='text-white text-xl font-bold p-3 truncate'>{name}</h1>
        </div>
      </div>
    </Link>
  );
};

export default ItinerarySliderCard;
