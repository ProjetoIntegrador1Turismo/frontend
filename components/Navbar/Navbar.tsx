import React from 'react';
import styles from '../../styles/Navbar/Navbar.module.css';
import NavbarButtonsContainer from './NavBarButtonsContainer';
import { NavBarButtons } from '@/lib/config';
import AuthArea from './AuthArea';
import Link from 'next/link';

const Navbar = () => {
  return (
    <>
      <div className={styles.NavbarContainer}>
        <Link href='/'>
          <img src='/tl.png' className='w-[96px] h-[60px]' />
        </Link>
        <NavbarButtonsContainer buttons={NavBarButtons} />
        <AuthArea />
      </div>
      <div className={styles.Divisor}></div>
    </>
  );
};

export default Navbar;
