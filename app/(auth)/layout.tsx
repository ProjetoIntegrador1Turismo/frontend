import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className='flex justify-center h-[80vh]'>{children}</div>;
};

export default AuthLayout;
