import { auth } from '@/auth';
import React from 'react';

const AdminPage = async () => {
  const session = await auth();
  return <div>{JSON.stringify(session)}</div>;
};

export default AdminPage;
