import React from 'react';
import { Button } from '../ui/button';
import { PlaneIcon } from 'lucide-react';
import SyncLoader from 'react-spinners/SyncLoader';

const InterestButtonItinerary = ({
  isLoading,
  onClick
}: {
  isLoading: boolean;
  onClick: () => void;
}) => {
  if (isLoading) {
    return (
      <button
        className='w-[250px] h-[70px] bg-gradient-to-t  from-tl-red items-center text-xl to-tl-purple rounded-full flex justify-center gap-2 text-white font-extrabold  select-none'
        onClick={onClick}
        disabled
      >
        <SyncLoader color='#ffffff' size={10} />
      </button>
    );
  }

  return (
    <Button
      className='w-[250px] h-[70px] bg-gradient-to-t  from-tl-red items-center text-xl to-tl-purple rounded-full flex justify-center gap-2 text-white font-extrabold hover:from-tl-red-2 hover:to-tl-purple-2 select-none'
      onClick={onClick}
    >
      Tenho interesse <PlaneIcon />
    </Button>
  );
};

export default InterestButtonItinerary;
