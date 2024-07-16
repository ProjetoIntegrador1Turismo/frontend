'use client';
import {
  Menu,
  UserCircle,
  LogInIcon,
  UserRoundPlus,
  CircleHelp,
  LogOutIcon,
  UserRound
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useSession } from 'next-auth/react';
import { logout } from '@/actions/logout';
import Link from 'next/link';

export function AuthDropdown() {
  const { data } = useSession();

  if (data) {
    return (
      <DropdownMenu>
        <div className='flex min-h-[45px] min-w-[85px] h-[45px] w-[85px] rounded-[25px] justify-evenly items-center bg-gradient-to-r from-tl-red to-tl-purple'>
          <UserCircle width={35} height={35} color='white' />
          <DropdownMenuTrigger asChild>
            <Menu width={35} height={35} color='white' />
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent className='w-fit bg-gradient-to-r from-tl-red to-tl-purple text-white mt-2 mr-10'>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <p>
                Olá <span className='font-semibold'>{data?.user?.username}</span>!
              </p>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href='/profile' className='flex'>
                <UserRound className='mr-2 h-4 w-4' />
                <span>Perfil</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <form action={logout} className='flex'>
                <LogOutIcon className='mr-2 h-4 w-4' />
                <button type='submit'>Logout</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <div className='flex min-h-[45px] min-w-[85px] h-[45px] w-[85px] rounded-[25px] justify-evenly items-center bg-gradient-to-r from-tl-red to-tl-purple'>
        <UserCircle width={35} height={35} color='white' />
        <DropdownMenuTrigger asChild>
          <Menu width={35} height={35} color='white' />
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent className='w-fit bg-gradient-to-r from-tl-red to-tl-purple text-white mt-2 mr-10'>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href='/login'>
              <LogInIcon className='mr-2 h-4 w-4' />
              <span>Login</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href='/register'>
              <UserRoundPlus className='mr-2 h-4 w-4' />
              <span>Registre-se</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href='/about'>
              <CircleHelp className='mr-2 h-4 w-4' />
              <span>Sobre nós</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
