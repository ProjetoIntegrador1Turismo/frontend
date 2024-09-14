import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';

export function CommentDialog({ text }: { text: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <DotsHorizontalIcon width={20} height={20} />
        </button>
      </DialogTrigger>
      <DialogContent className='min-w-fit'>
        <p className='whitespace-pre-wrap'>{text}</p>
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
