import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NewItineraryForm from './NewItineraryForm';
import InterestedTourists from './InterestedTourists';
import MyItineraries from './MyItineraries';
import { auth } from '@/auth';
import Image from 'next/image';
import { Book, BookPlus, BookUser } from 'lucide-react';

export async function GuideTabs() {
  const session = await auth();
  return (
    <Tabs defaultValue='itineraries' className='flex gap-4'>
      <TabsList className='flex flex-col h-fit gap-12 border border-black rounded-xl p-4'>
        <h1 className='font-bold text-3xl text-black break-words w-48 text-center'>
          <p>{`${session?.user.firstName} ${session?.user.lastName}`}</p>
        </h1>
        <Image
          alt={session?.user.firstName ?? ''}
          className='w-[150px] h-[150px] rounded-full object-cover'
          height={150}
          width={150}
          src={session?.user.profileImageUrl ?? ''}
        />
        <p>Cadastur: {session?.user.cadasturCode}</p>
        <TabsTrigger className='rounded-xl shadow-md shadow-gray-400' value='itineraries'>
          <div className='flex gap-1 items-center'>
            <Book height={15} width={15} />
            Meus roteiros
          </div>
        </TabsTrigger>
        <TabsTrigger className='rounded-xl shadow-md shadow-gray-400' value='newItinerary'>
          <div className='flex gap-1 items-center'>
            <BookPlus height={15} width={15} />
            Novo roteiro
          </div>
        </TabsTrigger>
        <TabsTrigger className='rounded-xl shadow-md shadow-gray-400' value='tourists'>
          <div className='flex gap-1 items-center'>
            <BookUser height={15} width={15} />
            Turistas interessados
          </div>
        </TabsTrigger>
      </TabsList>
      <TabsContent value='itineraries'>
        <MyItineraries />
      </TabsContent>
      <TabsContent value='newItinerary'>
        <NewItineraryForm />
      </TabsContent>
      <TabsContent value='tourists'>
        <InterestedTourists />
      </TabsContent>
    </Tabs>
  );
}
