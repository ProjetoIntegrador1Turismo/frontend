import Link from 'next/link';
import DropDownMenuItem from './DropDownMenuItem';
import { DropDownMenuProps } from '@/lib/interfaces';
import { useSession } from 'next-auth/react';
import { logout } from '@/actions/logout';

const DropDownMenu = ({ trigger }: DropDownMenuProps) => {
  const { data } = useSession();

  const closeDropDown = () => {
    trigger((previousState) => {
      return !previousState;
    });
  };

  if (data) {
    return (
      <div className='absolute inset-y-16 z-50'>
        <ul className='bg-gradient-to-r from-tl-red to-tl-purple rounded-md shadow-sm shadow-gray-500 mb-24'>
          <li className='p-2 rounded-lg text-white'>
            Olá <span className='font-semibold'>{data?.user?.username}</span>!
          </li>
          <DropDownMenuItem profile>
            <Link onClick={closeDropDown} href='/profile'>
              Perfil
            </Link>
          </DropDownMenuItem>
          <DropDownMenuItem logout>
            <form action={logout}>
              <button type='submit'>Logout</button>
            </form>
          </DropDownMenuItem>
        </ul>
      </div>
    );
  }

  return (
    <div className='absolute inset-y-16 z-50 '>
      <ul className='bg-gradient-to-r from-tl-red to-tl-purple rounded-md shadow-sm shadow-gray-500 mb-24'>
        <DropDownMenuItem login>
          <Link onClick={closeDropDown} href='/login'>
            Login
          </Link>
        </DropDownMenuItem>
        <DropDownMenuItem register>
          <Link onClick={closeDropDown} href='/register'>
            Registro
          </Link>
        </DropDownMenuItem>
        <DropDownMenuItem about>
          <Link onClick={closeDropDown} href='/'>
            Sobre nós
          </Link>
        </DropDownMenuItem>
      </ul>
    </div>
  );
};

export default DropDownMenu;
