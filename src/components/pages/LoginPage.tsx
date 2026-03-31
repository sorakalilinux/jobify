import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, Users, ArrowRight, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { NetworkParticles } from '@/components/3D';
import PageTransition from '@/components/PageTransition';
import { useAuthStore } from '@/store/authStore';

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUserRole, setIsAuthenticated } = useAuthStore();
  const [selectedRole, setSelectedRole] = useState<'professional' | 'contractor' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleLogin = async (role: 'professional' | 'contractor') => {
    if (!email || !password) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    setIsLoading(true);
    // Simulate login delay
    setTimeout(() => {
      setUserRole(role);
      setIsAuthenticated(true);
      setIsLoading(false);
      navigate(role === 'professional' ? '/profissional' : '/contratante');
    }, 1000);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signUpData.name || !signUpData.email || !signUpData.password || !signUpData.confirmPassword) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      alert('As senhas não correspondem');
      return;
    }

    setIsLoading(true);
    // Simulate signup delay
    setTimeout(() => {
      setUserRole(selectedRole!);
      setIsAuthenticated(true);
      setIsLoading(false);
      navigate(selectedRole === 'professional' ? '/profissional' : '/contratante');
    }, 1000);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground flex flex-col overflow-hidden">
        <NetworkParticles />
        <Header />

      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl">
          {/* Role Selection */}
          {!selectedRole ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="font-heading text-6xl md:text-8xl uppercase text-primary mb-6 leading-[0.9]">
                Escolha Seu <span className="text-foreground">Perfil</span>
              </h1>
              <p className="font-paragraph text-foreground/60 text-lg md:text-xl mb-16 max-w-2xl mx-auto">
                Selecione se você é um profissional em busca de oportunidades ou uma empresa procurando talentos
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Professional Card */}
                <motion.button
                  whileHover={{ scale: 1.02, borderColor: '#FF9500' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedRole('professional')}
                  className="group relative bg-secondary border-2 border-white/10 p-12 text-left hover:border-primary transition-all duration-300"
                >
                  <div className="absolute top-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-300" />
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 bg-primary/20 border border-primary">
                      <Briefcase className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="font-heading text-3xl uppercase text-foreground">Profissional</h2>
                  </div>
                  <p className="font-paragraph text-foreground/70 mb-8">
                    Encontre as melhores oportunidades de carreira e desenvolva seu potencial
                  </p>
                  <div className="flex items-center gap-2 text-primary font-heading uppercase tracking-widest text-sm">
                    Continuar <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.button>

                {/* Contractor Card */}
                <motion.button
                  whileHover={{ scale: 1.02, borderColor: '#FF9500' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedRole('contractor')}
                  className="group relative bg-secondary border-2 border-white/10 p-12 text-left hover:border-primary transition-all duration-300"
                >
                  <div className="absolute top-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-300" />
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 bg-primary/20 border border-primary">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="font-heading text-3xl uppercase text-foreground">Contratante</h2>
                  </div>
                  <p className="font-paragraph text-foreground/70 mb-8">
                    Publique vagas e encontre os melhores talentos para sua empresa
                  </p>
                  <div className="flex items-center gap-2 text-primary font-heading uppercase tracking-widest text-sm">
                    Continuar <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.button>
              </div>
            </motion.div>
          ) : showSignUp ? (
            /* Sign Up Form */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto"
            >
              <button
                onClick={() => setShowSignUp(false)}
                className="mb-8 text-primary hover:text-foreground transition-colors font-heading uppercase text-sm tracking-widest"
              >
                ← Voltar
              </button>

              <h2 className="font-heading text-5xl uppercase text-primary mb-2">
                Cadastre-se
              </h2>
              <p className="font-paragraph text-foreground/60 mb-12">
                Crie sua conta como {selectedRole === 'professional' ? 'Profissional' : 'Contratante'}
              </p>

              <form onSubmit={handleSignUp} className="space-y-6">
                <div>
                  <label className="block font-heading uppercase text-sm tracking-widest text-foreground mb-3">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    value={signUpData.name}
                    onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                    placeholder="Seu nome"
                    className="w-full bg-secondary border border-white/10 text-foreground px-4 py-3 font-paragraph focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-heading uppercase text-sm tracking-widest text-foreground mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    value={signUpData.email}
                    onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                    placeholder="seu@email.com"
                    className="w-full bg-secondary border border-white/10 text-foreground px-4 py-3 font-paragraph focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-heading uppercase text-sm tracking-widest text-foreground mb-3">
                    Senha
                  </label>
                  <input
                    type="password"
                    value={signUpData.password}
                    onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full bg-secondary border border-white/10 text-foreground px-4 py-3 font-paragraph focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-heading uppercase text-sm tracking-widest text-foreground mb-3">
                    Confirmar Senha
                  </label>
                  <input
                    type="password"
                    value={signUpData.confirmPassword}
                    onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                    className="w-full bg-secondary border border-white/10 text-foreground px-4 py-3 font-paragraph focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                  className="w-full bg-primary text-primary-foreground font-heading uppercase py-3 tracking-wider hover:bg-white hover:text-background transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Criando conta...' : 'Criar Conta'}
                </motion.button>
              </form>

              <p className="font-paragraph text-foreground/60 text-center mt-8">
                Já tem conta?{' '}
                <button
                  onClick={() => setShowSignUp(false)}
                  className="text-primary cursor-pointer hover:underline"
                >
                  Faça login
                </button>
              </p>
            </motion.div>
          ) : (
            /* Login Form */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto"
            >
              <button
                onClick={() => setSelectedRole(null)}
                className="mb-8 text-primary hover:text-foreground transition-colors font-heading uppercase text-sm tracking-widest"
              >
                ← Voltar
              </button>

              <h2 className="font-heading text-5xl uppercase text-primary mb-2">
                {selectedRole === 'professional' ? 'Profissional' : 'Contratante'}
              </h2>
              <p className="font-paragraph text-foreground/60 mb-12">
                Faça login para acessar sua área
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin(selectedRole);
                }}
                className="space-y-6"
              >
                <div>
                  <label className="block font-heading uppercase text-sm tracking-widest text-foreground mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full bg-secondary border border-white/10 text-foreground px-4 py-3 font-paragraph focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-heading uppercase text-sm tracking-widest text-foreground mb-3">
                    Senha
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-secondary border border-white/10 text-foreground px-4 py-3 font-paragraph focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                  className="w-full bg-primary text-primary-foreground font-heading uppercase py-3 tracking-wider hover:bg-white transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Entrando...' : 'Entrar'}
                </motion.button>
              </form>

              <p className="font-paragraph text-foreground/60 text-center mt-8">
                Não tem conta?{' '}
                <button
                  onClick={() => setShowSignUp(true)}
                  className="text-primary cursor-pointer hover:underline"
                >
                  Cadastre-se
                </button>
              </p>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
      </div>
    </PageTransition>
  );
}
