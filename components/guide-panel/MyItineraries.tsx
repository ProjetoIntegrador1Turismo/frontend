import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import ItinerariesPaginated from './ItinerariesPaginated';

const MyItineraries = async () => {
  return (
    <div className='min-h-[80vh] h-fit mb-3'>
      <Card>
        <CardHeader>
          <CardTitle>Meus roteiros</CardTitle>
          <CardDescription>Voce pode ver seus roteiros ou edita-los</CardDescription>
        </CardHeader>
        <CardContent>
          <ItinerariesPaginated />
        </CardContent>
      </Card>
    </div>
  );
};

export default MyItineraries;
