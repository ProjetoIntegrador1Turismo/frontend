import GuideCard from '@/components/home-page/GuideCard';
import { mockGuide } from '@/lib/mocks';
import React from 'react';

const ComponenetTestingPage = () => {
  return (
    <div>
      <GuideCard guide={mockGuide} />
    </div>
  );
};

export default ComponenetTestingPage;
