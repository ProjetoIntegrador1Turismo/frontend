import { auth } from '@/auth';
import React from 'react';

const ComponenetTestingPage = async () => {
  return (
    <div>
      {JSON.stringify(await auth())}
    </div>
  );
};

export default ComponenetTestingPage;
