import { NavBarButtonProps } from '../../lib/interfaces';
import styles from '../../styles/Navbar/NavBarButton.module.css';

const NavBarButton = ({ buttonText, href, highlight }: NavBarButtonProps) => {
  if (highlight) {
    return (
      <div className={styles.NavButtonContainer}>
        <a href={href}>
          <p className='font-bold bg-gradient-to-r from-tl-red to-tl-purple bg-clip-text text-transparent'>
            {buttonText}
          </p>
        </a>
        <div
          className={`${styles.ButtonUnderlineDecor} bg-gradient-to-r from-tl-red to-tl-purple`}
        ></div>
      </div>
    );
  } else {
    return (
      <div className={styles.NavButtonContainer}>
        <a href={href}>
          <p>{buttonText}</p>
        </a>
        <div className={styles.ButtonUnderlineDecor}></div>
      </div>
    );
  }
};

export default NavBarButton;
