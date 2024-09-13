'use client';
import React from 'react';
import { InterestedItinerary } from '@/components/profile-page/Profile';
import MyInterestsTable from '@/components/profile-page/MyInterestsTable';

const MyInterestedItineraries = ({
  interestedItineraries
}: {
  interestedItineraries: InterestedItinerary[];
}) => {
  return (
    <div>
      <MyInterestsTable interestedItineraries={interestedItineraries} />
    </div>
  );
};

export default MyInterestedItineraries;
