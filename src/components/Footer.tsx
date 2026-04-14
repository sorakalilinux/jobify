import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Plataforma',
      links: [
        { label: 'Vagas', href: '/vagas' },
        { label: 'Empresas', href: '/empresas' },
        { label: 'Como Funciona', href: '/#como-funciona' },
      ],
    },
    {
      title: 'Usuário',
      links: [
        { label: 'Meu Perfil', href: '/profissional' },
        { label: 'Minhas Candidaturas', href: '/profissional' },
        { label: 'Configurações', href: '/profissional' },
      ],
    },
    {
      title: 'Empresa',
      links: [
        { label: 'Publicar Vaga', href: '/contratante' },
        { label: 'Gerenciar Vagas', href: '/contratante' },
        { label: 'Candidatos', href: '/contratante' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="bg-dark-charcoal/60 backdrop-blur-xl border-t border-electric-blue/20">
      <div className="max-w-[120rem] mx-auto px-6 md:px-12 py-16 md:py-20 lg:py-24">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-12 md:mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Link to="/" className="flex items-center gap-2">
              <h3 className="text-xl md:text-2xl font-heading font-black bg-gradient-to-r from-electric-blue to-cyber-purple bg-clip-text text-transparent">
                TalentHub
              </h3>
            </Link>
            <p className="font-paragraph text-surface text-sm leading-relaxed">
              Conectando talentos com oportunidades incríveis
            </p>
          </motion.div>

          {/* Links */}
          {footerLinks.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="space-y-4"
            >
              <h4 className="font-heading font-bold text-foreground text-sm md:text-base tracking-wide">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="font-paragraph text-surface hover:text-electric-blue transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-electric-blue/30 to-transparent mb-8 md:mb-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />

        {/* Bottom */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-paragraph text-surface text-xs md:text-sm"
          >
            © {currentYear} TalentHub. Todos os direitos reservados.
          </motion.p>

          {/* Social Links */}
          <motion.div
            className="flex gap-6 md:gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {socialLinks.map((social, idx) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={idx}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.2, color: '#00D9FF' }}
                  whileTap={{ scale: 0.95 }}
                  className="text-surface hover:text-electric-blue transition-colors duration-300"
                >
                  <Icon size={20} />
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
