import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Users, Target, Zap, Sparkles, Network, Rocket, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { NetworkParticles, DigitalSphere, GlassCard } from '@/components/3D';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <NetworkParticles />
      <Header />

      {/* Hero Section - Immersive 3D */}
      <section className="relative pt-20 pb-32 px-6 md:px-12 max-w-[120rem] mx-auto w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-secondary-foreground/10 border border-secondary-foreground/30"
            >
              <Sparkles size={16} className="text-secondary-foreground" />
              <span className="text-secondary-foreground font-heading text-sm font-semibold">
                Experiência 3D Imersiva
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-heading font-bold text-foreground mb-6 leading-tight">
              Conecte-se ao <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-foreground to-cyber-purple">futuro</span> das oportunidades
            </h1>

            <p className="text-lg md:text-xl font-paragraph text-surface mb-8 max-w-lg">
              Networking inteligente com conexões relevantes. Encontre talentos, oportunidades e cresça profissionalmente em uma plataforma revolucionária.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/vagas"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-secondary-foreground to-cyber-purple text-background font-heading font-bold px-8 py-4 text-lg rounded-lg hover:shadow-2xl hover:shadow-secondary-foreground/50 transition-all"
                >
                  Começar Agora
                  <ArrowRight size={20} />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/empresas"
                  className="inline-flex items-center gap-3 bg-secondary/50 text-foreground font-heading font-bold px-8 py-4 text-lg rounded-lg border border-secondary-foreground/50 hover:border-secondary-foreground hover:bg-secondary/80 transition-all"
                >
                  Explorar
                  <ArrowRight size={20} />
                </Link>
              </motion.div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-secondary-foreground/20">
              {[
                { label: '+10K', value: 'Conexões' },
                { label: '+500', value: 'Comunidades' },
                { label: '98%', value: 'Satisfação' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <p className="text-secondary-foreground font-heading font-bold text-xl">{stat.label}</p>
                  <p className="text-surface font-paragraph text-sm">{stat.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - 3D Sphere */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <DigitalSphere />
          </motion.div>
        </div>
      </section>

      {/* Features Section - Floating Cards */}
      <section className="py-32 px-6 md:px-12 max-w-[120rem] mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Funcionalidades Poderosas
          </h2>
          <p className="text-lg font-paragraph text-surface max-w-2xl mx-auto">
            Ferramentas inteligentes para conectar profissionais e empresas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Network,
              title: 'Match Inteligente',
              description: 'IA que conecta você com oportunidades perfeitas',
              color: 'from-secondary-foreground',
            },
            {
              icon: Briefcase,
              title: 'Vagas Exclusivas',
              description: 'Acesso a oportunidades premium em diversas áreas',
              color: 'from-cyber-purple',
            },
            {
              icon: Users,
              title: 'Comunidades',
              description: 'Conecte-se com profissionais da sua área',
              color: 'from-secondary-foreground',
            },
            {
              icon: Rocket,
              title: 'Crescimento Rápido',
              description: 'Desenvolva sua carreira com recursos avançados',
              color: 'from-cyber-purple',
            },
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <GlassCard key={index} delay={index * 0.1}>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} to-transparent p-3 mb-4`}>
                  <Icon className="w-full h-full text-foreground" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="font-paragraph text-surface text-sm">{feature.description}</p>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* How It Works - 3 Steps */}
      <section className="py-32 px-6 md:px-12 max-w-[120rem] mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Como Funciona
          </h2>
          <p className="text-lg font-paragraph text-surface max-w-2xl mx-auto">
            Três passos simples para transformar sua carreira
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connection lines */}
          <div className="hidden md:block absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary-foreground/30 to-transparent" />

          {[
            {
              step: '01',
              title: 'Crie seu Perfil',
              description: 'Configure seu perfil profissional com suas habilidades e experiências',
              icon: Sparkles,
            },
            {
              step: '02',
              title: 'Conecte-se',
              description: 'Encontre profissionais e empresas alinhadas com seus objetivos',
              icon: Network,
            },
            {
              step: '03',
              title: 'Gere Oportunidades',
              description: 'Receba propostas exclusivas e desenvolva sua carreira',
              icon: TrendingUp,
            },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-secondary-foreground/10 to-cyber-purple/10 backdrop-blur-xl border border-secondary-foreground/20 rounded-2xl p-8 text-center hover:border-secondary-foreground/50 transition-all">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-secondary-foreground to-cyber-purple mb-6 mx-auto"
                  >
                    <span className="text-2xl font-heading font-bold text-background">{item.step}</span>
                  </motion.div>

                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="font-paragraph text-surface text-sm">{item.description}</p>

                  <Icon className="w-8 h-8 text-secondary-foreground/30 mx-auto mt-6" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Social Proof - Testimonials */}
      <section className="py-32 px-6 md:px-12 max-w-[120rem] mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Histórias de Sucesso
          </h2>
          <p className="text-lg font-paragraph text-surface max-w-2xl mx-auto">
            Profissionais e empresas transformando suas carreiras
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Maria Silva',
              role: 'Desenvolvedora Full Stack',
              testimonial: 'Encontrei a oportunidade perfeita em apenas 2 semanas. A plataforma é incrível!',
              avatar: 'https://static.wixstatic.com/media/a992bf_aefd16f23f554a15a8d330208922c56c~mv2.png?originWidth=128&originHeight=128',
            },
            {
              name: 'João Santos',
              role: 'Product Manager',
              testimonial: 'Conectei-me com profissionais incríveis que mudaram minha perspectiva de carreira.',
              avatar: 'https://static.wixstatic.com/media/a992bf_d450b883149341b2a960c46836be631d~mv2.png?originWidth=128&originHeight=128',
            },
            {
              name: 'Tech Innovations',
              role: 'Empresa',
              testimonial: 'Encontramos os melhores talentos para nosso time através da plataforma.',
              avatar: 'https://static.wixstatic.com/media/a992bf_995f8a6f6a7644bfbb008c5c17a2ebe8~mv2.png?originWidth=128&originHeight=128',
            },
          ].map((testimonial, index) => (
            <GlassCard key={index} delay={index * 0.1}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary-foreground to-cyber-purple flex items-center justify-center">
                  <span className="text-background font-heading font-bold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-heading font-bold text-foreground">{testimonial.name}</p>
                  <p className="font-paragraph text-secondary-foreground text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="font-paragraph text-surface italic">"{testimonial.testimonial}"</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Final CTA - Immersive */}
      <section className="py-32 px-6 md:px-12 max-w-[120rem] mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl p-12 md:p-20 text-center"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(0, 217, 255, 0.1), transparent)',
            border: '2px solid rgba(0, 217, 255, 0.2)',
          }}
        >
          {/* Animated background */}
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 rounded-3xl"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.1), transparent)',
            }}
          />

          <motion.div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6">
              Pronto para transformar sua carreira?
            </h2>
            <p className="text-lg md:text-xl font-paragraph text-surface max-w-3xl mx-auto mb-12">
              Junte-se a milhares de profissionais e empresas que já estão gerando oportunidades reais através de conexões inteligentes.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/profissional"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-secondary-foreground to-cyber-purple text-background font-heading font-bold px-10 py-4 text-lg rounded-lg hover:shadow-2xl hover:shadow-secondary-foreground/50 transition-all"
                >
                  Sou Profissional
                  <ArrowRight size={20} />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contratante"
                  className="inline-flex items-center gap-3 bg-secondary/50 text-foreground font-heading font-bold px-10 py-4 text-lg rounded-lg border border-secondary-foreground/50 hover:border-secondary-foreground hover:bg-secondary/80 transition-all"
                >
                  Sou Empresa
                  <ArrowRight size={20} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
