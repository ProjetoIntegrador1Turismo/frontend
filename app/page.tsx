import PlaneDivisor from '@/components/home-page/PlaneDivisor';
import MainCard from '@/components/home-page/MainCard';
import SliderWithHeader from '@/components/home-page/SliderWithHeader';
import BondeDivisor from '@/components/home-page/BondeDivisor';
import WeekGuides from '@/components/home-page/WeekGuides';
import { fetchHomepageData } from '@/api/service';

export default async function Home() {
  const PageData = await fetchHomepageData();

  return (
    <div>
      <div className='flex flex-col gap-4 xl:flex-row justify-around'>
        {PageData.top3InterestPoints.map((tour) => (
          <MainCard key={tour.id} tour={tour} />
        ))}
      </div>
      <PlaneDivisor />
      <SliderWithHeader title='Restaurantes, Eventos e Passeios' slides={PageData.firstSlider} />
      <SliderWithHeader title='Roteiros, Hóteis e Expêriencias' slides={PageData.secondSlider} />
      <BondeDivisor />
      <WeekGuides guides={PageData.topGuides} />
      <div className='mb-14' />
    </div>
  );
}
