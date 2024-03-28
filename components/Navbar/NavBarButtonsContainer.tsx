import NavBarButton from './NavBarButton';
import { NavBarButtonsContainerProps } from '@/lib/interfaces';
import styles from '../../styles/Navbar/NavBarButtonsContainer.module.css';

const NavbarButtonsContainer = ({ buttons }: NavBarButtonsContainerProps) => {
  return (
    <div className={styles.NavButtonsContainer}>
      {buttons.map((button, i) => {
        return <NavBarButton key={i} buttonText={button.buttonText} href={button.href} />;
      })}
    </div>
  );
};

export default NavbarButtonsContainer;
