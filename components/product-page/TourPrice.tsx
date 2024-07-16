import { TourPriceProps } from '@/lib/interfaces';

const TourPrice = ({ price }: TourPriceProps) => {
  switch (price) {
    case 1:
      return (
        <p className='tracking-[10px] text-xl select-none'>
          $ <span className='text-gray-400'>$ $</span>
        </p>
      );
    case 2:
      return (
        <p className='tracking-[10px] text-xl select-none'>
          $ $ <span className='text-gray-400'>$</span>
        </p>
      );
    case 3:
      return <p className='tracking-[10px] text-xl select-none'>$ $ $</p>;
    default:
      break;
  }
};

export default TourPrice;
