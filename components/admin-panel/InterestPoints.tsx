import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import InterestPointEdit from './InterestPointsEdit';

const InterestPoints = async () => {
  return (
    <div className='min-h-[75vh]'>
      <Card className='w-[750px] '>
        <CardHeader>
          <CardTitle>Edição de pontos de interesse</CardTitle>
          <CardDescription>Selecione o ponto de interesse que deseja editar.</CardDescription>
        </CardHeader>
        <CardContent>
          <InterestPointEdit />
        </CardContent>
      </Card>
    </div>
  );
};

export default InterestPoints;
