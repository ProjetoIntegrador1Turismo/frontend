import { TourDescriptionProps } from '@/lib/interfaces';
import { DescriptionDialog } from './DescriptionDialog';

const TourDescription = ({ shortDescription, longDescription }: TourDescriptionProps) => {
  const stringLenght = 590;

  return (
    <div className='w-full h-[300px] rounded-lg border border-black p-5 shadow-lg shadow-gray-400 text-2xl flex justify-between'>
      <p className='font-extralight whitespace-pre-wrap overflow-hidden'>
        {shortDescription}
      </p>
      <DescriptionDialog longDescription={longDescription} />
    </div>
  );
};

export default TourDescription;