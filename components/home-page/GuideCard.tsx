import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { GuideCardProps } from '@/lib/interfaces';
import Rating from './Rating';
import Image from 'next/image';

const GuideCard = ({ guide }: GuideCardProps) => {
  return (
    <div className='grid grid-cols-[70px_1fr_1fr_1fr_30px] gap-4 items-center border-black border p-2 rounded-full min-w-[750px] max-w-[750px] max-h-[85px] shadow-lg shadow-gray-400'>
      <Image
        className='w-[70px] h-[70px] object-cover rounded-full select-none pointer-events-none'
        src={``}
        alt='Guide Image'
        width={70}
        height={70}
      />
      <div className='flex flex-col'>
        <p className='font-light text-sm select-none'>Nome</p>
        <h1 className='font-semibold text-lg truncate' style={{ maxWidth: '180px' }}>
          {guide.firstName}
        </h1>
      </div>
      <div className='flex flex-col'>
        <p className='font-light text-sm mb-[5px] select-none'>Avaliação</p>
        <Rating rating={guide.averageRating} />
      </div>
      <div className='flex flex-col'>
        <p className='font-light text-sm select-none'>Viagens realizadas</p>
        <h1 className='font-semibold text-2xl'>{guide.trips}</h1>
      </div>
      <div className='flex justify-end items-center'>
        <a>
          <DotsHorizontalIcon width={30} height={30} />
        </a>
      </div>
    </div>
  );
};

export default GuideCard;
