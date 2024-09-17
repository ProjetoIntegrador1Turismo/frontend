import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { PlaneTakeoff } from 'lucide-react';
import axios from 'axios';
import { getAuthToken } from '@/api/service';
import ItinerariesSlider from './ItinerariesSlider';

export type GuideItineraries = GuideItinerary[];

export interface GuideItinerary {
  id: number;
  title: string;
  imageCoverUrl: string;
}

const ItinerariesDialog = async ({
  guideId,
  tourId,
  tourTitle,
  guideName
}: {
  guideId: number;
  guideName: string;
  tourId: number;
  tourTitle: string;
}) => {
  const token = await getAuthToken();
  let response;
  if (token) {
    response = await axios.get<GuideItineraries>(
      `http://localhost:8081/itinerary/guide/${guideId}/interest-point/${tourId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className='w-[250px] h-[70px] bg-gradient-to-t  from-tl-red items-center text-xl to-tl-purple rounded-full flex justify-center gap-2 text-white font-extrabold hover:from-tl-red-2 hover:to-tl-purple-2 select-none'
          disabled={!token}
        >
          Ver Roteiros
          <PlaneTakeoff />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-[1200px]'>
        <DialogHeader>
          <DialogTitle>
            <span className='select-none'>
              Roteiros que {guideName} oferece que contem {tourTitle}:
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className='flex items-center justify-center'>
          <ItinerariesSlider slides={response?.data ?? []} />
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
};

export default ItinerariesDialog;
