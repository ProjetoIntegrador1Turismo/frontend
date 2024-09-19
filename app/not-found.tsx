import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const NotFound = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center text-center p-4'>
      <h1 className='text-6xl font-bold bg-gradient-to-r from-tl-red to-tl-purple bg-clip-text text-transparent'>
        404
      </h1>
      <h2 className='text-2xl font-semibold text-gray-800 mt-4'>Oops! Página não encontrada</h2>
      <p className='text-gray-600 mt-2 max-w-lg'>
        Parece que você se perdeu em algum lugar nas maravilhas do turismo. Não se preocupe, nós
        estamos aqui para ajudar a encontrar o caminho de volta!
      </p>
      <Image
        src='/404.svg'
        alt='Viajante Perdido'
        className='w-64 h-64 mt-6'
        width={256}
        height={256}
      />
      <Link
        href='/'
        className='mt-8 inline-block px-6 py-3 bg-gradient-to-r from-tl-red to-tl-purple text-white text-lg font-medium rounded-md shadow-md hover:from-tl-red-2 hover:to-tl-purple-2 transition-colors duration-200'
      >
        Voltar para a Página Inicial
      </Link>
    </div>
  );
};

export default NotFound;
