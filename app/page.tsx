import PlaneDivisor from '@/components/home-page/PlaneDivisor';
import MainCard from '@/components/home-page/MainCard';
import { mockGuides, mockSlides, mockTour } from '@/lib/mocks';
import SliderWithHeader from '@/components/home-page/SliderWithHeader';
import BondeDivisor from '@/components/home-page/BondeDivisor';
import WeekGuides from '@/components/home-page/WeekGuides';

export default function Home() {
  return (
    <div>
      <div className='flex flex-col gap-4 xl:flex-row justify-around'>
        <MainCard tour={mockTour} />
        <MainCard tour={mockTour} />
        <MainCard tour={mockTour} />
      </div>
      <PlaneDivisor />
      <SliderWithHeader title='Restaurantes, Eventos e Passeios' slides={mockSlides} />
      <SliderWithHeader title='Roteiros, Hóteis e Expêriencias' slides={mockSlides} />
      <BondeDivisor />
      <WeekGuides guides={mockGuides} />
      <div className='mb-14' />
    </div>
  );
}
