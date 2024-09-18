'use client';
import Rating from '../home-page/Rating';
import Image from 'next/image';
import Link from 'next/link';
import InterestButtonItinerary from './InterestButtonItinerary';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useToast } from '../ui/use-toast';

const GuideCardItinerary = ({
  img,
  name,
  rating,
  guideId,
  itineraryId
}: {
  img: string;
  name: string;
  rating: number;
  guideId: number;
  itineraryId: number;
}) => {
  const { data: sessionData } = useSession();
  const { toast } = useToast();

  const { mutate: signal, isPending } = useMutation({
    mutationFn: async () => {
      const data = await axios.post(
        `http://localhost:8081/tourist/signal/${itineraryId}`,
        {},
        {
          headers: { Authorization: `Bearer ${sessionData?.user.authToken}` }
        }
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return data;
    },
    onSuccess: () => {
      toast({
        title: 'Sucesso!',
        variant: 'default',
        className: 'bg-green-500 text-white',
        description: `Demonstrou interesse no roteiro de ${name}`
      });
    },
    onError: () => {
      toast({
        title: 'Erro',
        variant: 'destructive',
        description: 'Você já demonstrou interesse nesse roteiro!'
      });
    }
  });

  return (
    <div className='grid grid-cols-[70px_1fr_1fr_270px] gap-4 items-center border-black border p-2 rounded-full min-w-[750px] max-w-[750px] max-h-[85px] shadow-lg shadow-gray-400'>
      <Link href={`/guide-profile/${guideId}`}>
        <Image
          className='w-[70px] h-[70px] object-cover rounded-full select-none'
          src={img}
          alt='Guide Image'
          width={60}
          height={60}
        />
      </Link>

      <div className='flex flex-col justify-center'>
        <p className='font-light text-sm leading-none select-none'>Nome</p>
        <h1
          className='font-semibold text-lg truncate'
          style={{ minWidth: '220px', maxWidth: '220px' }}
        >
          {name}
        </h1>
      </div>
      <div className='flex flex-col justify-center'>
        <p className='font-light text-sm leading-none mb-1 select-none'>Avaliação</p>
        <Rating rating={rating} />
      </div>
      <div className='flex justify-end items-center'>
        <InterestButtonItinerary onClick={() => signal()} isLoading={isPending} />
      </div>
    </div>
  );
};

export default GuideCardItinerary;
