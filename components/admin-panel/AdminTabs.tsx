import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InterestPointForm from './InterestPointForm';
import GuideApproval from './GuideApproval';
import InterestPoints from './InterestPoints';
import { auth } from '@/auth';
import Image from 'next/image';
import { MapPinIcon, Pen, PersonStanding } from 'lucide-react';

export async function AdminTabs() {
  const session = await auth();
  return (
    <Tabs defaultValue='interestpoint' className='flex gap-4'>
      <TabsList className='flex flex-col h-fit gap-12 border border-black rounded-xl p-4'>
        <h1 className='font-bold text-3xl text-black break-words w-48 text-center'>
          {`${session?.user.firstName} ${session?.user.lastName}`}
        </h1>
        <Image
          src={session?.user.profileImageUrl ?? ' '}
          className='w-[150px] h-[150px] rounded-full object-cover'
          height={150}
          width={150}
          alt={session?.user.firstName ?? ' '}
        />
        <TabsTrigger className='rounded-xl shadow-md shadow-gray-400' value='interestpoint'>
          <MapPinIcon /> | Cadastrar Pontos
        </TabsTrigger>
        <TabsTrigger className='rounded-xl shadow-md shadow-gray-400' value='config'>
          <Pen /> | Editar Pontos
        </TabsTrigger>
        <TabsTrigger className='rounded-xl shadow-md shadow-gray-400' value='guides'>
          <PersonStanding /> | Aprovar Guias
        </TabsTrigger>
      </TabsList>
      <TabsContent value='interestpoint'>
        <InterestPointForm />
      </TabsContent>
      <TabsContent value='config'>
        <InterestPoints />
      </TabsContent>
      <TabsContent value='guides'>
        <GuideApproval />
      </TabsContent>
    </Tabs>
  );
}
