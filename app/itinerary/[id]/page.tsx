import InterestPointCard from '@/components/categories/InterestPointCard';
import ReviewCard from '@/components/guide-profile/ReviewCard';
import BondeDivisor from '@/components/home-page/BondeDivisor';
import PeopleDivisor from '@/components/home-page/PeopleDivisor';
import PlaneDivisor from '@/components/home-page/PlaneDivisor';
import ItineraryDescription from '@/components/itinerary-page/ItineraryDescription';
import ItineraryGallery from '@/components/itinerary-page/ItineraryGallery';
import GuideCardTour from '@/components/product-page/GuideCardTour';
import { Review } from '@/components/profile-page/Profile';
import axios from 'axios';
import { redirect } from 'next/navigation';

export interface ItineraryPageSource {
  guide: Guide;
  itinerary: Itinerary;
  reviews: Review[];
}

export interface Guide {
  id: number;
  firstName: string;
  lastName: string;
  cadasturCode: string;
  averageRating: number;
  profileImageUrl: string;
}

export interface Itinerary {
  id: number;
  title: string;
  description: string;
  mediumCost: number;
  days: number;
  imageCoverUrl: string;
  interestPoints: InterestPoint[];
}

export interface InterestPoint {
  id: number;
  name: string;
  shortDescription: string;
  imageCoverUrl: string;
  interestPointType: string;
}

const ItineraryPage = async ({ params }: { params: { id: string } }) => {
  if (isNaN(+params.id)) {
    redirect('/');
  }

  let itineraryData: ItineraryPageSource;
  try {
    const request = await axios.get(`http://localhost:8081/page-source/itinerary/${params.id}`);
    itineraryData = request.data as ItineraryPageSource;
  } catch (error) {
    redirect('/');
  }

  const RenderReviews = (reviews: any[]) => {
    if (reviews.length === 0) {
      return (
        <div className='flex flex-col gap-3 items-center'>
          <h1 className='text-xl text-center'>Sem reviews por aqui... ainda! </h1>
          <p className='max-w-[200px] text-md font-light text-center'>
            Parece que este guia não recebeu nenhum comentário. <br />
            <br />
            Seja o primeiro a compartilhar suas aventuras e inspire outros viajantes!
          </p>
        </div>
      );
    }

    return itineraryData.reviews.map((comment, index) => {
      const { avatarUrl, ...rest } = comment;
      return (
        <ReviewCard
          review={{
            ...rest,
            avatarUrl: comment.avatarUrl ?? ' '
          }}
        />
      );
    });
  };

  return (
    <div className='h-fit flex flex-col mb-12 gap-8'>
      <div className='flex justify-center'></div>
      <div className='overflow-hidden text-center flex flex-col gap-3'>
        <h1 className='font-semibold text-5xl truncate leading-[1.2]'>
          {itineraryData.itinerary.title}
        </h1>
        <p className='select-none text-3xl font-light'>
          R${itineraryData.itinerary.mediumCost},00 | {itineraryData.itinerary.days} dias
        </p>
      </div>
      <div className='flex flex-col gap-3 justify-center items-center'>
        <p className='text-xl text-center'>Ofertado por:</p>
        <GuideCardTour
          img={itineraryData.guide.profileImageUrl ?? '/avatar.jpg'}
          id={itineraryData.guide.id}
          name={`${itineraryData.guide.firstName} ${itineraryData.guide.lastName}`}
          rating={itineraryData.guide.averageRating ?? 3}
        />
      </div>

      <PlaneDivisor />

      <ItineraryGallery imgCover={itineraryData.itinerary.imageCoverUrl} />

      <ItineraryDescription description={itineraryData.itinerary.description} />

      <BondeDivisor />

      {/* Atrações incluídas no roteiro */}
      <h1 className='font-semibold text-4xl text-center'>Pontos de Interesse desse roteiro </h1>
      <div className='flex flex-wrap justify-center gap-4'>
        {itineraryData.itinerary.interestPoints.map((point, index) => (
          <InterestPointCard
            key={index}
            id={point.id}
            name={point.name}
            imageCoverUrl={point.imageCoverUrl}
            type={'tour'}
          />
        ))}
      </div>

      <PeopleDivisor />

      {/* Comentários */}
      <div className='flex flex-col gap-4'>
        <h2 className='text-4xl font-semibold text-center'>O que as pessoas acham desse guia?</h2>
        <div className='flex flex-wrap justify-center gap-4'>
          {RenderReviews(itineraryData.reviews)}
        </div>
      </div>
    </div>
  );
};

export default ItineraryPage;
