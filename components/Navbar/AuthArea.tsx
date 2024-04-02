import { UserCircle, Menu } from 'lucide-react';
import styles from '../../styles/Navbar/AuthArea.module.css';

const AuthArea = () => {
  return (
    <div className={styles.AuthAreaContainer}>
      <a href='#'>
        <UserCircle width={35} height={35} color='white' />
      </a>
      <a href='#'>
        <Menu width={35} height={35} color='white' />
      </a>
    </div>
  );
};

export default AuthArea;
