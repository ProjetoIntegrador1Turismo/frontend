import { MapPin } from 'lucide-react';
import Rating from '../home-page/Rating';
import TourPrice from './TourPrice';

const Title = ({ name, price, address }: { name: string; price: number; address: string }) => {
  return (
    <div className='flex border-black'>
      <div className='flex flex-col gap-2 w-fit'>
        <h1 className='text-5xl font-semibold tracking-wider min-w-[500px]'>{name}</h1>
        <div className='flex items-center justify-around'>
          <div className='select-none'>
            <p>Avaliação</p>
            <Rating rating={4} />
          </div>
          <div className='h-[35px] w-[1px] bg-black select-none'></div>
          {/* <div className=''>
            <p className='select-none'>Telefone</p>
            <p>{`(45) 3520-6265`}</p>
          </div> */}
          <div className='select-none'>
            <TourPrice price={price} />
          </div>
        </div>
        <div className='flex gap-2 items-center'>
          <MapPin />
          <h3 className='text-xs tracking-wide'>{address}</h3>
        </div>
      </div>
    </div>
  );
};

export default Title;
