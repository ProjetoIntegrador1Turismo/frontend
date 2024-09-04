import React from 'react';
import { Itinerary } from './GuideProfileTabs';
import InterestPointCard from '../categories/InterestPointCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

const GuideItineraries = ({ itineraries }: { itineraries: Itinerary[] }) => {
  if (itineraries.length === 0) {
    return <p>Wow, que vazio!</p>;
  }

  return (
    <div className='min-h-[75vh] h-fit'>
      <Card>
        <CardHeader>
          <CardTitle>Reviews do guia</CardTitle>
          <CardDescription>
            Aqui você encontra todos as avaliações que esse guia recebeu!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-5 grid-rows-2 gap-4'>
            {itineraries.map((item) => (
              <InterestPointCard
                type='itinerary'
                id={item.id}
                key={item.id}
                name={item.title}
                imageCoverUrl={item.imageCoverUrl}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuideItineraries;
