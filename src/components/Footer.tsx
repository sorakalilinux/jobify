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
    <footer className="bg-secondary/50 backdrop-blur-sm border-t border-secondary-foreground/20 mt-20">
      <div className="max-w-[100rem] mx-auto px-6 md:px-12 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <h3 className="text-2xl font-heading font-bold text-secondary-foreground">
                TalentHub
              </h3>
            </Link>
            <p className="font-paragraph text-surface text-sm">
              Conectando talentos com oportunidades incríveis
            </p>
          </motion.div>

          {/* Links */}
          {footerLinks.map((section, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <h4 className="font-heading font-bold text-foreground mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="font-paragraph text-surface hover:text-secondary-foreground transition text-sm"
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
          className="h-px bg-gradient-to-r from-transparent via-secondary-foreground/30 to-transparent mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />

        {/* Bottom */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p variants={itemVariants} className="font-paragraph text-surface text-sm">
            © {currentYear} TalentHub. Todos os direitos reservados.
          </motion.p>

          {/* Social Links */}
          <motion.div
            className="flex gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {socialLinks.map((social, idx) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={idx}
                  href={social.href}
                  aria-label={social.label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.2, color: '#7FFF00' }}
                  whileTap={{ scale: 0.95 }}
                  className="text-surface hover:text-secondary-foreground transition"
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
