import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplashScreen from '@/components/SplashScreen';
import { ArrowRight, Briefcase, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);

  useEffect(() => {
    const visited = localStorage.getItem('talentHubVisited');
    if (visited) {
      setShowSplash(false);
      setHasVisited(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    localStorage.setItem('talentHubVisited', 'true');
  };

  if (showSplash && !hasVisited) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-12 max-w-[100rem] mx-auto">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-6xl md:text-7xl font-heading font-bold text-foreground mb-6 leading-tight">
              Conecte com os <span className="text-secondary-foreground">Melhores Talentos</span>
            </h1>
            <p className="text-xl font-paragraph text-surface mb-8 leading-relaxed">
              Encontre oportunidades incríveis ou recrute os profissionais que sua empresa precisa. TalentHub é a ponte entre talentos e sucesso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/vagas">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(127, 255, 0, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-secondary-foreground text-background px-8 py-4 rounded-lg font-heading font-bold text-lg flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  Explorar Vagas <ArrowRight size={20} />
                </motion.button>
              </Link>
              <Link to="/empresas">
                <motion.button
                  whileHover={{ scale: 1.05, borderColor: '#7FFF00' }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-secondary-foreground text-secondary-foreground px-8 py-4 rounded-lg font-heading font-bold text-lg flex items-center gap-2 w-full sm:w-auto justify-center hover:bg-secondary-foreground/10 transition"
                >
                  Ver Empresas <ArrowRight size={20} />
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* 3D Animated Element */}
          <motion.div
            variants={itemVariants}
            className="relative h-96 md:h-full min-h-96"
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 bg-gradient-to-br from-secondary-foreground/20 to-secondary-foreground/5 rounded-3xl backdrop-blur-sm border border-secondary-foreground/30 flex items-center justify-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="text-secondary-foreground"
              >
                <Zap size={120} strokeWidth={1} />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-12 bg-secondary/30 backdrop-blur-sm">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            className="text-center mb-16"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-heading font-bold mb-4">
              Por que escolher <span className="text-secondary-foreground">TalentHub?</span>
            </h2>
            <p className="text-xl font-paragraph text-surface max-w-2xl mx-auto">
              Plataforma moderna e intuitiva para conectar talentos com oportunidades
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Briefcase,
                title: 'Vagas Exclusivas',
                description: 'Acesso a oportunidades de trabalho das melhores empresas do mercado',
              },
              {
                icon: Users,
                title: 'Comunidade Vibrante',
                description: 'Conecte-se com profissionais e empresas que compartilham seus valores',
              },
              {
                icon: Zap,
                title: 'Processo Rápido',
                description: 'Candidaturas simples e respostas rápidas de recrutadores',
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(127, 255, 0, 0.1)' }}
                  className="bg-background/50 backdrop-blur-sm border border-secondary-foreground/20 rounded-2xl p-8 hover:border-secondary-foreground/50 transition-all"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-secondary-foreground mb-4"
                  >
                    <Icon size={48} strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="text-2xl font-heading font-bold mb-3">{feature.title}</h3>
                  <p className="font-paragraph text-surface">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            className="bg-gradient-to-r from-secondary-foreground/10 to-secondary-foreground/5 border border-secondary-foreground/30 rounded-3xl p-12 md:p-16 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Pronto para começar?
            </h2>
            <p className="text-xl font-paragraph text-surface mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de profissionais e empresas que já estão transformando suas carreiras e negócios
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/vagas">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-secondary-foreground text-background px-8 py-4 rounded-lg font-heading font-bold text-lg"
                >
                  Buscar Vagas
                </motion.button>
              </Link>
              <Link to="/empresas">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-secondary-foreground text-secondary-foreground px-8 py-4 rounded-lg font-heading font-bold text-lg hover:bg-secondary-foreground/10 transition"
                >
                  Explorar Empresas
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
