import { DropDownMenuItemProps } from '@/lib/interfaces';
import { CircleHelp, CircleUserRound, LogInIcon, LogOutIcon, UserRoundPlus } from 'lucide-react';

const DropDownMenuItem = ({
  children,
  login,
  logout,
  profile,
  register,
  about
}: DropDownMenuItemProps) => (
  <li className='p-2 flex gap-2 rounded-lg text-white hover:bg-gradient-to-r from-tl-red-2 to-tl-purple-2'>
    {login && <LogInIcon />}
    {logout && <LogOutIcon />}
    {profile && <CircleUserRound />}
    {register && <UserRoundPlus />}
    {about && <CircleHelp />}
    {children}
  </li>
);

export default DropDownMenuItem;
