import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplashScreen from '@/components/SplashScreen';
import { ArrowRight, Briefcase, Users, Zap, Sparkles, Target, Rocket } from 'lucide-react';
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
      <section className="pt-32 pb-20 px-6 md:px-12 max-w-[120rem] mx-auto w-full">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 text-secondary-foreground"
              >
                <Sparkles size={20} />
                <span className="font-heading font-semibold text-sm">Bem-vindo ao TalentHub</span>
              </motion.div>
              <h1 className="text-7xl md:text-8xl font-heading font-bold text-foreground leading-tight">
                Conecte com os <span className="text-secondary-foreground">Melhores</span> <span className="text-secondary-foreground">Talentos</span>
              </h1>
            </div>
            <p className="text-lg md:text-xl font-paragraph text-surface leading-relaxed max-w-xl">
              Encontre oportunidades incríveis ou recrute os profissionais que sua empresa precisa. TalentHub é a ponte entre talentos e sucesso, conectando carreiras com possibilidades infinitas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/vagas" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(127, 255, 0, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-secondary-foreground text-background px-8 py-4 rounded-lg font-heading font-bold text-lg flex items-center justify-center gap-2 hover:bg-secondary-foreground/90 transition"
                >
                  Explorar Vagas <ArrowRight size={20} />
                </motion.button>
              </Link>
              <Link to="/empresas" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05, borderColor: '#7FFF00', backgroundColor: 'rgba(127, 255, 0, 0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full border-2 border-secondary-foreground text-secondary-foreground px-8 py-4 rounded-lg font-heading font-bold text-lg flex items-center justify-center gap-2 transition"
                >
                  Ver Empresas <ArrowRight size={20} />
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* 3D Animated Element - Enhanced */}
          <motion.div
            variants={itemVariants}
            className="relative h-96 md:h-full min-h-[500px] flex items-center justify-center"
          >
            {/* Animated Background Orbs */}
            <motion.div
              animate={{
                y: [0, -30, 0],
                x: [0, 20, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute top-0 right-0 w-72 h-72 bg-secondary-foreground/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                y: [0, 30, 0],
                x: [0, -20, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute bottom-0 left-0 w-72 h-72 bg-secondary-foreground/5 rounded-full blur-3xl"
            />

            {/* Main 3D Card */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotateX: [0, 5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative z-10 w-full h-full max-w-sm bg-gradient-to-br from-secondary-foreground/20 via-secondary-foreground/10 to-secondary-foreground/5 rounded-3xl backdrop-blur-md border border-secondary-foreground/30 flex flex-col items-center justify-center p-8 overflow-hidden"
            >
              {/* Animated Grid Background */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-b from-secondary-foreground/20 to-transparent" />
              </div>

              {/* Main Icon */}
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="text-secondary-foreground mb-6 relative z-20"
              >
                <Rocket size={80} strokeWidth={1.5} />
              </motion.div>

              {/* Text Content */}
              <div className="text-center relative z-20 space-y-3">
                <h3 className="text-2xl font-heading font-bold text-foreground">Transforme sua Carreira</h3>
                <p className="text-sm font-paragraph text-surface">Acesso a oportunidades exclusivas e comunidade vibrante</p>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-8 left-8 text-secondary-foreground/40"
              >
                <Sparkles size={24} />
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-8 right-8 text-secondary-foreground/40"
              >
                <Target size={24} />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 md:px-12 bg-secondary/20 backdrop-blur-sm relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary-foreground rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-foreground rounded-full blur-3xl" />
        </div>

        <div className="max-w-[120rem] mx-auto relative z-10">
          <motion.div
            className="text-center mb-20"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2 text-secondary-foreground mb-4"
            >
              <Sparkles size={20} />
              <span className="font-heading font-semibold">Recursos Principais</span>
            </motion.div>
            <h2 className="text-6xl md:text-7xl font-heading font-bold mb-6">
              Por que escolher <span className="text-secondary-foreground">TalentHub?</span>
            </h2>
            <p className="text-lg md:text-xl font-paragraph text-surface max-w-3xl mx-auto">
              Plataforma moderna, intuitiva e poderosa para conectar talentos excepcionais com oportunidades transformadoras
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
                description: 'Acesso a oportunidades de trabalho das melhores empresas do mercado, com filtros avançados e recomendações personalizadas',
                details: ['Filtros inteligentes', 'Recomendações IA', 'Notificações em tempo real']
              },
              {
                icon: Users,
                title: 'Comunidade Vibrante',
                description: 'Conecte-se com profissionais e empresas que compartilham seus valores e objetivos de carreira',
                details: ['Networking ativo', 'Eventos exclusivos', 'Mentoria profissional']
              },
              {
                icon: Zap,
                title: 'Processo Rápido',
                description: 'Candidaturas simples, respostas rápidas de recrutadores e acompanhamento em tempo real',
                details: ['Candidatura 1-click', 'Feedback imediato', 'Dashboard completo']
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -15, boxShadow: '0 30px 60px rgba(127, 255, 0, 0.15)' }}
                  className="bg-background/60 backdrop-blur-md border border-secondary-foreground/20 rounded-2xl p-8 hover:border-secondary-foreground/50 transition-all group"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-secondary-foreground mb-6 group-hover:scale-110 transition-transform"
                  >
                    <Icon size={56} strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="text-2xl font-heading font-bold mb-3 text-foreground">{feature.title}</h3>
                  <p className="font-paragraph text-surface mb-6 leading-relaxed">{feature.description}</p>
                  <div className="space-y-2 border-t border-secondary-foreground/10 pt-6">
                    {feature.details.map((detail, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 text-sm text-surface"
                      >
                        <div className="w-1.5 h-1.5 bg-secondary-foreground rounded-full" />
                        {detail}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 px-6 md:px-12 max-w-[120rem] mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { number: '10K+', label: 'Profissionais Ativos', icon: Users },
            { number: '500+', label: 'Empresas Parceiras', icon: Briefcase },
            { number: '5K+', label: 'Vagas Abertas', icon: Target },
            { number: '95%', label: 'Taxa de Sucesso', icon: Rocket },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="inline-block mb-4 p-4 bg-secondary-foreground/10 rounded-full group-hover:bg-secondary-foreground/20 transition"
                >
                  <Icon size={32} className="text-secondary-foreground" />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="text-5xl md:text-6xl font-heading font-bold text-secondary-foreground mb-2"
                >
                  {stat.number}
                </motion.h3>
                <p className="text-lg font-paragraph text-surface">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-12 relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-foreground/5 via-secondary-foreground/10 to-secondary-foreground/5" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary-foreground rounded-full blur-3xl" />
        </div>

        <div className="max-w-[120rem] mx-auto relative z-10">
          <motion.div
            className="bg-gradient-to-br from-secondary-foreground/15 to-secondary-foreground/5 border border-secondary-foreground/30 rounded-3xl p-12 md:p-20 text-center backdrop-blur-md"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2 text-secondary-foreground mb-6"
            >
              <Sparkles size={24} />
              <span className="font-heading font-semibold">Comece Agora</span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-foreground">
              Pronto para transformar sua carreira?
            </h2>
            <p className="text-lg md:text-xl font-paragraph text-surface mb-10 max-w-3xl mx-auto leading-relaxed">
              Junte-se a milhares de profissionais e empresas que já estão transformando suas carreiras e negócios através da TalentHub. Sua próxima oportunidade está a apenas um clique de distância.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/vagas" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(127, 255, 0, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-secondary-foreground text-background px-10 py-4 rounded-lg font-heading font-bold text-lg hover:bg-secondary-foreground/90 transition"
                >
                  Buscar Vagas Agora
                </motion.button>
              </Link>
              <Link to="/empresas" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05, borderColor: '#7FFF00', backgroundColor: 'rgba(127, 255, 0, 0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full border-2 border-secondary-foreground text-secondary-foreground px-10 py-4 rounded-lg font-heading font-bold text-lg transition"
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
