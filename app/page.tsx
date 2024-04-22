import PlaneDivisor from '@/components/home-page/PlaneDivisor';
import MainCard from '@/components/home-page/MainCard';
import { mockSlides, mockTour } from '@/lib/mocks';
import SliderWithHeader from '@/components/home-page/SliderWithHeader';
import BondeDivisor from '@/components/home-page/BondeDivisor';

export default function Home() {
  return (
    <div>
      {/* <form
        action={async () => {
          'use server';
          await signOut({ redirectTo: '/login' });
        }}
      >
        <button type='submit'>Sign Out</button>
      </form> */}
      <div className='flex flex-col gap-4 xl:flex-row justify-around'>
        <MainCard tour={mockTour} />
        <MainCard tour={mockTour} />
        <MainCard tour={mockTour} />
      </div>
      <PlaneDivisor />
      <SliderWithHeader title='Restaurantes, Eventos e Passeios' slides={mockSlides} />
      <SliderWithHeader title='Roteiros, Hóteis e Expêriencias' slides={mockSlides} />
      <BondeDivisor />
    </div>
  );
}
