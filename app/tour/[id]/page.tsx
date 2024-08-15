import GuideCard from '@/components/home-page/GuideCard';
import TourGallery from '@/components/product-page/Gallery';
import GuideCardTour from '@/components/product-page/GuideCardTour';
import ProductButton from '@/components/product-page/ProductButton';
import Title from '@/components/product-page/Title';
import TourDescription from '@/components/product-page/TourDescription';
import { mockGuide, mockGuides, tourTitleMock } from '@/lib/mocks';
import axios from 'axios';
import { redirect } from 'next/navigation';

const TourPage = async ({ params }: { params: { id: string } }) => {
  try {
    Number(params.id);
  } catch (error) {
    redirect('/');
  }
  let tourData;
  try {
    const request = await axios.get(`http://localhost:8081/page-source/tour/${params.id}`);
    tourData = request.data.interestPoint;
  } catch (error) {
    redirect('/');
  }

  return (
    <div className='h-fit flex gap-8 flex-col mb-12'>
      <div className='flex justify-between items-center'>
        <Title
          name={tourData.name}
          price={tourData.averageValue}
          address={`${tourData.address.road}, ${tourData.address.number} - ${tourData.address.zipCode.slice(0, 5)}-${tourData.address.zipCode.slice(5)}`}
        />
        <ProductButton />
      </div>
      <TourGallery images={tourData.images} imgCover={tourData.imageCoverUrl} />
      <TourDescription longDescription={tourData.longDescription} shortDescription={tourData.shortDescription} />
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
