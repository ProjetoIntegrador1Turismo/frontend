import { GuideProfileTabs } from '@/components/guide-profile/GuideProfileTabs';
import { redirect } from 'next/navigation';
import React from 'react';

const GuideProfilePage = async ({ params }: { params: { id: string } }) => {
  if (isNaN(+params.id)) {
    redirect('/');
  }

  return (
    <div>
      <GuideProfileTabs id={+params.id} />
    </div>
  );
};

export default GuideProfilePage;
