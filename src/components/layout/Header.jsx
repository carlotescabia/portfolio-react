import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import CircularText from '../ui/CircularText';
import './Header.css';

const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Inicio' },
    { path: '/weather', label: 'Weather' },
  ];

  return (
    <motion.header 
      className="header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container">
        <nav className="nav">
          {/* Logo con texto circular */}
          <Link to="/" className="logo">
            <CircularText 
              text="• Portfolio • React • "
              spinDuration={25}
              onHover="pause"
              size="medium"
              className="logo__text"
            />
            <span className="logo__center">MP</span>
          </Link>

          {/* Navegación */}
          <ul className="nav__links">
            {navItems.map((item) => (
              <motion.li 
                key={item.path}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to={item.path} 
                  className={`nav__link ${location.pathname === item.path ? 'nav__link--active' : ''}`}
                >
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
