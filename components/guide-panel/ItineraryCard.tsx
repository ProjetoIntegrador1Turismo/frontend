import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';

interface ItineraryCardProps {
  imageUrl: string;
  title: string;
}

const ItineraryCard: React.FC<ItineraryCardProps> = ({ imageUrl, title }) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <img src={imageUrl} alt={title} className="w-full h-32 object-cover rounded-t-md" />
      </CardHeader>
      <CardContent>
        <CardTitle>{title}</CardTitle>
      </CardContent>
      <CardFooter>
        {/* comentários extras , no footer*/}
      </CardFooter>
    </Card>
  );
};

export default ItineraryCard;
