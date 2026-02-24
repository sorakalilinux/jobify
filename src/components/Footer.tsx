import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: '/', label: 'Início' },
    { href: '/vagas', label: 'Vagas' },
    { href: '/empresas', label: 'Empresas' },
  ];

  const companyLinks = [
    { href: '/empresas', label: 'Publicar Vaga' },
    { href: '/empresas', label: 'Ver Candidaturas' },
  ];

  return (
    <footer className="w-full bg-secondary border-t-2 border-primary relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
          animate={{ y: [0, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="max-w-[120rem] mx-auto px-6 md:px-12 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-6 h-6 text-primary" />
              <h3 className="font-heading text-3xl uppercase text-primary tracking-wider font-bold">
                JobMatch
              </h3>
            </div>
            <p className="font-paragraph text-foreground/80 leading-relaxed">
              Conectando talentos excepcionais com empresas inovadoras desde 2026. Transformando carreiras e negócios.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-heading text-xl uppercase text-primary mb-6 tracking-wider font-bold">
              Links Rápidos
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="font-paragraph text-foreground/80 hover:text-primary transition-all flex items-center gap-2 group"
                  >
                    <motion.span
                      className="opacity-0 group-hover:opacity-100"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 0.6 }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* For Companies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-heading text-xl uppercase text-primary mb-6 tracking-wider font-bold">
              Para Empresas
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="font-paragraph text-foreground/80 hover:text-primary transition-all flex items-center gap-2 group"
                  >
                    <motion.span
                      className="opacity-0 group-hover:opacity-100"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 0.6 }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-heading text-xl uppercase text-primary mb-6 tracking-wider font-bold">
              Contato
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group cursor-pointer">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                </motion.div>
                <span className="font-paragraph text-foreground/80 group-hover:text-primary transition-all">
                  contato@jobmatch.com
                </span>
              </li>
              <li className="flex items-start gap-3 group cursor-pointer">
                <motion.div
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                >
                  <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                </motion.div>
                <span className="font-paragraph text-foreground/80 group-hover:text-primary transition-all">
                  +55 11 9999-9999
                </span>
              </li>
              <li className="flex items-start gap-3 group cursor-pointer">
                <motion.div
                  animate={{ y: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                >
                  <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                </motion.div>
                <span className="font-paragraph text-foreground/80 group-hover:text-primary transition-all">
                  São Paulo, Brasil
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-8" />

        {/* Bottom Bar */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-paragraph text-foreground/60 text-sm">
            © {currentYear} JobMatch. Todos os direitos reservados. Transformando carreiras desde 2026.
          </p>
          <div className="flex gap-8">
            <Link to="#" className="font-paragraph text-foreground/60 text-sm hover:text-primary transition-all">
              Política de Privacidade
            </Link>
            <Link to="#" className="font-paragraph text-foreground/60 text-sm hover:text-primary transition-all">
              Termos de Uso
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
