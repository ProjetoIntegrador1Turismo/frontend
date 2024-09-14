import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className='flex min-h-[85vh] justify-center h-fit'>{children}</div>;
};

export default AuthLayout;
