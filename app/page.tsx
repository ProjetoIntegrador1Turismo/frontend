import PlaneDivisor from '@/components/home-page/PlaneDivisor';
import MainCard from '@/components/home-page/MainCard';
import HomeSlider from '@/components/home-page/HomeSlider';
import { mockSlides, mockTour } from '@/lib/mocks';

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
      <HomeSlider slides={mockSlides} />
    </div>
  );
}
