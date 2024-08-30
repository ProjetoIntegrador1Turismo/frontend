import { DescriptionDialog } from '../product-page/DescriptionDialog';

const ItineraryDescription = ({ description }: { description: string }) => {
  const stringLenght = 590;

  return (
    <div className='w-full h-[300px] rounded-lg border border-black p-5 shadow-lg shadow-gray-400 text-2xl flex justify-between'>
      <p className='font-extralight whitespace-pre-wrap truncate'>
        {description.substring(0, stringLenght)}
      </p>
      <DescriptionDialog longDescription={description} />
    </div>
  );
};

export default ItineraryDescription;