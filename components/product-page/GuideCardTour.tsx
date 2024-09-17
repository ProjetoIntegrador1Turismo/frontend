import Rating from '../home-page/Rating';
import Image from 'next/image';
import Link from 'next/link';
import ItinerariesDialog from './ItinerariesDialog';

const GuideCardTour = ({
  img,
  name,
  rating,
  id,
  tourTitle,
  guideName,
  tourId
}: {
  img: string;
  name: string;
  rating: number;
  id: number;
  tourTitle: string;
  guideName: string;
  tourId: number;
}) => {
  return (
    <div className='grid grid-cols-[70px_1fr_1fr_270px] gap-4 items-center border-black border p-2 rounded-full min-w-[750px] max-w-[750px] max-h-[85px] shadow-lg shadow-gray-400'>
      <Link href={`/guide-profile/${id}`}>
        <Image
          className='w-[70px] h-[70px] object-cover rounded-full select-none'
          src={img}
          alt='Guide Image'
          width={60}
          height={60}
        />
      </Link>

      <div className='flex flex-col justify-center'>
        <p className='font-light text-sm leading-none select-none'>Nome</p>
        <h1
          className='font-semibold text-lg truncate'
          style={{ minWidth: '220px', maxWidth: '220px' }}
        >
          {name}
        </h1>
      </div>
      <div className='flex flex-col justify-center'>
        <p className='font-light text-sm leading-none mb-1 select-none'>Avaliação</p>
        <Rating rating={rating} />
      </div>
      <div className='flex justify-end items-center'>
        <ItinerariesDialog
          guideId={id}
          guideName={guideName}
          tourId={tourId}
          tourTitle={tourTitle}
        />
      </div>
    </div>
  );
};

export default GuideCardTour;
