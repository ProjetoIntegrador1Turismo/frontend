import { SliderWithHeaderProps } from '@/lib/interfaces';
import HomeSlider from './HomeSlider';

const SliderWithHeader = ({ slides, title }: SliderWithHeaderProps) => {
  return (
    <div className='flex flex-col gap-2 mb-4'>
      <h1 className='text-2xl font-semibold'>{title}</h1>
      <HomeSlider slides={slides} />
    </div>
  );
};

export default SliderWithHeader;
