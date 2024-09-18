import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-[75vh] h-fit my-10 flex items-center justify-center'>{children}</div>
  );
};

export default AuthLayout;
