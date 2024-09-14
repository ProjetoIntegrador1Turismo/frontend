import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';

export function DescriptionDialog({ longDescription }: { longDescription: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
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
          <p className='text-xl font-light whitespace-pre-wrap'>{longDescription}</p>
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
