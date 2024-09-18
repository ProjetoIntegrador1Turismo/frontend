import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InterestPointForm from './InterestPointForm';
import GuideApproval from './GuideApproval';
import InterestPoints from './InterestPoints';
import { auth } from '@/auth';
import Image from 'next/image';
import { MapPinIcon, Medal, Pen, User } from 'lucide-react';
import SelectTop3Form from './SelectTop3Form';

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
          <div className='flex gap-1 items-center'>
            <MapPinIcon height={15} width={15} />
            Cadastrar Pontos
          </div>
        </TabsTrigger>
        <TabsTrigger className='rounded-xl shadow-md shadow-gray-400' value='editpoints'>
          <div className='flex gap-1 items-center'>
            <Pen height={15} width={15} />
            Editar Pontos
          </div>
        </TabsTrigger>
        <TabsTrigger className='rounded-xl shadow-md shadow-gray-400' value='guides'>
          <div className='flex gap-1 items-center'>
            <User height={15} width={15} />
            Gerenciar Guias
          </div>
        </TabsTrigger>
        <TabsTrigger className='rounded-xl shadow-md shadow-gray-400' value='top3'>
          <div className='flex gap-1 items-center'>
            <Medal height={15} width={15} />
            Selecionar Top 3
          </div>
        </TabsTrigger>
      </TabsList>
      <TabsContent value='interestpoint'>
        <InterestPointForm />
      </TabsContent>
      <TabsContent value='editpoints'>
        <InterestPoints />
      </TabsContent>
      <TabsContent value='guides'>
        <GuideApproval />
      </TabsContent>
      <TabsContent value='top3'>
        <SelectTop3Form />
      </TabsContent>
    </Tabs>
  );
}
