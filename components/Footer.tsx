import {
  LinkedInLogoIcon,
  TwitterLogoIcon,
  InstagramLogoIcon,
  GitHubLogoIcon,
  PaperPlaneIcon
} from '@radix-ui/react-icons';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className='w-screen h-[150px] bg-gradient-to-r from-tl-red to-tl-purple -ml-[120px]'>
      <div className='flex justify-around items-center h-full text-white'>
        <div>
          <p className='text-2xl'>Logo</p>
          <div className='flex gap-1'>
            <LinkedInLogoIcon />
            <TwitterLogoIcon />
            <InstagramLogoIcon />
            <GitHubLogoIcon />
          </div>
        </div>
        <div>
          <h1 className='font-semibold font-2xl'>Minha conta</h1>
          <div className='flex flex-col'>
            <a href='#' className='font-extralight'>
              Perfil
            </a>
            <a href='#' className='font-extralight'>
              Meus Passeios
            </a>
            <a href='#' className='font-extralight'>
              Configurações
            </a>
          </div>
        </div>
        <div>
          <h1 className='font-semibold font-2xl'>SAC</h1>
          <div className='flex flex-col'>
            <a href='#' className='font-extralight'>
              Perguntas Frequentes
            </a>
            <a href='#' className='font-extralight'>
              Contato
            </a>
            <a href='#' className='font-extralight'>
              Comercial
            </a>
          </div>
        </div>
        <div>
          <h1 className='font-semibold text-3xl'>É um guia de turismo?</h1>
          <div className='flex items-center gap-2'>
            <p className='text-xl'>Faça seu cadastro!</p>
            <Link
              href='/register/guide'
              className='flex bg-white px-3 py-[2px] text-black rounded-full items-center gap-1'
            >
              Clique aqui!
              <PaperPlaneIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
