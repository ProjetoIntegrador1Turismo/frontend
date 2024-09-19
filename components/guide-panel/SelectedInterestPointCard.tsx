import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import ClipLoader from 'react-spinners/ClipLoader';

const SelectedInterestPointCard = ({ id }: { id: number }) => {
  const { data: sessionData } = useSession();

  const { data, isLoading } = useQuery({
    queryKey: ['selectedInterestPoint', id],
    queryFn: async () => {
      return axios.get(`http://localhost:8081/interestpoint/${id}`, {
        headers: { Authorization: `Bearer ${sessionData?.user.authToken}` }
      });
    },
    refetchOnWindowFocus: false
  });

  if (isLoading) {
    <div className='h-[150px] w-[300px] flex justify-center items-center'>
      <ClipLoader color='black' />
    </div>;
  }

  return (
    <div className='max-w-[400px]'>
      <Image
        className='w-[400px] h-[50px] rounded-t-xl object-cover'
        src={data?.data.imageCoverUrl}
        alt={data?.data.name}
        width={500}
        height={500}
      />
      <div className='bg-gradient-to-r from-tl-red to-tl-purple rounded-b-xl flex items-center justify-center h-[40px] max-w-[400px] w-[400px]'>
        <h1 className='text-white text-md font-bold p-3 truncate max-w-fit'>{data?.data.name}</h1>
      </div>
    </div>
  );
};

export default SelectedInterestPointCard;
