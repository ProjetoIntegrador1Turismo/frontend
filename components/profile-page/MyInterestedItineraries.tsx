'use client';
import React, { useState } from 'react';
import { InterestedItinerary } from '@/components/profile-page/Profile';
import MyInterestsTable from '@/components/profile-page/MyInterestsTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

const MyInterestedItineraries = ({
  interestedItineraries: initialInterestedItineraries
}: {
  interestedItineraries: InterestedItinerary[];
}) => {
  const [interestedItineraries, setInterestedItineraries] = useState<InterestedItinerary[]>(
    initialInterestedItineraries
  );

  return (
    <div className='w-[802px] min-h-[75vh] h-fit mb-3'>
      <Card>
        <CardHeader>
          <CardTitle>Roteiros que você se interessou</CardTitle>
          <CardDescription>
            Os guias entrarão em contato com você.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MyInterestsTable
            interestedItineraries={interestedItineraries}
            setInterestedItineraries={setInterestedItineraries} // Passa a função para atualizar a lista
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default MyInterestedItineraries;
