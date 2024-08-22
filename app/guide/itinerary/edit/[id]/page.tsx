import React from 'react';

const ItineraryEditPage = ({ params }: { params: { id: string } }) => {
  return <div className='h-[75vh]'>{params.id}</div>;
};

export default ItineraryEditPage;
