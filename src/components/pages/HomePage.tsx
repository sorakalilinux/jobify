import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Users, Target, Zap } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-12 max-w-[120rem] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-8xl font-heading font-bold text-foreground mb-8">
            Conectando <span className="text-secondary-foreground">Talentos</span> e <span className="text-secondary-foreground">Oportunidades</span>
          </h1>
          <p className="text-xl md:text-2xl font-paragraph text-surface max-w-4xl mx-auto mb-12">
            A plataforma que une profissionais e empresas em busca de crescimento mútuo
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/vagas"
                className="inline-flex items-center gap-3 bg-secondary-foreground text-background font-heading font-bold px-8 py-4 text-lg rounded-lg hover:shadow-lg transition-all"
              >
                Explorar Vagas
                <ArrowRight size={20} />
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/empresas"
                className="inline-flex items-center gap-3 bg-secondary/50 text-foreground font-heading font-bold px-8 py-4 text-lg rounded-lg border border-secondary-foreground/30 hover:border-secondary-foreground/50 transition-all"
              >
                Ver Empresas
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-12 max-w-[100rem] mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            {
              icon: Briefcase,
              title: 'Vagas Exclusivas',
              description: 'Acesso a oportunidades de trabalho em diversas áreas'
            },
            {
              icon: Users,
              title: 'Empresas Verificadas',
              description: 'Conecte-se com empresas confiáveis e consolidadas'
            },
            {
              icon: Target,
              title: 'Candidaturas Diretas',
              description: 'Aplique para vagas com apenas alguns cliques'
            },
            {
              icon: Zap,
              title: 'Rápido e Eficiente',
              description: 'Processo simplificado para economizar seu tempo'
            }
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-secondary/50 backdrop-blur-sm border border-secondary-foreground/30 rounded-2xl p-8 hover:border-secondary-foreground/50 transition-all"
              >
                <Icon className="w-12 h-12 text-secondary-foreground mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="font-paragraph text-surface">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 max-w-[100rem] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-secondary-foreground/10 to-cyber-purple/10 border border-secondary-foreground/30 rounded-3xl p-12 md:p-16 text-center"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Pronto para começar?
          </h2>
          <p className="font-paragraph text-xl text-surface max-w-2xl mx-auto mb-8">
            Junte-se a milhares de profissionais e empresas que já encontraram sucesso em nossa plataforma
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/profissional"
                className="inline-block bg-secondary-foreground text-background font-heading font-bold px-8 py-4 text-lg rounded-lg hover:shadow-lg transition-all"
              >
                Sou Profissional
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contratante"
                className="inline-block bg-secondary/50 text-foreground font-heading font-bold px-8 py-4 text-lg rounded-lg border border-secondary-foreground/30 hover:border-secondary-foreground/50 transition-all"
              >
                Sou Empresa
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
