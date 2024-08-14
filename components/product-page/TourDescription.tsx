import { TourDescriptionProps } from '@/lib/interfaces';
import { DescriptionDialog } from './DescriptionDialog';

const TourDescription = ({ description }: { description: string | null }) => {
  const stringLenght = 300;

  return (
    <div className='w-full h-[300px] rounded-lg border border-black p-5 shadow-lg shadow-gray-400 text-2xl flex'>
      <p className='font-extralight whitespace-pre-wrap overflow-hidden'>
        {description ? description.substring(0, stringLenght) + '...' : 'Descrição não disponível.'}
      </p>
      <DescriptionDialog description={description || 'Descrição completa não disponível.'} />
    </div>
  );
};
