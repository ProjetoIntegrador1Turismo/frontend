import React from 'react';
import styles from '../../styles/Navbar/Navbar.module.css';
import NavbarButtonsContainer from './NavBarButtonsContainer';
import { NavBarButtons } from '@/lib/config';
import AuthArea from './AuthArea';

const Navbar = () => {
  return (
    <div className={styles.NavbarContainer}>
      <div>Logo</div>
      <NavbarButtonsContainer buttons={NavBarButtons} />
      <AuthArea />
    </div>
  );
};

export default Navbar;
