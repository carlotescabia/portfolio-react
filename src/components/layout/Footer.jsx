import { motion } from 'framer-motion';
import CircularText from '../ui/CircularText';
import './Footer.css';

const Footer = () => {
  return (
    <motion.footer 
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <div className="footer__content">
          <div className="footer__main">
            <div className="footer__brand">
              <CircularText 
                text="• Thank you for visiting • "
                spinDuration={40}
                onHover="slowDown"
                size="medium"
                className="footer__circular"
              />
              <h3 className="footer__title">Mi Portfolio</h3>
            </div>
            <p className="footer__text">
              Creado con ❤️ y React en Barcelona, España
            </p>
          </div>
          
          <div className="footer__bottom">
            <p>&copy; 2025 Mi Portfolio. Todos los derechos reservados.</p>
            <p>Diseñado con pasión por el código limpio</p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
