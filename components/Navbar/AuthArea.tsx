'use client';
import { UserCircle, Menu } from 'lucide-react';
import styles from '../../styles/Navbar/AuthArea.module.css';
import { useState } from 'react';
import DropDownMenu from '../home-page/DropDownMenu';

const AuthArea = () => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  return (
    <div className='flex flex-col items-end'>
      <div className={styles.AuthAreaContainer}>
        <a href='#'>
          <UserCircle width={35} height={35} color='white' />
        </a>
        <a
          className='cursor-pointer'
          onClick={() => {
            setShowDropDown((currentState) => {
              return !currentState;
            });
          }}
        >
          <Menu width={35} height={35} color='white' />
        </a>
      </div>
      {showDropDown && <DropDownMenu trigger={setShowDropDown} />}
    </div>
  );
};

export default AuthArea;
