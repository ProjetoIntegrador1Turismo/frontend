import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { TourDescriptionProps } from '@/lib/interfaces';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';

export function DescriptionDialog({ description }: TourDescriptionProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className='mt-1 ml-[1450px]'>
          <DotsHorizontalIcon width={36} height={36} />
        </button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[1200px]'>
        <DialogHeader>
          <DialogTitle>
            <span className='select-none'>Descrição</span>
          </DialogTitle>
        </DialogHeader>
        <div>
          <p className='text-xl font-light whitespace-pre-wrap'>{description}</p>
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
