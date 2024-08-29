import { GuideProfileTabs } from '@/components/guide-profile/GuideProfileTabs';
import axios from 'axios';
import { redirect } from 'next/navigation';
import React from 'react';

const GuideProfilePage = async ({ params }: { params: { id: string } }) => {
  try {
    Number(params.id);
  } catch (error) {
    redirect('/');
  }
//   let tourData;
//   try {
//                                                  n tem essa rota ainda (pegar guia pelo id)
//     const request = await axios.get(`http://localhost:8081/page-source/tour/${params.id}`);
//     tourData = request.data.interestPoint;
//   } catch (error) {
//     redirect('/');
//   }
  return (
    <div>
      <GuideProfileTabs />
    </div>
  );
};

export default GuideProfilePage;
