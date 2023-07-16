import { Link } from 'react-router-dom';
import styles from './css/Navbar.module.css'

const Navbar = () => {
  return (
    <nav className={ styles.navbar }>
      <div className={ styles.navbar_left }>
        <span className={ styles.navbar_brand }>LoanStar</span>
      </div>
      <div className={ styles.navbar_right }>
        <ul className={ styles.navbar_nav }>
          <li className={ styles.nav_item }><Link to="/">Inicio</Link></li>
          <li className={ styles.nav_item }><Link to="/sobre">Sobre</Link></li>
          <li className={ styles.nav_item }><Link to="/contato">Contato</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;