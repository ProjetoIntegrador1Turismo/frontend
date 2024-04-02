import { NavBarButtonProps } from '../../lib/interfaces';
import styles from '../../styles/Navbar/NavBarButton.module.css';

const NavBarButton = ({ buttonText, href }: NavBarButtonProps) => {
  return (
    <div className={styles.NavButtonContainer}>
      <a href={href}>
        <p>{buttonText}</p>
      </a>
      <div className={styles.ButtonUnderlineDecor}></div>
    </div>
  );
};

export default NavBarButton;
