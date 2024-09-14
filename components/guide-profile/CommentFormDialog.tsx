import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import CommentForm from './CommentForm';

export function CommentFormDialog({ guideId, guideName }: { guideId: number; guideName: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-gradient-to-r from-tl-red to-tl-purple w-fit' type='button'>
          Avaliar
        </Button>
      </DialogTrigger>
      <DialogContent className='min-w-fit'>
        <div className='mt-3'>
          <CommentForm guideId={guideId} guideName={guideName} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type='button' variant='destructive'>
              Fechar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
