import { auth } from '@/auth';
import React from 'react';

const ProfilePage = async () => {
  return <div className='break-words'>{JSON.stringify(await auth())}</div>;
};

export default ProfilePage;
