import GuideCard from '@/components/home-page/GuideCard';
import TourGallery from '@/components/product-page/Gallery';
import GuideCardTour from '@/components/product-page/GuideCardTour';
import ProductButton from '@/components/product-page/ProductButton';
import Title from '@/components/product-page/Title';
import TourDescription from '@/components/product-page/TourDescription';
import { fetchTourData } from '@/api/service';
import { Guide } from '@/lib/interfaces';

interface Tour {
  interestPoint: {
    name: string;
    longDescription: string;
  };
  guidesWhoOfferThisTour: Guide[];
}

const TourPage = async ({ params }: { params: { id: string } }) => {
  const tour: Tour | null = await fetchTourData(params.id);

  if (!tour) {
    return <div>Tour não encontrado</div>;
  }

  return (
    <div className='h-fit flex gap-8 flex-col mb-12'>
      <div className='flex justify-between items-center'>
        <Title tour={{ title: tour.interestPoint.name }} />
        <ProductButton />
      </div>
      <TourGallery />
      <TourDescription description={tour.interestPoint.longDescription} />
      <div className='flex justify-center items-center flex-col gap-4' id='guides'>
        <h1 className='text-4xl font-semibold'>Guias que ofertam esse passeio</h1>
        {tour.guidesWhoOfferThisTour.map((guide: Guide, index: number) => (
          <GuideCardTour
            key={index}
            img=''
            name={guide.firstName}
            rating={guide.averageRating as 1 | 2 | 3 | 4 | 5}
            trips={0}
          />
        ))}
      </div>
    </div>
  );
};

export default TourPage;
