import { PlaneIcon } from 'lucide-react';

const InterestButton = () => {
  return (
    <button className='w-[250px] h-[70px] bg-gradient-to-t  from-tl-red items-center text-xl to-tl-purple rounded-full flex justify-center gap-2 text-white font-extrabold hover:from-tl-red-2 hover:to-tl-purple-2 select-none'>
      Tenho interesse <PlaneIcon />
    </button>
  );
};

export default InterestButton;
