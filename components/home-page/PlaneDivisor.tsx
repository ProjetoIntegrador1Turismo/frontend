import React from 'react';
import { PlaneIcon } from 'lucide-react';
const PlaneDivisor = () => {
  return (
    <div className='flex items-center my-3'>
      <div className='border-t border-black w-1/2 mr-2'></div>
      <PlaneIcon />
      <div className='border-t border-black w-1/2 ml-2'></div>
    </div>
  );
};

export default PlaneDivisor;
