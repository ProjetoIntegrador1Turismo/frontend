import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className='flex justify-center h-[85vh]'>{children}</div>;
};

export default AuthLayout;
