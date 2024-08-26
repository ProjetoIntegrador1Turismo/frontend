import { getAuthToken } from '@/api/service';
import EditItineraryForm from '@/components/guide-panel/EditiItineraryForm';
import { redirect } from 'next/navigation';

export interface Itinerary {
  id: number;
  title: string;
  description: string;
  mediumCost: number;
  days: string;
  interestPoints: InterestPoint[];
}

interface InterestPoint {
  id: number;
  name: string;
  shortDescription: string;
  imageCoverUrl: string;
  interestPointType: string;
}

const ItineraryEditPage = async ({ params }: { params: { id: string } }) => {
  try {
    Number(params.id);
  } catch (error) {
    redirect('/');
  }

  let itineraryData: Itinerary;

  try {
    const request = await fetch(`http://localhost:8081/itinerary/${params.id}`, {
      headers: { Authorization: `Bearer ${await getAuthToken()}` },
      cache: 'no-cache'
    });
    itineraryData = (await request.json()) as Itinerary;
  } catch (error) {
    redirect('/');
  }

  return (
    <div className='min-h-[75vh] h-fit flex items-center justify-center'>
      <EditItineraryForm itinerary={itineraryData} />
    </div>
  );
};

export default ItineraryEditPage;
