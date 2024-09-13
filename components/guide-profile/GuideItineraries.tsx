import React from 'react';
import { Itinerary } from './GuideProfileTabs';
import InterestPointCard from '../categories/InterestPointCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import GuideItineraryCard from './GuideItineraryCard';

const GuideItineraries = ({ itineraries }: { itineraries: Itinerary[] }) => {
  if (itineraries.length === 0) {
    return (
      <div className='min-h-[75vh] h-fit'>
        <Card>
          <CardHeader>
            <CardTitle>Roteiros do guia</CardTitle>
            <CardDescription>
              Aqui você encontra todos os roteiros que esse guia oferece!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='w-[500px] flex items-center flex-col'>
              <div className='w-fit flex flex-col items-center justify-center'>
                <h1 className='text-xl font-bold bg-gradient-to-r from-tl-red to-tl-purple bg-clip-text text-transparent'>
                  Que vazio...
                </h1>
                <p className='text-sm text-center w-1/2'>
                  Este guia ainda não possui roteiros disponíveis no momento. Volte em breve para
                  explorar novas aventuras!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='min-h-[75vh] h-fit'>
      <Card>
        <CardHeader>
          <CardTitle>Roteiros do guia</CardTitle>
          <CardDescription>
            Aqui você encontra todos os roteiros que esse guia oferece!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-5 grid-rows-2 gap-4'>
            {itineraries.map((item) => (
              <GuideItineraryCard
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
