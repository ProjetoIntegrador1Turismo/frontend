import { GuideCardInfo } from '@/lib/interfaces';
import InterestButton from './InterestButton';
import Rating from '../home-page/Rating';
import Image from 'next/image';

const GuideCardTour = (guide: GuideCardInfo) => {
  return (
    <div className='grid grid-cols-[70px_1fr_1fr_1fr_270px] gap-4 items-center border-black border p-2 rounded-full min-w-[950px] max-w-[950px] max-h-[85px] shadow-lg shadow-gray-400'>
      <Image
        className='w-[70px] h-[70px] object-cover rounded-full'
        src={guide.img}
        alt='Guide Image'
        width={70}
        height={70}
      />
      <div className='flex flex-col'>
        <p className='font-light text-sm'>Nome</p>
        <h1 className='font-semibold text-lg truncate' style={{ maxWidth: '180px' }}>
          {guide.name}
        </h1>
      </div>
      <div className='flex flex-col'>
        <p className='font-light text-sm mb-[5px]'>Avaliação</p>
        <Rating rating={guide.rating} />
      </div>
      <div className='flex flex-col'>
        <p className='font-light text-sm'>Viagens realizadas</p>
        {/* <h1 className='font-semibold text-2xl'>{guide.trips}</h1> */}
      </div>
      <div className='flex justify-end items-center'>
        <InterestButton />
      </div>
    </div>
  );
};

export default GuideCardTour;
