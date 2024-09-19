import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import Rating from '../home-page/Rating';
import Image from 'next/image';
import { format } from 'date-fns';
import { Comment } from './CommentCardTour';

export function CommentDialogTour({
  comment,
  profilePic
}: {
  comment: Comment;
  profilePic: string;
}) {
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
          <DialogClose asChild>
            <Button variant={'destructive'}>Fechar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
