import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileInfo from './ProfileInfo';
import { auth } from '@/auth';
import Image from 'next/image';
import axios from 'axios';
import { getAuthToken } from '@/api/service';
import { redirect } from 'next/navigation';
import MyComments from './MyComments';
import MyReviews from './MyReviews';
import MyInterestedItineraries from './MyInterestedItineraries';
import { User, Star, MessageCircle, Map } from 'lucide-react';

export interface UserPageSource {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  interestedItineraries: InterestedItinerary[];
  comments: Comment[];
  reviews: Review[];
}

export interface InterestedItinerary {
  id: number;
  title: string;
  imageCoverUrl: string;
  guide: Guide;
}

export interface Guide {
  id: number;
  firstName: string;
  lastName: string;
  cadasturCode: string;
  averageRating: number;
  profileImageUrl: string;
}

export interface Comment {
  id: number;
  text: string;
  wasVisitingDate: string;
  rating: number;
  interestPoint: InterestPoint;
  tourist: Tourist;
}

export interface InterestPoint {
  id: number;
  name: string;
  imageCoverUrl: string;
  interestPointType: string;
}

export interface Tourist {
  id: number;
  touristName: string;
  profileImageUrl: string;
}

export interface Review {
  touristName: string;
  id: number;
  text: string;
  date: string;
  rating: number;
  guide: Guide;
}

export async function Profile() {
  const session = await auth();
  if (session?.user.userType === 'Guide' || session?.user.userType === 'Admin') {
    return (
      <Tabs defaultValue='info' className='flex gap-4'>
        <TabsList className='flex flex-col h-fit gap-12 border border-black rounded-xl p-4'>
          <h1 className='font-bold text-3xl text-black break-words w-48 text-center'>
            {`${session?.user?.firstName} ${session?.user.lastName}`}
          </h1>
          <Image
            src={session?.user.profileImageUrl ?? ' '}
            className='w-[150px] h-[150px] rounded-full object-cover'
            height={150}
            width={150}
            alt={session?.user.firstName ?? ' '}
          />
          <TabsTrigger className='rounded-xl shadow-md shadow-gray-400' value='info'>
            Informações Básicas
          </TabsTrigger>
        </TabsList>
        <TabsContent value='info'>
          <ProfileInfo />
        </TabsContent>
      </Tabs>
    );
  }

  let userData;

  try {
    userData = await axios.get<UserPageSource>('http://localhost:8081/user/me', {
      headers: {
        Authorization: `Bearer ${await getAuthToken()}`
      }
    });
  } catch (error) {
    redirect('/');
  }

  return (
    <Tabs defaultValue='info' className='flex gap-4'>
      <TabsList className='flex flex-col h-fit gap-12 border border-black rounded-xl p-4'>
        <h1 className='font-bold text-3xl text-black break-words w-48 text-center'>
          {`${session?.user?.firstName} ${session?.user.lastName}`}
        </h1>
        <Image
          src={session?.user.profileImageUrl ?? ' '}
          className='w-[150px] h-[150px] rounded-full object-cover'
          height={150}
          width={150}
          alt={session?.user.firstName ?? ' '}
        />
        <TabsTrigger className='rounded-xl shadow-md shadow-gray-400' value='info'>
          <div className='flex gap-1 items-center'>
            <User height={15} width={15} />
            Informações básicas
          </div>
        </TabsTrigger>
        <TabsTrigger className='rounded-xl shadow-md shadow-gray-400' value='reviews'>
          <div className='flex gap-1 items-center'>
            <Star height={15} width={15} />
            Avaliações
          </div>
        </TabsTrigger>
        <TabsTrigger className='rounded-xl shadow-md shadow-gray-400' value='comments'>
          <div className='flex gap-1 items-center'>
            <MessageCircle height={15} width={15} />
            Comentários
          </div>
        </TabsTrigger>
        <TabsTrigger className='rounded-xl shadow-md shadow-gray-400' value='roteiros'>
          <div className='flex gap-1 items-center'>
            <Map height={15} width={15} />
            Roteiros Interessados
          </div>
        </TabsTrigger>
      </TabsList>
      <TabsContent value='info'>
        <ProfileInfo />
      </TabsContent>
      <TabsContent value='reviews'>
        <MyReviews reviews={userData.data.reviews} profilePic={session!.user.profileImageUrl} />
      </TabsContent>
      <TabsContent value='comments'>
        <MyComments comments={userData.data.comments} profilePic={session!.user.profileImageUrl} />
      </TabsContent>
      <TabsContent value='roteiros'>
        <MyInterestedItineraries interestedItineraries={userData.data.interestedItineraries} />
      </TabsContent>
    </Tabs>
  );
}
