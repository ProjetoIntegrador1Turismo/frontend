import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileInfo from './ProfileInfo';
import { auth } from '@/auth';

export async function Profile() {
  const session = await auth();

  return (
    <Tabs defaultValue='info' className='flex gap-4'>
      <TabsList className='flex flex-col h-fit gap-12 border border-black rounded-xl p-4'>
        <h1 className='font-bold text-3xl text-black break-words w-48 text-center'>
          {session?.user?.firstName}
        </h1>
        <img src='/avatar.jpg' className='w-[150px] h-[150px] rounded-full object-cover' />
        <TabsTrigger className='rounded-xl shadow-md shadow-gray-400' value='info'>
          Informações Básicas
        </TabsTrigger>
        <TabsTrigger className='rounded-xl shadow-md shadow-gray-400' value='comments'>
          Comentários
        </TabsTrigger>
        <TabsTrigger className='rounded-xl shadow-md shadow-gray-400' value='history'>
          Histórico
        </TabsTrigger>
      </TabsList>
      <TabsContent value='info'>
        <ProfileInfo />
      </TabsContent>
      <TabsContent value='comments'>
        <p>Comentários</p>
      </TabsContent>
      <TabsContent value='history'>
        <p>Histórico</p>
      </TabsContent>
    </Tabs>
  );
}
