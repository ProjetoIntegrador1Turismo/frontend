import { CableCar } from 'lucide-react';

const BondeDivisor = () => {
  return (
    <div className='flex items-center my-3'>
      <div className='border-t border-black w-1/2 mr-2'></div>
      <CableCar />
      <div className='border-t border-black w-1/2 ml-2'></div>
    </div>
  );
};

export default BondeDivisor;
