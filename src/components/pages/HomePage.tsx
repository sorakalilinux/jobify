// HPI 1.7-V - PREMIUM DESIGN
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowRight, Briefcase, Users, TrendingUp, Search, CheckCircle2, Building2, Zap, Sparkles, Target } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- Utility Components ---

const Marquee = ({ children, baseVelocity = 100, className = "" }: { children: React.ReactNode, baseVelocity?: number, className?: string }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  const x = useTransform(baseX, (v) => `${v}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={`overflow-hidden whitespace-nowrap flex flex-nowrap ${className}`}>
      <motion.div className="flex flex-nowrap gap-8" style={{ x }}>
        {children}
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
};

const ParallaxImage = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="w-full h-[120%] relative -top-[10%]">
        <Image src={src} alt={alt} width={1920} className="w-full h-full object-cover" />
      </motion.div>
    </div>
  );
};

// Mouse-following glow effect
const MouseGlow = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed w-96 h-96 rounded-full pointer-events-none z-0"
      style={{
        x: useTransform(mouseX, (v) => v - 192),
        y: useTransform(mouseY, (v) => v - 192),
        background: "radial-gradient(circle, rgba(255, 149, 0, 0.15) 0%, transparent 70%)",
        filter: "blur(40px)",
      }}
    />
  );
};

// Animated gradient text
const GradientText = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.span
    className={`bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent ${className}`}
    animate={{ backgroundPosition: ["0%", "100%"] }}
    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
  >
    {children}
  </motion.span>
);

// --- Main Component ---

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-clip relative">
      <MouseGlow />
      <Header />

      {/* --- HERO SECTION: Ultra Premium --- */}
      <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
            animate={{ y: [0, 50, 0], x: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
            animate={{ y: [0, -50, 0], x: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          />
        </div>

        {/* Top: Immersive Visual with Overlay */}
        <div className="relative flex-grow w-full overflow-hidden z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-transparent to-background z-10 pointer-events-none" />
          <ParallaxImage 
            src="https://static.wixstatic.com/media/a992bf_6ce901777b5e492a882fd5ea968a590f~mv2.png?originWidth=1920&originHeight=896"
            alt="Professional looking towards the future"
            className="w-full h-full"
          />
          
          {/* Premium Floating Badge with Animation */}
          <motion.div 
            initial={{ opacity: 0, x: 20, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
            className="absolute top-8 right-8 z-20 bg-primary text-primary-foreground px-6 py-3 font-heading uppercase tracking-widest text-sm border border-primary/50 backdrop-blur-sm"
          >
            <motion.span
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mr-2"
            >
              ✦
            </motion.span>
            Plataforma #1 de Recrutamento
          </motion.div>
        </div>

        {/* Middle: The Heavy Black Bar (Title) - Enhanced */}
        <div className="relative z-20 bg-background border-t-2 border-primary py-12 md:py-16 px-4 md:px-8 flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <motion.div className="w-12 h-px bg-primary" animate={{ scaleX: [0, 1] }} transition={{ duration: 0.8 }} />
            <span className="font-heading text-sm uppercase tracking-widest text-primary">Transformando Carreiras</span>
            <motion.div className="w-12 h-px bg-primary" animate={{ scaleX: [0, 1] }} transition={{ duration: 0.8, delay: 0.1 }} />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="font-heading text-6xl md:text-8xl lg:text-9xl uppercase text-foreground tracking-tighter leading-[0.85] mb-4"
          >
            Encontre Seu <GradientText>Próximo</GradientText> Desafio
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-paragraph text-foreground/70 mt-6 max-w-3xl text-lg md:text-xl tracking-wide leading-relaxed"
          >
            Conectando talentos excepcionais com empresas inovadoras. Encontre a oportunidade perfeita ou o profissional ideal.
          </motion.p>

          {/* CTA Buttons - Premium Style */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 mt-12 justify-center items-center"
          >
            <Link to="/vagas">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 149, 0, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-primary-foreground font-heading uppercase px-10 py-4 text-lg tracking-wider flex items-center justify-center gap-3 hover:bg-primary/90 transition-all border-2 border-primary"
              >
                Explorar Vagas <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 149, 0, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent text-foreground font-heading uppercase px-10 py-4 text-lg tracking-wider border-2 border-foreground hover:border-primary hover:text-primary transition-all"
              >
                Entrar na Plataforma
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Bottom: The Ticker Tape (Marquee) - Enhanced */}
        <div className="relative z-20 bg-primary text-primary-foreground py-4 border-y-2 border-primary overflow-hidden">
          <Marquee baseVelocity={-2} className="font-heading text-xl md:text-2xl uppercase tracking-widest font-bold">
            <span className="mx-8">⚡ Vagas Disponíveis</span>
            <span className="mx-8">⚡ Tecnologia</span>
            <span className="mx-8">⚡ Design</span>
            <span className="mx-8">⚡ Marketing</span>
            <span className="mx-8">⚡ Liderança</span>
            <span className="mx-8">⚡ Inovação</span>
            <span className="mx-8">⚡ Futuro</span>
          </Marquee>
        </div>
      </section>

      {/* --- STATS SECTION: Premium Grid with Glassmorphism --- */}
      <section className="w-full bg-background py-32 border-b-2 border-primary relative overflow-hidden">
        {/* Background animation */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>

        <div className="max-w-[120rem] mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-5xl md:text-7xl uppercase text-foreground mb-4">
              Números que <GradientText>Falam</GradientText>
            </h2>
            <p className="font-paragraph text-foreground/60 text-lg max-w-2xl mx-auto">
              Milhares de profissionais e empresas já transformaram suas carreiras na JobMatch
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Briefcase, number: "500+", label: "Vagas Ativas", color: "from-primary/20 to-primary/5" },
              { icon: Users, number: "1000+", label: "Empresas Parceiras", color: "from-primary/20 to-primary/5" },
              { icon: TrendingUp, number: "95%", label: "Taxa de Sucesso", color: "from-primary/20 to-primary/5" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, type: "spring" }}
                whileHover={{ y: -10, boxShadow: "0 30px 60px rgba(255, 149, 0, 0.2)" }}
                className={`bg-gradient-to-br ${stat.color} border-2 border-primary/30 p-12 flex flex-col items-center justify-center text-center group hover:border-primary transition-all duration-300 backdrop-blur-sm`}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                  className="mb-8"
                >
                  <stat.icon className="w-16 h-16 text-primary group-hover:scale-125 transition-transform duration-300" />
                </motion.div>
                <h3 className="font-heading text-7xl md:text-8xl text-foreground mb-3 font-bold">{stat.number}</h3>
                <p className="font-paragraph text-primary uppercase tracking-widest text-sm font-semibold">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- DYNAMIC SPLIT SECTION: "How It Works" - Premium --- */}
      <section id="como-funciona" className="w-full bg-background relative">
        {/* Decorative Divider */}
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

        <div className="flex flex-col lg:flex-row">
          {/* Left: Sticky Title & Navigation */}
          <div className="lg:w-1/3 lg:sticky lg:top-0 lg:h-screen bg-secondary border-r-2 border-primary flex flex-col justify-center p-12 md:p-16 z-10 relative overflow-hidden">
            {/* Background glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <motion.div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-primary" />
                <span className="font-heading text-sm uppercase tracking-widest text-primary">O Processo</span>
              </motion.div>

              <h2 className="font-heading text-6xl md:text-7xl lg:text-8xl uppercase text-foreground leading-[0.85] mb-8">
                Como<br /><GradientText>Funciona</GradientText>
              </h2>
              <p className="font-paragraph text-foreground/70 text-lg max-w-md mb-12 leading-relaxed">
                Nossa plataforma simplifica o processo de recrutamento, criando conexões diretas e eficientes entre talentos e oportunidades.
              </p>
              
              <motion.div 
                className="flex items-center gap-4 text-primary"
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-12 h-px bg-primary" />
                <span className="font-heading uppercase tracking-widest text-sm">Explore Abaixo</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Right: Scrolling Content Cards */}
          <div className="lg:w-2/3 bg-background">
            {/* Candidates Flow */}
            <div className="p-8 md:p-20 border-b-2 border-primary relative overflow-hidden">
              {/* Background element */}
              <motion.div
                className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
                animate={{ y: [0, 50, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              />

              <div className="flex items-center gap-4 mb-16 relative z-10">
                <motion.span 
                  className="font-heading text-9xl text-primary/10 absolute -ml-10 select-none"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  01
                </motion.span>
                <h3 className="font-heading text-4xl md:text-6xl uppercase text-foreground relative z-10">Para Candidatos</h3>
              </div>
              
              <div className="grid gap-8 relative z-10">
                {[
                  { title: "Explore Vagas", desc: "Navegue por centenas de oportunidades em diversas áreas e setores.", icon: Search },
                  { title: "Filtre e Pesquise", desc: "Use filtros avançados para encontrar a vaga que combina com seu perfil.", icon: Target },
                  { title: "Candidate-se", desc: "Envie sua candidatura com apenas alguns cliques e acompanhe em tempo real.", icon: Zap }
                ].map((step, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: i * 0.15, type: "spring" }}
                    whileHover={{ x: 10, boxShadow: "0 20px 40px rgba(255, 149, 0, 0.15)" }}
                    className="group relative bg-gradient-to-br from-secondary/40 to-secondary/10 border-2 border-primary/30 p-8 hover:border-primary transition-all duration-300"
                  >
                    <motion.div 
                      className="absolute top-0 left-0 w-1 h-0 bg-gradient-to-b from-primary to-primary/50 group-hover:h-full transition-all duration-500"
                      initial={{ height: 0 }}
                    />
                    <div className="flex items-start gap-6">
                      <motion.div 
                        className="p-4 bg-primary/20 border-2 border-primary/50 group-hover:bg-primary/30 transition-all"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      >
                        <step.icon className="w-6 h-6 text-primary" />
                      </motion.div>
                      <div>
                        <h4 className="font-heading text-2xl uppercase text-foreground mb-2">{step.title}</h4>
                        <p className="font-paragraph text-foreground/60 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="mt-16 relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <Link to="/vagas">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 149, 0, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full md:w-auto bg-primary text-primary-foreground font-heading uppercase px-10 py-5 text-lg tracking-wider flex items-center justify-center gap-3 hover:bg-primary/90 transition-all border-2 border-primary"
                  >
                    Ver Vagas Disponíveis <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              </motion.div>
            </div>

            {/* Companies Flow */}
            <div className="p-8 md:p-20 relative overflow-hidden">
              {/* Background element */}
              <motion.div
                className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
                animate={{ y: [0, -50, 0] }}
                transition={{ duration: 6, repeat: Infinity, delay: 1 }}
              />

              <div className="flex items-center gap-4 mb-16 relative z-10">
                <motion.span 
                  className="font-heading text-9xl text-primary/10 absolute -ml-10 select-none"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                >
                  02
                </motion.span>
                <h3 className="font-heading text-4xl md:text-6xl uppercase text-foreground relative z-10">Para Empresas</h3>
              </div>

              <div className="grid gap-8 relative z-10">
                {[
                  { title: "Publique Vagas", desc: "Crie anúncios detalhados das suas oportunidades e atraia talentos qualificados.", icon: Building2 },
                  { title: "Receba Candidaturas", desc: "Candidatos qualificados se inscrevem diretamente na sua vaga.", icon: Users },
                  { title: "Escolha os Melhores", desc: "Analise perfis, compare candidatos e selecione os talentos ideais.", icon: CheckCircle2 }
                ].map((step, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: i * 0.15, type: "spring" }}
                    whileHover={{ x: 10, boxShadow: "0 20px 40px rgba(255, 149, 0, 0.15)" }}
                    className="group relative bg-gradient-to-br from-secondary/40 to-secondary/10 border-2 border-primary/30 p-8 hover:border-primary transition-all duration-300"
                  >
                    <motion.div 
                      className="absolute top-0 left-0 w-1 h-0 bg-gradient-to-b from-primary to-primary/50 group-hover:h-full transition-all duration-500"
                      initial={{ height: 0 }}
                    />
                    <div className="flex items-start gap-6">
                      <motion.div 
                        className="p-4 bg-primary/20 border-2 border-primary/50 group-hover:bg-primary/30 transition-all"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      >
                        <step.icon className="w-6 h-6 text-primary" />
                      </motion.div>
                      <div>
                        <h4 className="font-heading text-2xl uppercase text-foreground mb-2">{step.title}</h4>
                        <p className="font-paragraph text-foreground/60 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                className="mt-16 relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <Link to="/empresas">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 149, 0, 0.15)" }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full md:w-auto bg-transparent border-2 border-primary text-primary font-heading uppercase px-10 py-5 text-lg tracking-wider flex items-center justify-center gap-3 hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    Área da Empresa <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- IMMERSIVE IMAGE BREAK: Premium --- */}
      <section className="w-full h-[70vh] relative overflow-hidden group">
        <ParallaxImage 
          src="https://static.wixstatic.com/media/a992bf_ce17738995d34280817541834a29608e~mv2.png?originWidth=1920&originHeight=1152"
          alt="Office atmosphere"
          className="w-full h-full group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <motion.div 
          className="absolute bottom-0 left-0 w-full p-8 md:p-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-6xl md:text-8xl uppercase text-foreground leading-[0.85]">
            O Futuro é <GradientText>Agora</GradientText>
          </h2>
          <p className="font-paragraph text-foreground/70 text-lg mt-6 max-w-2xl">
            Transforme sua carreira ou encontre o talento perfeito para sua empresa. A oportunidade está a apenas um clique de distância.
          </p>
        </motion.div>
      </section>

      {/* --- CTA SECTION: Ultra Premium --- */}
      <section className="w-full bg-gradient-to-br from-primary via-primary to-primary/90 py-40 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute top-10 right-20 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl"
            animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 left-20 w-80 h-80 bg-primary-foreground/5 rounded-full blur-3xl"
            animate={{ y: [0, -40, 0], x: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5 z-0" 
             style={{ backgroundImage: 'linear-gradient(90deg, #000 1px, transparent 1px), linear-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
        
        <div className="max-w-[100rem] mx-auto px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <motion.div className="flex items-center justify-center gap-3 mb-8">
              <motion.div className="w-12 h-px bg-primary-foreground" animate={{ scaleX: [0, 1] }} transition={{ duration: 0.8 }} />
              <span className="font-heading text-sm uppercase tracking-widest text-primary-foreground">Próximo Passo</span>
              <motion.div className="w-12 h-px bg-primary-foreground" animate={{ scaleX: [0, 1] }} transition={{ duration: 0.8, delay: 0.1 }} />
            </motion.div>

            <h2 className="font-heading text-7xl md:text-9xl uppercase text-primary-foreground mb-8 leading-[0.8] font-bold">
              Pronto Para<br />Começar?
            </h2>
            <p className="font-paragraph text-xl md:text-2xl text-primary-foreground/90 mb-16 max-w-3xl mx-auto leading-relaxed">
              Junte-se a milhares de profissionais e empresas que já encontraram o match perfeito. Sua próxima grande oportunidade está esperando.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/vagas">
                <motion.button
                  whileHover={{ scale: 1.08, boxShadow: "0 30px 60px rgba(0, 0, 0, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary-foreground text-primary font-heading uppercase px-16 py-6 text-xl tracking-wider border-3 border-primary-foreground transition-all font-bold hover:shadow-2xl"
                >
                  Ver Todas as Vagas
                </motion.button>
              </Link>
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.08, backgroundColor: "rgba(255, 255, 255, 0.1)", boxShadow: "0 30px 60px rgba(0, 0, 0, 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent text-primary-foreground font-heading uppercase px-16 py-6 text-xl tracking-wider border-3 border-primary-foreground transition-all font-bold hover:shadow-xl"
                >
                  Entrar na Plataforma
                </motion.button>
              </Link>
            </div>

            {/* Floating elements */}
            <motion.div
              className="mt-16 flex justify-center gap-8 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {[
                { icon: Zap, text: "Rápido e Fácil" },
                { icon: CheckCircle2, text: "100% Seguro" },
                { icon: TrendingUp, text: "Resultados Comprovados" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2 text-primary-foreground/80 font-heading uppercase text-sm tracking-wider"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                >
                  <item.icon className="w-5 h-5" />
                  {item.text}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}