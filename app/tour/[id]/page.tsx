import { auth } from '@/auth';
import PeopleDivisor from '@/components/home-page/PeopleDivisor';
import PlaneDivisor from '@/components/home-page/PlaneDivisor';
import CommentCardTour from '@/components/product-page/CommentCardTour';
import { CommentFormDialog } from '@/components/product-page/CommentFormDialog';
import TourGallery from '@/components/product-page/Gallery';
import GuideCardTour from '@/components/product-page/GuideCardTour';
import ProductButton from '@/components/product-page/ProductButton';
import Title from '@/components/product-page/Title';
import TourDescription from '@/components/product-page/TourDescription';
import axios from 'axios';
import { redirect } from 'next/navigation';

export interface TourPageSource {
  interestPoint: InterestPoint;
  guidesWhoOfferThisTour: GuideWhoOfferThisTour[];
  comments: Comment[];
}
export interface Comment {
  id: number;
  text: string;
  wasVisitingDate: string;
  rating: number;
  tourist: Tourist;
}

export interface Tourist {
  id: number;
  touristName: string;
  profileImageUrl: string;
}

export interface InterestPoint {
  id: number;
  name: string;
  address: Address;
  averageValue: number;
  shortDescription: string;
  longDescription: string;
  starsNumber: number;
  isResort: boolean;
  breakfastIncluded: boolean;
  foodType: string;
  date: Date;
  duration: string;
  requiredAge: number;
  imageCoverUrl: string;
  images: string[];
}

export interface Address {
  road: string;
  number: string;
  zipCode: string;
}

export interface GuideWhoOfferThisTour {
  id: number;
  firstName: string;
  lastName: string;
  averageRating: number;
  profileImageUrl: string;
}

const TourPage = async ({ params }: { params: { id: string } }) => {
  if (isNaN(+params.id)) {
    redirect('/');
  }

  const session = await auth();

  let tourData;
  let guides;
  let comments;
  try {
    const request = await axios.get<TourPageSource>(
      `http://localhost:8081/page-source/tour/${params.id}`
    );
    tourData = request.data.interestPoint;
    guides = request.data.guidesWhoOfferThisTour;
    comments = request.data.comments;
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
      <TourDescription
        longDescription={tourData.longDescription}
        shortDescription={tourData.shortDescription}
      />
      <PlaneDivisor />
      <div className='flex justify-center items-center flex-col gap-4' id='guides'>
        <h1 className='text-4xl font-semibold'>Guias que ofertam esse passeio</h1>
        {guides.map((guide) => {
          return (
            <GuideCardTour
              img={guide.profileImageUrl}
              name={`${guide.firstName} ${guide.lastName}`}
              rating={guide.averageRating}
              id={guide.id}
              key={guide.id}
              guideName={`${guide.firstName} ${guide.lastName}`}
              tourTitle={tourData.name}
              tourId={tourData.id}
            />
          );
        })}
      </div>
      <PeopleDivisor />
      <div className='flex flex-col gap-4 items-center'>
        <h2 className='text-4xl font-semibold text-center'>
          O que as pessoas acham desse passeio?
        </h2>
        {session && session.user.userType !== 'Guide' && (
          <CommentFormDialog tourId={tourData.id} tourTitle={tourData.name} />
        )}
        <div className='flex flex-wrap justify-center gap-4'>
          {comments.map((comment) => {
            const { tourist, ...rest } = comment;
            return (
              <CommentCardTour
                comment={{ ...rest, touristName: tourist.touristName }}
                profilePic={comment.tourist.profileImageUrl}
                key={comment.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TourPage;
