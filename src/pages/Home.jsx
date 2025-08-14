import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cloud, Code, Palette } from 'lucide-react';
import CircularText from '../components/ui/CircularText';
import './Home.css';

const Home = () => {
  const apps = [
    {
      id: 'weather',
      title: 'Weather Barcelona',
      description: 'Aplicación del clima elegante con productos estacionales',
      icon: Cloud,
      path: '/weather',
      features: ['Tiempo real', 'Diseño elegante', 'Productos locales'],
      status: 'active'
    },
    {
      id: 'tasks',
      title: 'Task Manager',
      description: 'Gestor de tareas minimalista y productivo',
      icon: Code,
      path: '/tasks',
      features: ['Próximamente', 'Productividad', 'Minimalista'],
      status: 'coming-soon'
    },
    {
      id: 'budget',
      title: 'Budget Tracker',
      description: 'Control de finanzas personales con gráficos elegantes',
      icon: Palette,
      path: '/budget',
      features: ['Próximamente', 'Finanzas', 'Gráficos'],
      status: 'coming-soon'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero section">
        <div className="container">
          <motion.div 
            className="hero__content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="hero__text" variants={itemVariants}>
              <h1 className="hero__title">
                Bienvenido a mi
                <span className="hero__title-accent"> Portfolio</span>
              </h1>
              <p className="hero__subtitle">
                Desarrollador & Creador Digital
              </p>
              <p className="hero__description">
                Explora mi colección de aplicaciones web creadas con pasión y dedicación. 
                Cada proyecto refleja mi compromiso con el diseño elegante y la funcionalidad intuitiva.
              </p>
            </motion.div>

            <motion.div className="hero__cta" variants={itemVariants}>
              <a href="#apps" className="btn btn--primary">
                Ver Aplicaciones
              </a>
              <div className="hero__circular-text">
                <CircularText 
                  text="⬇ Scroll down • Explora más • "
                  spinDuration={15}
                  onHover="goBonkers"
                  size="large"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Apps Section */}
      <section id="apps" className="apps section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title text-center">Mis Aplicaciones</h2>
          </motion.div>

          <motion.div 
            className="apps__grid grid grid--3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {apps.map((app, index) => (
              <motion.div
                key={app.id}
                className={`app-card card ${app.status === 'coming-soon' ? 'app-card--disabled' : ''}`}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div className="app-card__header">
                  <div className="app-card__icon">
                    <app.icon size={48} />
                  </div>
                  <div className="app-card__circular">
                    <CircularText 
                      text={`• ${app.title} • Click • `}
                      spinDuration={20 + index * 3}
                      onHover="speedUp"
                      size="small"
                    />
                  </div>
                </div>

                <h3 className="app-card__title">{app.title}</h3>
                <p className="app-card__description">{app.description}</p>

                <div className="app-card__features">
                  {app.features.map((feature, i) => (
                    <span key={i} className="feature-tag">
                      {feature}
                    </span>
                  ))}
                </div>

                {app.status === 'active' ? (
                  <Link to={app.path} className="btn btn--primary">
                    Abrir App
                  </Link>
                ) : (
                  <button className="btn btn--disabled" disabled>
                    En desarrollo
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="about section">
        <div className="container">
          <div className="about__content">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2>Sobre Mi Trabajo</h2>
              <p className="about__text">
                Cada aplicación está diseñada con un enfoque minimalista, priorizando 
                la experiencia del usuario y la funcionalidad intuitiva. Utilizo una 
                paleta de colores beige y verde oliva para crear interfaces relajantes 
                y elegantes.
              </p>
            </motion.div>

            <motion.div 
              className="skills grid grid--3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { icon: '🎨', title: 'Diseño UI/UX', desc: 'Interfaces elegantes y funcionales' },
                { icon: '⚡', title: 'React Development', desc: 'Componentes modernos y eficientes' },
                { icon: '📱', title: 'Responsive Design', desc: 'Perfecto en todos los dispositivos' }
              ].map((skill, index) => (
                <motion.div
                  key={index}
                  className="skill-card card"
                  variants={itemVariants}
                >
                  <div className="skill-card__icon">{skill.icon}</div>
                  <h3>{skill.title}</h3>
                  <p>{skill.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
