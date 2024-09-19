'use client';
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import Rating from '../home-page/Rating';
import Image from 'next/image';
import { format } from 'date-fns';
import { Comment } from './Profile';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '../ui/use-toast';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export function CommentDialog({ comment, profilePic }: { comment: Comment; profilePic: string }) {
  const { toast } = useToast();
  const { data: sessionData } = useSession();
  const router = useRouter();
  const { mutate: deleteComment } = useMutation({
    mutationFn: async () => {
      return await axios.delete(`http://localhost:8081/comment/delete/${comment.id}`, {
        headers: { Authorization: `Bearer ${sessionData?.user.authToken}` }
      });
    },
    onSuccess: () => {
      toast({
        title: `Comentario do ponto de interesse ${comment.interestPoint.name} foi deletado!`,
        variant: 'default',
        className: 'bg-green-500 text-white'
      });
      router.refresh();
    },
    onError: () => {
      toast({
        title: `Não foi possivel deletar comentario do ponto de interesse ${comment.interestPoint.name}.`,
        variant: 'destructive'
      });
    }
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <DotsHorizontalIcon width={20} height={20} />
        </button>
      </DialogTrigger>
      <DialogContent className='min-w-fit'>
        <div className='w-[500px] h-fit p-4'>
          <div className='flex gap-3'>
            <Image
              height={90}
              width={90}
              alt={comment.tourist.touristName}
              src={profilePic}
              className='w-[90px] h-[90px] rounded-full object-cover'
            />
            <div>
              <div className='flex gap-3 items-center'>
                <h1 className='text-xl font-bold truncate'>{comment.tourist.touristName}</h1>
                <p className='text-sm font-light'>
                  Em {format(comment.wasVisitingDate, 'dd/MM/yyyy')}
                </p>
              </div>
              <div>
                <p className='text-sm font-light'>Avaliação</p>
                <Rating rating={comment.rating} />
              </div>
            </div>
          </div>
          <p>{comment.text}</p>
        </div>
        <DialogFooter className='justify-between w-full'>
          <Button
            type='submit'
            variant='destructive'
            className='font-bold'
            onClick={() => deleteComment()}
          >
            DELETAR
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
