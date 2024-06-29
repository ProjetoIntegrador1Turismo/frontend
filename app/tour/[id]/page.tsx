import GuideCard from '@/components/home-page/GuideCard';
import TourGallery from '@/components/product-page/Gallery';
import GuideCardTour from '@/components/product-page/GuideCardTour';
import ProductButton from '@/components/product-page/ProductButton';
import Title from '@/components/product-page/Title';
import TourDescription from '@/components/product-page/TourDescription';
import { mockGuide, mockGuides, tourTitleMock } from '@/lib/mocks';

const TourPage = async ({ params }: { params: { id: string } }) => {
  // const fetchTour = async () => {
  //  data fetch would look something like this:
  //  const res = await fetch(`https://localhost:8001/tour/${id}`);
  //  return await res.json();
  // };
  // const tour = await fetchTour();
  // then tour.something for data
  // DTO for Tour page
  // interface Guide {
  //   id: number;
  //   rating: 1 | 2 | 3 | 4 | 5;
  //   trips: number;
  //   name: string;
  //   avatar: string;
  // }
  // interface TourDTO {
  //   title: string;
  //   phone: string;
  //   address: string;
  //   description: string;
  //   price: 1 | 2 | 3;
  //   rating: 1 | 2 | 3 | 4 | 5;
  //   guides: Guide[];
  // }

  return (
    <div className='h-fit flex gap-8 flex-col mb-12'>
      <div className='flex justify-between items-center'>
        <Title tour={tourTitleMock} />
        <ProductButton />
      </div>
      <TourGallery />
      <TourDescription description={tourTitleMock.description} />
      <div className='flex justify-center items-center flex-col gap-4' id='guides'>
        <h1 className='text-4xl font-semibold'>Guias que ofertam esse passeio</h1>
        {mockGuides.map((value, index) => {
          return <GuideCardTour guide={value} key={index} />;
        })}
      </div>
    </div>
  );
};

export default TourPage;
