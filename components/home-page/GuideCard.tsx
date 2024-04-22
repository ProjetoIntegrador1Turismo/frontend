import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { GuideCardProps } from '@/lib/interfaces';
import Rating from './Rating';

const GuideCard = ({ guide }: GuideCardProps) => {
  return (
    <div className='flex justify-between border-black border-[1px] w-fit p-2 items-center rounded-full min-w-[750px] max-w-[750px] max-h-[85px]'>
      <img
        className='w-[70px] h-[70px] object-cover rounded-full'
        src={guide.img}
        alt='Guide Image'
      />
      <div>
        <p className='font-light text-sm'>Nome</p>
        <h1 className='font-semibold text-2xl'>{guide.name}</h1>
      </div>
      <div>
        <p className='font-light text-sm'>Avaliação</p>
        <Rating rating={guide.rating} />
      </div>
      <div>
        <p className='font-light text-sm'>Viagens realizadas</p>
        <h1 className='font-semibold text-2xl'>{guide.trips}</h1>
      </div>
      <div>
        <a>
          <DotsHorizontalIcon width={30} height={30} />
        </a>
      </div>
    </div>
  );
};

export default GuideCard;
