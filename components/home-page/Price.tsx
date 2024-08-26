import React from 'react';

const Price = ({ price }: { price: number }) => {
  switch (price) {
    case 1:
      return (
        <p className='tracking-[6px] select-none'>
          $ <span className='text-gray-400'>$ $</span>
        </p>
      );
    case 2:
      return (
        <p className='tracking-[6px] select-none'>
          $ $ <span className='text-gray-400'>$</span>
        </p>
      );
    case 3:
      return <p className='tracking-[6px] select-none'>$ $ $</p>;
    default:
      return null;
  }
};

export default Price;
