import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <motion.div 
      className="layout"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </motion.div>
  );
};

export default Layout;
