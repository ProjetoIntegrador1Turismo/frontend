import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Review } from './GuideProfileTabs';
import Rating from '../home-page/Rating';
import Image from 'next/image';

export function CommentDialog({ review }: { review: Review }) {
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
              alt={review.touristName}
              src={review.avatarUrl}
              className='w-[90px] h-[90px] rounded-full object-cover'
            />
            <div>
              <div className='flex gap-3 items-center'>
                <h1 className='text-xl font-bold truncate'>{review.touristName}</h1>
                <p className='text-sm font-light'>Em {review.date}</p>
              </div>
              <div>
                <p className='text-sm font-light'>Avaliação</p>
                <Rating rating={review.rating} />
              </div>
            </div>
          </div>
          <p>{review.text}</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type='submit' variant='destructive'>
              Fechar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
