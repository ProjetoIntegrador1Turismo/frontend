import { PlaneIcon } from 'lucide-react';

const ProductButton = () => {
  return (
    <a
      href='#guides'
      className='bg-gradient-to-t w-[450px] shadow-lg shadow-gray-400 justify-center from-tl-red text-3xl h-fit items-center to-tl-purple rounded-full flex p-6 gap-2 text-white font-extrabold hover:from-tl-red-2 hover:to-tl-purple-2'
    >
      <h1>Tenho interesse!</h1>
      <PlaneIcon height={36} width={36} />
    </a>
  );
};

export default ProductButton;
