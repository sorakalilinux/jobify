import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, userRole, logout } = useAuthStore();

  const navLinks = [
    { href: '/', label: 'Início' },
    { href: '/vagas', label: 'Vagas' },
    { href: '/empresas', label: 'Empresas' },
    { href: '/#como-funciona', label: 'Como Funciona' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <header className="w-full bg-background border-b-2 border-primary sticky top-0 z-50 backdrop-blur-sm bg-background/95">
      <div className="max-w-[120rem] mx-auto px-6 md:px-12 py-6">
        <div className="flex items-center justify-between">
          {/* Logo - Premium */}
          <Link to="/">
            <motion.div 
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-primary"
              >
                <Zap className="w-8 h-8" />
              </motion.div>
              <h1 className="font-heading text-3xl md:text-4xl uppercase text-foreground tracking-wider group-hover:text-primary transition-all font-bold">
                JobMatch
              </h1>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-heading uppercase text-sm tracking-widest transition-all relative group ${
                  isActive(link.href)
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {link.label}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: isActive(link.href) ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link
                  to={userRole === 'professional' ? '/profissional' : '/contratante'}
                  className="font-heading uppercase text-sm tracking-widest text-primary"
                >
                  {userRole === 'professional' ? 'Minha Área' : 'Minha Empresa'}
                </Link>
                <motion.button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="font-heading uppercase text-sm tracking-widest text-foreground hover:text-primary transition-all"
                >
                  Sair
                </motion.button>
              </>
            ) : (
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(255, 149, 0, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="font-heading uppercase text-sm tracking-widest bg-primary text-primary-foreground px-6 py-3 hover:bg-primary/90 transition-all border-2 border-primary font-bold"
                >
                  Login
                </motion.button>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-primary hover:text-opacity-80 transition-all"
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-6 pb-4 border-t-2 border-primary pt-6"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-heading uppercase text-lg tracking-wide transition-all ${
                      isActive(link.href)
                        ? 'text-primary'
                        : 'text-foreground hover:text-primary'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                {isAuthenticated ? (
                  <>
                    <Link
                      to={userRole === 'professional' ? '/profissional' : '/contratante'}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-heading uppercase text-lg tracking-wide text-primary"
                    >
                      {userRole === 'professional' ? 'Minha Área' : 'Minha Empresa'}
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="font-heading uppercase text-lg tracking-wide text-foreground hover:text-primary transition-all text-left"
                    >
                      Sair
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-heading uppercase text-lg tracking-wide bg-primary text-primary-foreground px-6 py-3 hover:bg-primary/90 transition-all inline-block border-2 border-primary font-bold"
                  >
                    Login
                  </Link>
                )}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
