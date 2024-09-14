'use client';
import React from 'react';
import { InterestedItinerary } from '@/components/profile-page/Profile';
import MyInterestsTable from '@/components/profile-page/MyInterestsTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

const MyInterestedItineraries = ({
  interestedItineraries
}: {
  interestedItineraries: InterestedItinerary[];
}) => {
  return (
    <div className='w-[802px] min-h-[75vh] h-fit mb-3'>
      <Card>
        <CardHeader>
          <CardTitle>Roteiros que você se interessou</CardTitle>
          <CardDescription>
            Aqui você encontra todos os roteiros que você se interessou!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MyInterestsTable interestedItineraries={interestedItineraries} />
        </CardContent>
      </Card>
    </div>
  );
};

export default MyInterestedItineraries;
