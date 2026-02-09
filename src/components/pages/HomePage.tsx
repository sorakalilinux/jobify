// HPI 1.7-V
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { ArrowRight, Briefcase, Users, TrendingUp, Search, CheckCircle2, Building2 } from 'lucide-react';
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

// --- Main Component ---

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-clip">
      <Header />

      {/* --- HERO SECTION: The "Sandwich" Layout (Inspiration Replica) --- */}
      <section className="relative w-full h-[95vh] flex flex-col">
        {/* Top: Immersive Visual */}
        <div className="relative flex-grow w-full overflow-hidden">
          <div className="absolute inset-0 bg-primary/10 z-10 mix-blend-overlay pointer-events-none" />
          <ParallaxImage 
            src="https://static.wixstatic.com/media/a992bf_6ce901777b5e492a882fd5ea968a590f~mv2.png?originWidth=1920&originHeight=896"
            alt="Professional looking towards the future"
            className="w-full h-full"
          />
          
          {/* Floating Badge */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute top-8 right-8 z-20 bg-primary text-primary-foreground px-4 py-2 font-heading uppercase tracking-widest text-sm"
          >
            Plataforma #1 de Recrutamento
          </motion.div>
        </div>

        {/* Middle: The Heavy Black Bar (Title) */}
        <div className="relative z-20 bg-background border-t border-primary/20 py-8 md:py-12 px-4 md:px-8 flex flex-col justify-center items-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl uppercase text-primary tracking-tighter leading-[0.9]"
          >
            Encontre Seu <span className="text-foreground">Próximo</span> Desafio
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-paragraph text-foreground/60 mt-4 max-w-2xl text-lg md:text-xl uppercase tracking-widest"
          >
            Conectando Talentos Excepcionais a Empresas Inovadoras
          </motion.p>
        </div>

        {/* Bottom: The Ticker Tape (Marquee) */}
        <div className="relative z-20 bg-primary text-primary-foreground py-3 border-y border-black">
          <Marquee baseVelocity={-2} className="font-heading text-2xl md:text-3xl uppercase tracking-widest">
            <span className="mx-8">/// Vagas Disponíveis</span>
            <span className="mx-8">/// Tecnologia</span>
            <span className="mx-8">/// Design</span>
            <span className="mx-8">/// Marketing</span>
            <span className="mx-8">/// Liderança</span>
            <span className="mx-8">/// Inovação</span>
            <span className="mx-8">/// Futuro</span>
          </Marquee>
        </div>
      </section>

      {/* --- STATS SECTION: High Contrast Grid --- */}
      <section className="w-full bg-background py-24 border-b border-white/10">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {[
              { icon: Briefcase, number: "500+", label: "Vagas Ativas" },
              { icon: Users, number: "1000+", label: "Empresas Parceiras" },
              { icon: TrendingUp, number: "95%", label: "Taxa de Sucesso" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background p-12 flex flex-col items-center justify-center text-center group hover:bg-secondary/30 transition-colors duration-500"
              >
                <stat.icon className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-heading text-6xl md:text-7xl text-foreground mb-2">{stat.number}</h3>
                <p className="font-paragraph text-primary uppercase tracking-widest text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- DYNAMIC SPLIT SECTION: "How It Works" --- */}
      <section id="como-funciona" className="w-full bg-background relative">
        {/* Decorative Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

        <div className="flex flex-col lg:flex-row">
          {/* Left: Sticky Title & Navigation */}
          <div className="lg:w-1/3 lg:sticky lg:top-0 lg:h-screen bg-secondary border-r border-white/5 flex flex-col justify-center p-12 z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-6xl md:text-7xl lg:text-8xl uppercase text-primary leading-[0.85] mb-8">
                Como<br /><span className="text-foreground">Funciona</span>
              </h2>
              <p className="font-paragraph text-foreground/70 text-lg max-w-md mb-12">
                Nossa plataforma simplifica o processo de recrutamento, criando conexões diretas e eficientes entre talentos e oportunidades.
              </p>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 text-primary">
                  <div className="w-12 h-px bg-primary" />
                  <span className="font-heading uppercase tracking-widest">O Processo</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Scrolling Content Cards */}
          <div className="lg:w-2/3 bg-background">
            {/* Candidates Flow */}
            <div className="p-8 md:p-20 border-b border-white/5">
              <div className="flex items-center gap-4 mb-12">
                <span className="font-heading text-9xl text-white/5 absolute -ml-10 select-none">01</span>
                <h3 className="font-heading text-4xl md:text-5xl uppercase text-foreground relative z-10">Para Candidatos</h3>
              </div>
              
              <div className="grid gap-8">
                {[
                  { title: "Explore Vagas", desc: "Navegue por centenas de oportunidades em diversas áreas.", icon: Search },
                  { title: "Filtre e Pesquise", desc: "Use filtros avançados para encontrar a vaga perfeita.", icon: CheckCircle2 },
                  { title: "Candidate-se", desc: "Envie sua candidatura com apenas alguns cliques.", icon: ArrowRight }
                ].map((step, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative bg-secondary/20 border border-white/5 p-8 hover:border-primary/50 transition-colors duration-300"
                  >
                    <div className="absolute top-0 left-0 w-1 h-0 bg-primary group-hover:h-full transition-all duration-300" />
                    <div className="flex items-start gap-6">
                      <div className="p-3 bg-background border border-white/10 rounded-none">
                        <step.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-heading text-2xl uppercase text-foreground mb-2">{step.title}</h4>
                        <p className="font-paragraph text-foreground/60">{step.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-12">
                <Link to="/vagas">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full md:w-auto bg-primary text-primary-foreground font-heading uppercase px-8 py-4 text-lg tracking-wider flex items-center justify-center gap-3 hover:bg-white transition-colors"
                  >
                    Ver Vagas Disponíveis <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              </div>
            </div>

            {/* Companies Flow */}
            <div className="p-8 md:p-20">
              <div className="flex items-center gap-4 mb-12">
                <span className="font-heading text-9xl text-white/5 absolute -ml-10 select-none">02</span>
                <h3 className="font-heading text-4xl md:text-5xl uppercase text-foreground relative z-10">Para Empresas</h3>
              </div>

              <div className="grid gap-8">
                {[
                  { title: "Publique Vagas", desc: "Crie anúncios detalhados das suas oportunidades.", icon: Building2 },
                  { title: "Receba Candidaturas", desc: "Candidatos qualificados se inscrevem diretamente.", icon: Users },
                  { title: "Escolha os Melhores", desc: "Analise perfis e selecione os talentos ideais.", icon: CheckCircle2 }
                ].map((step, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative bg-secondary/20 border border-white/5 p-8 hover:border-primary/50 transition-colors duration-300"
                  >
                    <div className="absolute top-0 left-0 w-1 h-0 bg-primary group-hover:h-full transition-all duration-300" />
                    <div className="flex items-start gap-6">
                      <div className="p-3 bg-background border border-white/10 rounded-none">
                        <step.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-heading text-2xl uppercase text-foreground mb-2">{step.title}</h4>
                        <p className="font-paragraph text-foreground/60">{step.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12">
                <Link to="/empresas">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full md:w-auto bg-transparent border border-primary text-primary font-heading uppercase px-8 py-4 text-lg tracking-wider flex items-center justify-center gap-3 hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    Área da Empresa <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- IMMERSIVE IMAGE BREAK --- */}
      <section className="w-full h-[60vh] relative overflow-hidden">
        <ParallaxImage 
          src="https://static.wixstatic.com/media/a992bf_ce17738995d34280817541834a29608e~mv2.png?originWidth=1920&originHeight=1152"
          alt="Office atmosphere"
          className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <h2 className="font-heading text-5xl md:text-7xl uppercase text-white mix-blend-difference">
            O Futuro é <span className="text-primary">Agora</span>
          </h2>
        </div>
      </section>

      {/* --- CTA SECTION: Brutalist & Bold --- */}
      <section className="w-full bg-primary py-32 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
        />
        
        <div className="max-w-[100rem] mx-auto px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-7xl md:text-9xl uppercase text-primary-foreground mb-8 leading-[0.8]">
              Pronto Para<br />Começar?
            </h2>
            <p className="font-paragraph text-xl md:text-2xl text-primary-foreground/80 mb-12 max-w-3xl mx-auto">
              Junte-se a milhares de profissionais e empresas que já encontraram o match perfeito.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/vagas">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#1A1A1A", color: "#FF9500" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-black text-white font-heading uppercase px-16 py-6 text-xl tracking-wider border-2 border-black transition-all"
                >
                  Ver Todas as Vagas
                </motion.button>
              </Link>
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#000000", color: "#FFFFFF" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent text-black font-heading uppercase px-16 py-6 text-xl tracking-wider border-2 border-black transition-all"
                >
                  Entrar na Plataforma
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