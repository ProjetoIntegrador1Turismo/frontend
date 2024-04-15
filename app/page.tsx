import { auth, signOut } from '@/auth';

export default async function Home() {
  const session = await auth();
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-center text-xs'>{JSON.stringify(session?.user.username)}</h1>
      <form
        action={async () => {
          'use server';
          await signOut({ redirectTo: '/login' });
        }}
      >
        <button type='submit'>Sign Out</button>
      </form>
    </div>
  );
}
