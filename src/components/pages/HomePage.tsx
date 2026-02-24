import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplashScreen from '@/components/SplashScreen';
import WireframeGlobe from '@/components/WireframeGlobe';
import { ArrowRight, Briefcase, Users, Zap, Sparkles, Target, Rocket, Search } from 'lucide-react';
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
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Header />

      {/* Hero Section - Ultra Modern with 3D Globe */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient orbs */}
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-20 left-10 w-96 h-96 bg-cyber-purple/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-electric-blue/20 rounded-full blur-3xl"
          />
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 md:px-12 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px]">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8 z-20"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-electric-blue rounded-full animate-pulse" />
                  <span className="font-heading font-semibold text-sm text-electric-blue uppercase tracking-widest">
                    O Futuro do Networking
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-6xl md:text-7xl lg:text-8xl font-heading font-black leading-tight"
                >
                  <span className="bg-gradient-to-r from-electric-blue via-cyber-purple to-electric-blue bg-clip-text text-transparent">
                    Conecte
                  </span>
                  <br />
                  <span className="text-foreground">com os Melhores</span>
                  <br />
                  <span className="text-foreground">Talentos</span>
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg md:text-xl font-paragraph text-surface leading-relaxed max-w-lg"
              >
                Plataforma de networking de próxima geração. Encontre oportunidades incríveis ou recrute os profissionais que sua empresa precisa.
              </motion.p>

              {/* Floating Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex gap-3 pt-4"
              >
                <div className="flex-1 relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-electric-blue to-cyber-purple rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300" />
                  <input
                    type="text"
                    placeholder="Buscar vagas, empresas..."
                    className="relative w-full bg-dark-charcoal border border-electric-blue/30 rounded-lg px-6 py-4 text-foreground placeholder-surface/50 focus:outline-none focus:border-electric-blue transition-all"
                  />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-electric-blue/60 w-5 h-5" />
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Link to="/vagas" className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 217, 255, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-electric-blue to-cyber-purple text-background px-8 py-4 rounded-lg font-heading font-bold text-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                  >
                    Explorar Vagas <ArrowRight size={20} />
                  </motion.button>
                </Link>
                <Link to="/empresas" className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.05, borderColor: '#00D9FF', backgroundColor: 'rgba(0, 217, 255, 0.1)' }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full border-2 border-electric-blue text-electric-blue px-8 py-4 rounded-lg font-heading font-bold text-lg flex items-center justify-center gap-2 transition-all"
                  >
                    Ver Empresas <ArrowRight size={20} />
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right - 3D Globe with Floating Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative h-96 md:h-full min-h-[600px] flex items-center justify-center"
            >
              {/* Globe Container */}
              <div className="relative w-full h-full flex items-center justify-center">
                <WireframeGlobe />

                {/* Floating Profile Cards - Glassmorphism */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-12 left-0 w-48 bg-dark-charcoal/40 backdrop-blur-xl border border-electric-blue/30 rounded-2xl p-4 shadow-2xl"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-electric-blue to-cyber-purple rounded-full" />
                    <div>
                      <p className="font-heading font-bold text-sm text-foreground">Alex Silva</p>
                      <p className="text-xs text-surface">Designer UX/UI</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs bg-electric-blue/20 text-electric-blue px-2 py-1 rounded">Design</span>
                    <span className="text-xs bg-cyber-purple/20 text-cyber-purple px-2 py-1 rounded">Tech</span>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                  className="absolute bottom-12 right-0 w-48 bg-dark-charcoal/40 backdrop-blur-xl border border-cyber-purple/30 rounded-2xl p-4 shadow-2xl"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyber-purple to-electric-blue rounded-full" />
                    <div>
                      <p className="font-heading font-bold text-sm text-foreground">TechCorp</p>
                      <p className="text-xs text-surface">Hiring Now</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs bg-cyber-purple/20 text-cyber-purple px-2 py-1 rounded">Tech</span>
                    <span className="text-xs bg-electric-blue/20 text-electric-blue px-2 py-1 rounded">Jobs</span>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -15, 0], x: [0, 15, 0] }}
                  transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                  className="absolute top-1/3 right-12 w-48 bg-dark-charcoal/40 backdrop-blur-xl border border-electric-blue/30 rounded-2xl p-4 shadow-2xl"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-electric-blue to-cyber-purple rounded-full" />
                    <div>
                      <p className="font-heading font-bold text-sm text-foreground">Maria Costa</p>
                      <p className="text-xs text-surface">Dev Full Stack</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs bg-electric-blue/20 text-electric-blue px-2 py-1 rounded">Dev</span>
                    <span className="text-xs bg-cyber-purple/20 text-cyber-purple px-2 py-1 rounded">Senior</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section - Modern Grid */}
      <section className="py-32 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-charcoal/50 to-background" />

        <div className="max-w-[120rem] mx-auto relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2 text-electric-blue mb-4"
            >
              <Sparkles size={20} />
              <span className="font-heading font-semibold uppercase tracking-widest text-sm">Recursos Principais</span>
            </motion.div>
            <h2 className="text-6xl md:text-7xl font-heading font-black mb-6">
              Por que escolher <span className="bg-gradient-to-r from-electric-blue to-cyber-purple bg-clip-text text-transparent">TalentHub?</span>
            </h2>
            <p className="text-lg md:text-xl font-paragraph text-surface max-w-3xl mx-auto">
              Plataforma moderna, intuitiva e poderosa para conectar talentos excepcionais com oportunidades transformadoras
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
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
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -15, boxShadow: '0 0 40px rgba(0, 217, 255, 0.2)' }}
                  className="bg-dark-charcoal/60 backdrop-blur-xl border border-electric-blue/20 rounded-2xl p-8 hover:border-electric-blue/50 transition-all group"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-electric-blue mb-6 group-hover:scale-110 transition-transform"
                  >
                    <Icon size={56} strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="text-2xl font-heading font-bold mb-3 text-foreground">{feature.title}</h3>
                  <p className="font-paragraph text-surface mb-6 leading-relaxed">{feature.description}</p>
                  <div className="space-y-2 border-t border-electric-blue/10 pt-6">
                    {feature.details.map((detail, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 text-sm text-surface"
                      >
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-electric-blue to-cyber-purple rounded-full" />
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

      {/* Stats Section - Neon Glow */}
      <section className="py-32 px-6 md:px-12 max-w-[120rem] mx-auto relative">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="inline-block mb-4 p-4 bg-gradient-to-br from-electric-blue/20 to-cyber-purple/20 rounded-full group-hover:from-electric-blue/30 group-hover:to-cyber-purple/30 transition border border-electric-blue/30"
                >
                  <Icon size={32} className="text-electric-blue" />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="text-5xl md:text-6xl font-heading font-black bg-gradient-to-r from-electric-blue to-cyber-purple bg-clip-text text-transparent mb-2"
                >
                  {stat.number}
                </motion.h3>
                <p className="text-lg font-paragraph text-surface">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* CTA Section - Premium */}
      <section className="py-32 px-6 md:px-12 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-0 right-0 w-96 h-96 bg-cyber-purple/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-electric-blue/20 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-[120rem] mx-auto relative z-10">
          <motion.div
            className="bg-gradient-to-br from-dark-charcoal/80 to-dark-charcoal/40 border border-electric-blue/30 rounded-3xl p-12 md:p-20 text-center backdrop-blur-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2 text-electric-blue mb-6"
            >
              <Sparkles size={24} />
              <span className="font-heading font-semibold uppercase tracking-widest text-sm">Comece Agora</span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-heading font-black mb-6 bg-gradient-to-r from-electric-blue via-cyber-purple to-electric-blue bg-clip-text text-transparent">
              Pronto para transformar sua carreira?
            </h2>
            <p className="text-lg md:text-xl font-paragraph text-surface mb-10 max-w-3xl mx-auto leading-relaxed">
              Junte-se a milhares de profissionais e empresas que já estão transformando suas carreiras e negócios através da TalentHub. Sua próxima oportunidade está a apenas um clique de distância.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/vagas" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 217, 255, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-electric-blue to-cyber-purple text-background px-10 py-4 rounded-lg font-heading font-bold text-lg hover:shadow-lg transition-all"
                >
                  Buscar Vagas Agora
                </motion.button>
              </Link>
              <Link to="/empresas" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05, borderColor: '#00D9FF', backgroundColor: 'rgba(0, 217, 255, 0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full border-2 border-electric-blue text-electric-blue px-10 py-4 rounded-lg font-heading font-bold text-lg transition-all"
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
