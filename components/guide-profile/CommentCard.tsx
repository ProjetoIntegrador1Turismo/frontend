import React from 'react';
import OneStar from '../home-page/OneStar';

const CommentCard = () => {
  return (
    <div className='w-[700px] h-[550px] border border-black rounded-xl shadow-md shadow-gray-400 p-4'>
      <div className='flex gap-3'>
        <img src='/avatar.jpg' className='w-[90px] h-[90px] rounded-full object-cover' />
        <div>
          <div className='flex gap-3 items-center'>
            <h1 className='text-xl font-bold'>Gabriela da Silva Pereira</h1>
            <p className='text-sm font-light'>Em 01/03/2024</p>
          </div>
          <div>
            <p className='text-sm font-light'>Avaliação</p>
            <OneStar />
          </div>
        </div>
      </div>
      <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ultricies bibendum leo, a euismod turpis sagittis eu. Pellentesque commodo velit dui, id pellentesque ante gravida id. Morbi efficitur nisi dignissim ligula porttitor, non faucibus neque blandit. Sed in lacinia turpis, rhoncus congue neque. Phasellus quis velit lectus. Maecenas sodales id neque sed mollis. Morbi imperdiet nisl tortor, sed blandit mi tincidunt vel. Etiam suscipit, elit ut euismod consectetur, nulla nulla placerat nisi, eget tristique enim elit maximus tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse consectetur, ex sodales feugiat cursus, ex nisi tempor justo, sed venenatis nunc magna quis libero. Aenean ultrices ullamcorper ex, ac cursus mauris imperdiet in. Integer et urna imperdiet lacus iaculis lacinia et in metus. 
      </p>
    </div>
  );
};

export default CommentCard;
